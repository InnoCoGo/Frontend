import {dateInfo} from "./Types";
import {Dispatch} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export function CalendarView(props: {
    selectedDateInfo: dateInfo | null,
    setSelectedDateInfo: Dispatch<dateInfo | null>
}) {
    return <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={function (info) {
            if (props.selectedDateInfo != null) {
                props.selectedDateInfo.dateElement.style.backgroundColor = '';
            }
            // change the day's background color just for fun
            info.dayEl.style.backgroundColor = 'red';

            props.setSelectedDateInfo({date: info.dateStr, dateElement: info.dayEl})
        }}
    />;
}