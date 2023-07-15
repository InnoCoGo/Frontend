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
import {IconButton, Stack, SvgIcon, Switch} from "@mui/material";
import {useLocalStorage} from "usehooks-ts";
import "dayjs/locale/en";
import "dayjs/locale/ru";
import {SnackbarProvider} from "notistack";


export function FlagLocaleSelector(props: {
    locale: "en" | "ru",
    setLocale: (newValue: "en" | "ru") => void
}) {

    const ruIcon = <SvgIcon>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 6">
            <path fill="#fff" d="M0 0h9v3H0z"/>
            <path fill="#DA291C" d="M0 3h9v3H0z"/>
            <path fill="#0032A0" d="M0 2h9v2H0z"/>
        </svg>
    </SvgIcon>
    const enIcon = <SvgIcon>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30">
            <clipPath id="a">
                <path d="M0 0v30h60V0z"/>
            </clipPath>
            <clipPath id="b">
                <path d="M30 15h30v15zv15H0zH0V0zV0h30z"/>
            </clipPath>
            <g clipPath="url(#a)">
                <path d="M0 0v30h60V0z" fill="#012169"/>
                <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6"/>
                <path d="M0 0l60 30m0-30L0 30" clipPath="url(#b)" stroke="#C8102E" strokeWidth="4"/>
                <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10"/>
                <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6"/>
            </g>
        </svg>
    </SvgIcon>
    return <IconButton onClick={() => props.setLocale(props.locale == 'en' ? "ru" : "en")}>
        {
            props.locale == 'en' ?
                ruIcon : enIcon
        }
    </IconButton>
}


export function LocaleSelector(props: {
    locale: "en" | "ru",
    setLocale: (newValue: "en" | "ru") => void
}) {
    return <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
        <Typography>En</Typography>
        <Switch
            checked={props.locale === 'ru'}
            onChange={(_, checked) => props.setLocale(checked ? "ru" : "en")}
            inputProps={{'aria-label': 'controlled'}}
            color="default"
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
                        <MainView authInfo={tgUser} setLocale={setLocale} locale={locale}/>
                }
                <SnackbarProvider />
            </LocalizationProvider>
        </ThemeProvider>
    </IntlProvider>

}

export default App
