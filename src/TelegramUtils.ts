import {telegramAuthInfo, telegramManualAuthInfo, telegramWebAppAuthInfo} from "./Types.ts";
import CryptoJS from "crypto-js";
import Hex from "crypto-js/enc-hex";

export function parseAuthString(initData: string): telegramWebAppAuthInfo {
    const searchParams = new URLSearchParams(initData);

    return {
        user: searchParams.get('user')!,
        auth_date: parseInt(searchParams.get('auth_date')!),
        query_id: searchParams.get('query_id')!,
        hash: searchParams.get('hash')!
    };
}

export function calculateHash(info: telegramAuthInfo) {
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

    const secretKey = isWebapp ?
        CryptoJS.HmacSHA256(import.meta.env.VITE_TG_BOT_TOKEN, "WebAppData")
        : "ERROR!" // TODO: fix
    ;
    return CryptoJS.HmacSHA256(dataCheckString, secretKey);
}

export function getDefaultDarkMode() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const answer: boolean = window.Telegram.WebApp.colorScheme === 'dark'
    return answer;
}

export function getInitialTgAuthInfo(initData: string) {
    const isWebapp = initData != '';
    if (isWebapp) {
        return parseAuthString(initData);
    } else {
        const testTgUser: string | undefined = import.meta.env.VITE_TEST_TG_INIT_DATA
        const shouldFalsifyAuth = typeof import.meta.env.VITE_TG_BOT_TOKEN != 'undefined'
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