import {useEffect, useState} from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {telegramAuthInfo} from "./Types.ts";
import {SignedInMainView} from "./SignedInMainView.tsx";

dayjs.extend(customParseFormat);

// TODO: move to .env
export const SERVER_URL = 'https://inno.co-go.chickenkiller.com'

async function tryRetrieveToken(setToken: (token: string | null) => void, authInfo: telegramAuthInfo) {
    const response = await fetch(`${SERVER_URL}/api/v1/auth/tg-login`, {
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(authInfo)
    });
    const data = await response.json()
    // 3 Options:
    // - {'message': 'expired auth date'} <- the best solution is to restart the webapp. should be rare
    // - {'token': ...} <- good case
    // - {'message': "the hashes don't match" } <- something bad is going on.
    //      frontend or backend could be broken, or a malicious actor could be in play
    if ('message' in data) {
        // TODO: better UI
        alert("failure during login. Try restarting the webapp")
    } else {
        setToken(data.token);
    }
    console.log('Data from backend during login:')
    console.log(data)
}

export function MainView({authInfo}: { authInfo: telegramAuthInfo }) {

    //const token = useFetch(`${SERVER_URL}/api/v1/trip/?token=${token}`)
    //useFetch(`${SERVER_URL}/api/v1/trip/?token=${token}`)


    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        tryRetrieveToken(setToken, authInfo);
    }, []);

    return token === null ? "trying to log in..." :
        <SignedInMainView token={token}/>
}