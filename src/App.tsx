import {useState} from 'react'
import './App.css'
import {telegramAuthInfo} from "./Types.ts";
import {AuthPage} from "./AuthPage.tsx";
import {MainView} from "./MainView.tsx";
import {getDefaultDarkMode, getInitialTgAuthInfo} from "./TelegramUtils.ts";
import CssBaseline from "@mui/material/CssBaseline";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import * as React from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {useDarkMode} from "usehooks-ts";


function App() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const {initData} = window.Telegram.WebApp as { initData: string }

    const [tgUser, setTgUser] = useState<telegramAuthInfo | null>(
        getInitialTgAuthInfo(initData)
    )
    const {isDarkMode } = useDarkMode(getDefaultDarkMode())
    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: isDarkMode ? 'dark' : 'light',
                },
            }),
        [isDarkMode],
    );

    return <ThemeProvider theme={theme}>
        <CssBaseline/>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
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

}

export default App
