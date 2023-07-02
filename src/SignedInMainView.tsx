import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {FilterBar} from "./FilterBar.tsx";
import {CreateBar} from "./CreateBar.tsx";
import {serverAdjacentTripsRequest, TripCollection} from "./TripCollection.tsx";
//import {serverCreateTripRequest, SubmitBar} from "./CreateBlock.tsx";
import * as React from "react";
import { useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {SERVER_URL} from "./MainView.tsx";
import {getDefaultDarkMode} from "./TelegramUtils.ts";

export function SignedInMainView(props: {
    token: string
}) {

    const prefersDarkMode = getDefaultDarkMode();

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );


    const [selectedDeparturePoint, setSelectedDeparturePoint] =
        useState<{ value: string; label: string; } | null>(null);
    const [selectedArrivalPoint, setSelectedArrivalPoint] =
        useState<{ value: string; label: string; } | null>(null);
    const [selectedDateTime, setSelectedDateTime] = useState<Dayjs | null>(dayjs());
    const [selectedIsDriver, setSelectedIsDriver] =
        useState<{ value: string; label: string; } | null>(null);
    const [selectedMaxPlace, setSelectedMaxPlace] =
        useState<{ value: number; label: number; } | null>(null);
    const [selectedTakenPlace, setSelectedTakenPlace] =
        useState<{ value: number; label: number; } | null>(null);
    const [selectedText, setSelectedText] =useState< string >("");
    const travelPointsOptions = [
        {value: '0', label: 'Innopolis'},
        {value: '1', label: 'Kazan'},
        {value: '2', label: 'Verkhniy Uslon'}
    ];
    const numberToLabel = new Map(travelPointsOptions
        .map(({ label}, index) => [index,label]))
    const driverPointsOptions = [
            {value: 'true', label: 'YES'},
            {value: 'false', label: 'NO'},
    ];
    const takenPointsOptions = [
        {value: 1, label: 1},
        {value: 2, label: 2},
        {value: 3, label: 3},
        {value: 4, label: 4},
        {value: 5, label: 5},
        {value: 6, label: 6},
        {value: 7, label: 7},
    ];
    const [filters, setFilters] = useState<null|serverAdjacentTripsRequest>(null);
    const [flag, setFlag] = useState<boolean>(false);
    //const [creates, setCreates] = useState<null|serverCreateTripRequest>(null);

    function applyFilters() {
        if (selectedDateTime == null || selectedDeparturePoint == null || selectedArrivalPoint == null)
            setFilters(null);
        else {
            // TODO: decide on value
            const filteringThresholdInHours = 24;
            setFilters(
                {
                    left_timestamp:selectedDateTime.add(-filteringThresholdInHours,'hour').toISOString(),
                    right_timestamp: selectedDateTime.add(filteringThresholdInHours,'hour').toISOString(),
                    from_point: parseInt(selectedDeparturePoint.value),
                    to_point: parseInt(selectedArrivalPoint.value),
                    companion_type: "driver" // TODO: select in UI
                }
            )
        }
    }
    async function applySubmit() {
        if (selectedDateTime == null || selectedDeparturePoint == null || selectedArrivalPoint == null  || selectedMaxPlace == null  || selectedTakenPlace == null || selectedIsDriver == null )
            //setCreates(null);
            setFlag(true);
        else {
            fetch(`${SERVER_URL}/api/v1/trip?token=${props.token}`, {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
    
                    body: JSON.stringify({
                        is_driver : (selectedIsDriver.value == "true"),
                        places_max : selectedMaxPlace.value,
                        places_taken : selectedTakenPlace.value ,
                        chosen_timestamp : selectedDateTime.toISOString(),
                        from_point: parseInt(selectedDeparturePoint.value),
                        to_point: parseInt(selectedArrivalPoint.value),
                        description : selectedText
                    })
                });
                setFlag(false);
            // setCreates(
            //     {
            //         is_driver : (selectedIsDriver.value == "true"),
            //         places_max : selectedMaxPlace.value,
            //         places_taken : selectedTakenPlace.value ,
            //         chosen_timestamp : selectedDateTime.toISOString(),
            //         from_point: parseInt(selectedDeparturePoint.value),
            //         to_point: parseInt(selectedArrivalPoint.value),
            //         description : selectedText
            //     }
            //);
        }
    }

    function applyCreate() {
        setFlag(true);
    }
    function applyExit() {
        setFlag(false);
    }
    return <ThemeProvider theme={theme}>
        <CssBaseline/>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FilterBar defaultValueStartLocation={selectedDeparturePoint}
                       onChangeStartLocation={setSelectedDeparturePoint}
                       travelPointOptions={travelPointsOptions} prefersDark={prefersDarkMode}
                       defaultValueEndLocation={selectedArrivalPoint}
                       onChangeEndLocation={setSelectedArrivalPoint} chosenDateTime={selectedDateTime}
                       onDateTimeChange={setSelectedDateTime} onConfirmFilters={applyFilters}
                       onConfirmCreate={applyCreate}/>
            {flag == false? false : 
            <CreateBar defaultValueStartLocation={selectedDeparturePoint}
            onChangeStartLocation={setSelectedDeparturePoint}
            travelPointOptions={travelPointsOptions} prefersDark={prefersDarkMode}
            defaultValueEndLocation={selectedArrivalPoint}
            onChangeEndLocation={setSelectedArrivalPoint} chosenDateTime={selectedDateTime}
            onDateTimeChange={setSelectedDateTime} defaultValueIsDriver={selectedIsDriver}
            onChangeIsDriver={setSelectedIsDriver} driverPointOptions={driverPointsOptions}
            defaultValueMaxPlace={selectedMaxPlace} onChangeMaxPlace={setSelectedMaxPlace} 
            takenPointOptions={takenPointsOptions} defaultValueTakenPlace={selectedTakenPlace}
            onChangeTakenPlace={setSelectedTakenPlace}  onTextChange={setSelectedText}
            onConfirmSubmit={applySubmit} defaultValueText={selectedText}
            onConfirmExit={applyExit}/>
            }
            {/* {creates == null? null:
            <SubmitBar token={props.token} creates={creates}></SubmitBar>
            } */}
            {filters == null? null :
            <TripCollection  token={props.token} pointToName={numberToLabel} filters={filters}/>}
        </LocalizationProvider>
    </ThemeProvider>
        ;

}