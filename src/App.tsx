import {useState} from 'react'
import './App.css'
import {telegramAuthInfo, telegramManualAuthInfo, telegramWebAppAuthInfo} from "./Types.ts";
import {AuthPage} from "./AuthPage.tsx";
import CryptoJS from 'crypto-js'
import Hex from 'crypto-js/enc-hex'
import {MainView} from "./MainView.tsx";

function parseAuthString(initData: string): telegramWebAppAuthInfo {
    const searchParams = new URLSearchParams(initData);

    return {
        user: searchParams.get('user')!,
        auth_date: parseInt(searchParams.get('auth_date')!),
        query_id: searchParams.get('query_id')!,
        hash: searchParams.get('hash')!
    };
}

function calculateHash(info: telegramAuthInfo) {
    const isWebapp = "user" in info;
    const map = new Map(Object.entries(info));
    map.delete('hash')
    const lineFeedCharacter = String.fromCharCode(10)
    const dataCheckString = Array.from(map.keys())
        .sort()
        .map(key => `${key}=${map.get(key)}`)
        .join(lineFeedCharacter);

    console.warn('RUNNING HASH CALCULATION [DEBUG]')
    console.log('data check string:')
    console.log(dataCheckString)
    console.log('------')

    const secretKey = CryptoJS.enc.Hex.parse(isWebapp ? import.meta.env.VITE_TG_BOT_WEBAPP_TOKEN_HEX : import.meta.env.VITE_TG_BOT_TOKEN_HEX);
    return CryptoJS.HmacSHA256(dataCheckString, secretKey);
}

function getInitialTgAuthInfo(initData: string) {
    const isWebapp = initData != '';
    if (isWebapp) {
        return parseAuthString(initData);
    } else {
        const testTgUser: string | undefined = import.meta.env.VITE_TEST_TG_INIT_DATA
        const shouldFalsifyAuth = typeof import.meta.env.VITE_TG_BOT_WEBAPP_TOKEN_HEX != 'undefined'
        const authInfo: null | telegramManualAuthInfo =
            testTgUser === undefined ?
                null
                : JSON.parse(testTgUser)

        // For comfortable local dev:
        if (shouldFalsifyAuth && authInfo !== null) {
            console.warn("FALSIFYING AUTH DATA [DEBUG]")
            console.log("Before falsifying:")
            console.log(authInfo)
            authInfo.auth_date = Date.now()
            authInfo.hash = calculateHash(authInfo).toString(Hex);
            console.log("After falsifying:")
            console.log(authInfo)
        }
        return authInfo
    }
}

function App() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const {initData} = window.Telegram.WebApp as { initData: string }

    const [tgUser, setTgUser] = useState<telegramAuthInfo | null>(
        getInitialTgAuthInfo(initData)
    )
    return (
        <>
            {tgUser !== null ? null :
                <AuthPage dataOnAuth={function (info: telegramAuthInfo) {
                    setTgUser(info)
                }}/>
            }
            {
                tgUser === null ? null :
                    <MainView authInfo={tgUser}/>
            }
        </>
    )
}

export default App
