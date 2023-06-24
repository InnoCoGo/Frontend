import {useState} from 'react'
import './App.css'
import {getUsername, telegramAuthInfo, telegramWebAppAuthInfo} from "./Types.ts";
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

function runVerification(info: telegramAuthInfo) {
    const infoAsMap = new Map(Object.entries(info));
    infoAsMap.delete('hash')

    const lineFeedCharacter = String.fromCharCode(10)
    const dataCheckString = Array.from(infoAsMap.keys())
        .sort()
        .map(key => `${key}=${infoAsMap.get(key)}`)
        .join(lineFeedCharacter);

    const secretKey = CryptoJS.enc.Hex.parse("user" in info ? import.meta.env.VITE_TG_BOT_WEBAPP_TOKEN_HEX : import.meta.env.VITE_TG_BOT_TOKEN_HEX);
    const calculatedHash = CryptoJS.HmacSHA256(dataCheckString, secretKey);
    console.log(secretKey.toString(Hex))
    console.log('raw initial data:')
    console.log(info)
    console.log('------')
    console.log('data check string:')
    console.log(dataCheckString)
    console.log('------')
    console.log('calculated hash:')
    console.log(calculatedHash.toString(Hex))
    console.log('------')
    console.log('------')
    console.log('expected hash (comes from raw initial data `hash`):')
    console.log(info.hash)
    console.log('------')
    return (calculatedHash.toString(Hex) == info.hash)
}


function App() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const {initData} = window.Telegram.WebApp as { initData: string }
    const testTgUser: string | undefined = import.meta.env.VITE_TEST_TG_INIT_DATA

    const [tgUser, setTgUser] = useState<telegramAuthInfo | null>(
        initData == '' ?
            (
                testTgUser === undefined ?
                    null
                    : JSON.parse(testTgUser)
            )
            : parseAuthString(initData)
    )
    return (
        <>
            {tgUser !== null ? <>{`Debug: [Verification: ${JSON.stringify(runVerification(tgUser))}] [Username: ${getUsername(tgUser)}]`}</> :
                <AuthPage dataOnAuth={function (info: telegramAuthInfo) {
                    runVerification(info)

                    setTgUser(info)
                }}/>
            }
            {
                tgUser === null ? null :
                    <MainView/>
            }
        </>
    )
}

export default App
