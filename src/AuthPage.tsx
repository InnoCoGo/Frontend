import {telegramAuthInfo} from "./Types";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import TelegramLoginButton from 'react-telegram-login';

export function AuthPage(props: { dataOnAuth: (info: telegramAuthInfo) => void }) {
    return <TelegramLoginButton dataOnauth={props.dataOnAuth} botName="inno_co_go_bot"/>;
}