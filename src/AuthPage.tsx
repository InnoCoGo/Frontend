import {telegramInfo} from "./Types";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import TelegramLoginButton from 'react-telegram-login';

export function AuthPage(props: { dataOnAuth: (info: telegramInfo) => void }) {
    return <TelegramLoginButton dataOnauth={props.dataOnAuth} botName="inno_travellers_test_bot"/>;
}