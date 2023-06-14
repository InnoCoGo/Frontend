export type dateInfo = { date: string, dateElement: HTMLElement }

export type telegramAuthInfo = telegramManualAuthInfo | telegramWebAppAuthInfo;

export type telegramManualAuthInfo = {
    id: number,
    first_name: string,
    last_name: string,
    username: string,
    photo_url: string,
    auth_date: number,
    hash: string
}
export type telegramWebAppAuthInfo = {
    query_id: string,
    hash: string,
    auth_date: number,
    user: string
}
export type webappAuthUser = {
    first_name: string,
    last_name: string,
    id: number,
    username: string,
    language_code: string
}

export function getWebappAuthUser(authInfo: telegramWebAppAuthInfo): webappAuthUser {
    return JSON.parse(authInfo.user);
}

export function getUsername(authInfo: telegramAuthInfo): string {
    if ("user" in authInfo) {
        return getWebappAuthUser(authInfo).username
    }
    return authInfo.username
}