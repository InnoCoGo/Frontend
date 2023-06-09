import {useState} from 'react'
import './App.css'
import {dateInfo, telegramInfo} from "./Types.ts";
import {SingleDayView} from "./SingleDayView.tsx";
import {CalendarView} from "./CalendarView.tsx";
import {AuthPage} from "./AuthPage.tsx";


function App() {
    const [selectedDateInfo, setSelectedDateInfo] = useState<dateInfo | null>(null)
    const [tgUser, setTgUser] = useState<telegramInfo | null>(null)
    return (
        <>

            {tgUser !== null ? null :
                <AuthPage dataOnAuth={function (info: telegramInfo) {
                    console.log(info)
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
