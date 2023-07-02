import * as React from 'react'
import {useState} from 'react'
import './App.css'
import {telegramAuthInfo} from "./Types.ts";
import {AuthPage} from "./AuthPage.tsx";
import MainView from "./MainView.tsx";
import {getDefaultDarkMode, getInitialTgAuthInfo} from "./TelegramUtils.ts";
import CssBaseline from "@mui/material/CssBaseline";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {IntlProvider} from "react-intl";
import messages from "./Messages.ts";
import Typography from "@mui/material/Typography";
import {Stack, Switch} from "@mui/material";
import {useLocalStorage} from "usehooks-ts";
import "dayjs/locale/en";
import "dayjs/locale/ru";


function LocaleSelector(props: {
    locale: "en" | "ru",
    setLocale: (newValue: "en" | "ru") => void
}) {
    return <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
        <Typography>En</Typography>
        <Switch
            checked={props.locale === 'ru'}
            onChange={(_, checked) => props.setLocale(checked ? "ru" : "en")}
            inputProps={{'aria-label': 'controlled'}}
        />
        <Typography>Ru</Typography>
    </Stack>
}

function App() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const {initData} = window.Telegram.WebApp as { initData: string }

    const [tgUser, setTgUser] = useState<telegramAuthInfo | null>(
        getInitialTgAuthInfo(initData)
    )
    const isDarkMode = getDefaultDarkMode()

    const [locale, setLocale] = useLocalStorage<"en" | "ru">("inno_co_go_locale", "en");

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: isDarkMode ? 'dark' : 'light',
                }
            }),
        [isDarkMode],
    );
    return <IntlProvider locale={locale} messages={messages[locale]}>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
                <LocaleSelector setLocale={setLocale} locale={locale}/>
                {tgUser !== null ? null :
                    <AuthPage dataOnAuth={function (info: telegramAuthInfo) {
                        setTgUser(info)
                    }}/>
                }
                {
                    tgUser === null ? null :
                        <MainView authInfo={tgUser}/>
                }
            </LocalizationProvider>
        </ThemeProvider>
    </IntlProvider>

}

export default App
