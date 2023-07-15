import {useState} from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {getUsername, telegramAuthInfo} from "./Types.ts";
import SignedInMainView from "./SignedInMainView.tsx";
import {injectIntl, IntlShape} from "react-intl";
import {enqueueSnackbar} from "notistack";
import {useEffectOnce} from "usehooks-ts";

dayjs.extend(customParseFormat);

// TODO: move to .env
export const SERVER_URL = 'https://inno.co-go.chickenkiller.com'

async function tryRetrieveToken(setToken: (token: string | null) => void, authInfo: telegramAuthInfo, intl : IntlShape) {
    const response = await fetch(`${SERVER_URL}/api/v1/auth/tg-login`, {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(authInfo)
    });
    console.log("---SENDING AUTH INFO TO SERVER:---")
    console.log(authInfo)
    console.log("------")
    const data = await response.json()
    // 3 Options:
    // - {'message': 'expired auth date'} <- the best solution is to restart the webapp. should be rare
    // - {'token': ...} <- good case
    // - {'message': "the hashes don't match" } <- something bad is going on.
    //      frontend or backend could be broken, or a malicious actor could be in play
    if ('message' in data) {
        enqueueSnackbar(intl.formatMessage({id:"login_failure"}),
            {variant: 'error', anchorOrigin:{vertical:"bottom", horizontal:"center"}, persist: true})
    } else {
        setToken(data.token);
        localStorage.setItem('token', data.token);
    }
    console.log('Data from backend during login:')
    console.log(data)
}

function MainView(props: {
    intl: IntlShape, authInfo: telegramAuthInfo,
    locale: "en" | "ru",
    setLocale: (newValue: "en" | "ru") => void
}) {
    const [token, setToken] = useState<string | null>(null);
    useEffectOnce(() => {
        setToken(localStorage.getItem('token'))
         tryRetrieveToken(setToken, props.authInfo, props.intl);
    });
    return token === null ? props.intl.formatMessage({
            id: "telegram_login"
        }) :

        <SignedInMainView token={token} setLocale={props.setLocale} locale={props.locale}
                          userTelegramUsername={getUsername(props.authInfo)}/>
}

export default injectIntl(MainView)