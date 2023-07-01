import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {FilterBar} from "./FilterBar.tsx";
import {serverAdjacentTripsRequest, TripCollection} from "./TripCollection.tsx";
import * as React from "react";
import { useState} from "react";
import dayjs, {Dayjs} from "dayjs";
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


    const travelPointsOptions = [
        {value: '1', label: 'Innopolis'},
        {value: '2', label: 'Kazan'},
        {value: '3', label: 'Verkhniy Uslon'}
    ];
    const numberToLabel = new Map(travelPointsOptions
        .map(({ label}, index) => [index,label]))


    const [filters, setFilters] = useState<null|serverAdjacentTripsRequest>(null);

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
                    companion_type: "both" // TODO: select in UI
                }
            )
        }
    }

    return <ThemeProvider theme={theme}>
        <CssBaseline/>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <FilterBar defaultValueStartLocation={selectedDeparturePoint}
                       onChangeStartLocation={setSelectedDeparturePoint}
                       travelPointOptions={travelPointsOptions} prefersDark={prefersDarkMode}
                       defaultValueEndLocation={selectedArrivalPoint}
                       onChangeEndLocation={setSelectedArrivalPoint} chosenDateTime={selectedDateTime}
                       onDateTimeChange={setSelectedDateTime} onConfirmFilters={applyFilters}/>
            {filters == null? null :
            <TripCollection  token={props.token} pointToName={numberToLabel} filters={filters}/>}
        </LocalizationProvider>
    </ThemeProvider>
        ;

}