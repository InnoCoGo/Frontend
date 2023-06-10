import {useState} from 'react'
import './App.css'
import {dateInfo, telegramInfo} from "./Types.ts";
import {SingleDayView} from "./SingleDayView.tsx";
import {CalendarView} from "./CalendarView.tsx";
import {AuthPage} from "./AuthPage.tsx";
import CryptoJS from 'crypto-js'
import Hex from 'crypto-js/enc-hex'

function App() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { initData } = window.Telegram.WebApp

    const [selectedDateInfo, setSelectedDateInfo] = useState<dateInfo | null>(null)
    const [tgUser, setTgUser] = useState<telegramInfo | null>(null)
    return (
        <>
            {"here:"}
            {initData}
            {tgUser !== null ? null :
                <AuthPage dataOnAuth={function (info: telegramInfo) {
                    const infoAsMap = new Map(Object.entries(info));
                    infoAsMap.delete('hash')

                    const lineFeedCharacter = String.fromCharCode(10)
                    const dataCheckString = Array.from(infoAsMap.keys())
                        .sort()
                        .map(key => `${key}=${infoAsMap.get(key)}`)
                        .join(lineFeedCharacter);

                    const secretKey= CryptoJS.enc.Hex.parse(import.meta.env.VITE_TG_BOT_TOKEN_HEX);
                    const calculatedHash = CryptoJS.HmacSHA256(dataCheckString, secretKey);

                    console.log('raw initial data:')
                    console.log(info)
                    console.log('------')
                    console.log('data check string:')
                    console.log(dataCheckString)
                    console.log('------')
                    console.log('calculated hash:')
                    console.log(calculatedHash.toString(Hex))
                    console.log('------')
                    console.log('expected hash (comes from raw initial data `hash`):')
                    console.log(info.hash)
                    console.log('------')

                    setTgUser(info)
                }}/>
            }
            {
                tgUser === null ? null :
                    <>
                        <CalendarView selectedDateInfo={selectedDateInfo} setSelectedDateInfo={setSelectedDateInfo}/>
                        {
                            selectedDateInfo == null ? null :
                                <SingleDayView selectedDateInfo={selectedDateInfo}/>
                        }
                    </>
            }
        </>
    )
}

export default App
