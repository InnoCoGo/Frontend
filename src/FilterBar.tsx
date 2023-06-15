import Select, {Theme} from "react-select";
import * as React from "react";
import {useState} from "react";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DateTimePicker} from '@mui/x-date-pickers';
import useMediaQuery from '@mui/material/useMediaQuery';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const selectTheme = (theme: Theme) => ({
    ...theme,
    colors: {
        primary25: 'blue',
        primary: 'gray',
        neutral0: '', primary75: '', primary50: '', danger: '',
        dangerLight: '', neutral5: '', neutral10: '', neutral20: '',
        neutral30: '', neutral40: '', neutral50: '', neutral60: '',
        neutral70: '', neutral80: '', neutral90: ''
    },
})


export function FilterBar() {

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

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

    const travelPointsOptions = [
        {value: 'innopolis', label: 'Innopolis'},
        {value: 'kazan', label: 'Kazan'},
        {value: 'verkhniy uslon', label: 'Verkhniy Uslon'}
    ];
    return <ThemeProvider
        theme={theme}>
        <CssBaseline/>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="flex-container">
                <div className="flex-container-horizontal">
                    From:
                    <Select
                        defaultValue={selectedDeparturePoint}
                        onChange={setSelectedDeparturePoint}
                        options={travelPointsOptions}
                        placeholder={"Departure point"}
                        theme={selectTheme}
                    />
                </div>
                <div className="flex-container-horizontal">
                    To:
                    <Select
                        defaultValue={selectedArrivalPoint}
                        onChange={setSelectedArrivalPoint}
                        options={travelPointsOptions}
                        placeholder={"Arrival point"}
                        theme={selectTheme}
                    />
                </div>
                <div className="flex-container-horizontal">
                    At:
                    <DateTimePicker/>
                </div>
                <button>Ok</button>
            </div>
        </LocalizationProvider>
    </ThemeProvider>;
}