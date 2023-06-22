import Select, {Theme} from "react-select";
import * as React from "react";
import {useState} from "react";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DateTimePicker} from '@mui/x-date-pickers';
import useMediaQuery from '@mui/material/useMediaQuery';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);



const selectTheme = (theme: Theme) => ({
    ...theme,
    colors: {
        primary25: 'blue',
        primary: '#03045e',
        neutral0: '#0077b6', primary75: '', primary50: '', danger: '',
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
        const [selectedDateTime, setSelectedDateTime] = useState(dayjs());


    const travelPointsOptions = [
        {value: 'innopolis', label: 'Innopolis'},
        {value: 'kazan', label: 'Kazan'},
        {value: 'verkhniy uslon', label: 'Verkhniy Uslon'}
    ];

    function TripBlock({ departure, arrival, date, passengers, username, extraNote }) {
        return (
          <Card className="trip-block">
            <CardContent>
              <Typography variant="h6">Departure: {departure}</Typography>
              <Typography variant="h6">Arrival: {arrival}</Typography>
              <Typography variant="h6">Date: {dayjs(date, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm")}</Typography>
              <Typography variant="h6">Passengers: {passengers}</Typography>
              <Typography variant="h6">Username: {username}</Typography>
              {extraNote && (
                <Typography variant="body2">Extra Note: {extraNote}</Typography>
              )}
            </CardContent>
          </Card>
        );
      }
      

      const tripData = [
        {
          trip_id: 1,
          departure: "Innopolis",
          arrival: "Kazan",
          date: dayjs("2023-06-25 10:00", "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm"),
          passengers: 2,
          username: "@dirakon",
          extraNote: "Need extra legroom",
        },
        {
          trip_id: 2,
          departure: "Kazan",
          arrival: "Innopolis",
          date: dayjs("2023-06-25 12:00", "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm"),
          passengers: 3,
          username: "a1kuat",
          extraNote: "I have a dog",
        },
        {
            trip_id: 3,
            departure: "Kazan",
            arrival: "Verkhniy Uslon",
            date: dayjs("2023-06-22 15:00", "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm"),
            passengers: 4,
            username: "ikramkxt",
            extraNote: "Price:300RUB",
          },
          {
            trip_id: 4,
            departure: "Kazan",
            arrival: "Innopolis",
            date: dayjs("2023-06-24 19:00", "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm"),
            passengers: 1,
            username: "sasha",
            extraNote: "Business class",
          },
          {
            trip_id: 5,
            departure: "Innopolis",
            arrival: "Verkhniy Uslon",
            date: dayjs("2023-06-24 12:00", "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm"),
            passengers: 1,
            username: "ayaz",
            extraNote: "2 Big Bags",
          },
        // Other trip data objects...
      ];
      
      const [filteredTripData, setFilteredTripData] = useState(tripData);

      function filterTrips() {
        if (selectedDeparturePoint && selectedArrivalPoint) {
          const filteredData = tripData.filter((trip) => {
            return (
              trip.departure === selectedDeparturePoint.label &&
              trip.arrival === selectedArrivalPoint.label &&
              (selectedDateTime === null ||
                (dayjs(selectedDateTime).isSame(dayjs(trip.date), "day") &&
                  dayjs(selectedDateTime).isSame(dayjs(trip.date), "hour")))
            );
          });
          setFilteredTripData(filteredData);
        } else {
          setFilteredTripData(tripData);
        }
      }
      

  function Results() {
    return (
      <div className="results">
        {filteredTripData.map((trip) => (
          <TripBlock
            key={trip.trip_id}
            departure={trip.departure}
            arrival={trip.arrival}
            date={trip.date}
            passengers={trip.passengers}
            username={trip.username}
            extraNote={trip.extraNote}
          />
        ))}
      </div>
    );
  }
  
      
    return (<ThemeProvider
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
                    <DateTimePicker
                        value={selectedDateTime}
                        onChange={(newValue) => setSelectedDateTime(dayjs(newValue))}
                    />
                </div>
                <button onClick={filterTrips}>Ok</button>
        </div>
        <Results />
      </LocalizationProvider>
    </ThemeProvider>
  );
}