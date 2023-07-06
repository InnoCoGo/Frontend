import FilterBar from "./FilterBar.tsx";
import TripCollection, {serverAdjacentTripsRequest} from "./TripCollection.tsx";
import {useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {SERVER_URL} from "./MainView.tsx";
import {getDefaultDarkMode} from "./TelegramUtils.ts";
import {injectIntl, IntlShape} from "react-intl";
import CreateBar from "./CreateBar.tsx";
// import { BottomNavigation, BottomNavigationAction } from "@mui/material";
// import HomeIcon from "@mui/icons-material/Home";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import PersonIcon from "@mui/icons-material/Person";
function SignedInMainView(props: {
    token: string,
    intl: IntlShape
}) {

    const prefersDarkMode = getDefaultDarkMode();

    //const [value,setValue] = useState(0)
    const [selectedDeparturePoint, setSelectedDeparturePoint] =
        useState<string>('0');
    const [selectedArrivalPoint, setSelectedArrivalPoint] =
        useState<string>('0');
    const [selectedDateTime, setSelectedDateTime] = useState<Dayjs | null>(dayjs());
    const [selectedIsDriver, setSelectedIsDriver] =
        useState<string>('0');
    const [selectedMaxPlace, setSelectedMaxPlace] =
        useState<string>('1');
    const [selectedTakenPlace, setSelectedTakenPlace] =
        useState<string>('1');
    const [selectedText, setSelectedText] = useState<string>("");
    const travelPointsOptions = [
        {value: '0', label: props.intl.formatMessage({id: "innopolis"})},
        {value: '1', label: props.intl.formatMessage({id: "kazan"})},
        {value: '2', label: props.intl.formatMessage({id: "uslon"})}
    ];
    const numberToLabel = new Map(travelPointsOptions
        .map(({label}, index) => [index, label]))

    const driverPointsOptions = [
        {value: '0', label: props.intl.formatMessage({id: 'idk_car'})},
        {value: '1', label: props.intl.formatMessage({id: 'has_car'})},
        {value: '2', label: props.intl.formatMessage({id: 'no_car'})},
    ];
    const driverCreateOptions = [
        {value: '0', label: props.intl.formatMessage({id: 'has_car'})},
        {value: '1', label: props.intl.formatMessage({id: 'no_car'})},
    ];
    const takenPointsOptions =
        Array.from(new Array(7), (_, i) => i + 1)
            .map(i => {
                return {value: i.toString(), label: i.toString()}
            });
    const [filters, setFilters] = useState<null | serverAdjacentTripsRequest>(null);
    const [createMenuOpen, setCreateMenuOpen] = useState<boolean>(false);

    //const [creates, setCreates] = useState<null|serverCreateTripRequest>(null);

    function applyFilters() {
        if (selectedDateTime == null || selectedDeparturePoint == null || selectedArrivalPoint == null)
            setFilters(null);
        else {
            // TODO: decide on value
            const filteringThresholdInHours = 24;
            setFilters(
                {
                    left_timestamp: selectedDateTime.add(-filteringThresholdInHours, 'hour').toISOString(),
                    right_timestamp: selectedDateTime.add(filteringThresholdInHours, 'hour').toISOString(),
                    from_point: parseInt(selectedDeparturePoint),
                    to_point: parseInt(selectedArrivalPoint),
                    companion_type: selectedIsDriver === '1' ? 'driver' : (selectedIsDriver === '2' ? 'passenger' : 'both')
                }
            )
        }
    }

    function setEverythingToDefault() {
        setFilters(null)
        setSelectedDeparturePoint('0')
        setSelectedArrivalPoint('0')
        setSelectedDateTime(null)
        setSelectedIsDriver('0')

    }

    async function applySubmit() {
        if (selectedDateTime == null || selectedDeparturePoint == null || selectedArrivalPoint == null || selectedMaxPlace == null || selectedTakenPlace == null || selectedIsDriver == null)
            //setCreates(null);
            setCreateMenuOpen(true);
        else {
            fetch(`${SERVER_URL}/api/v1/trip/?token=${props.token}`, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    is_driver: (selectedIsDriver == "0"),
                    places_max: parseInt(selectedMaxPlace),
                    places_taken: parseInt(selectedTakenPlace),
                    chosen_timestamp: selectedDateTime.toISOString(),
                    from_point: parseInt(selectedDeparturePoint),
                    to_point: parseInt(selectedArrivalPoint),
                    description: selectedText
                })
            });
            setEverythingToDefault()
            setCreateMenuOpen(false);
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
        setCreateMenuOpen(true);
    }

    function applyExit() {
        setCreateMenuOpen(false);
        setEverythingToDefault()
    }

    return <>
        {createMenuOpen ? false : <FilterBar defaultValueStartLocation={selectedDeparturePoint}
                                             onChangeStartLocation={setSelectedDeparturePoint}
                                             travelPointOptions={travelPointsOptions} prefersDark={prefersDarkMode}
                                             defaultValueEndLocation={selectedArrivalPoint}
                                             onChangeEndLocation={setSelectedArrivalPoint}
                                             chosenDateTime={selectedDateTime}
                                             onDateTimeChange={setSelectedDateTime} onConfirmFilters={applyFilters}
                                             onConfirmCreate={applyCreate} defaultValueIsDriver={selectedIsDriver}
                                             onChangeIsDriver={setSelectedIsDriver}
                                             driverPointOptions={driverPointsOptions}/>
        }
        {!createMenuOpen ? false :
            <CreateBar defaultValueStartLocation={selectedDeparturePoint}
                       onChangeStartLocation={setSelectedDeparturePoint}
                       travelPointOptions={travelPointsOptions} prefersDark={prefersDarkMode}
                       defaultValueEndLocation={selectedArrivalPoint}
                       onChangeEndLocation={setSelectedArrivalPoint} chosenDateTime={selectedDateTime}
                       onDateTimeChange={setSelectedDateTime} defaultValueIsDriver={selectedIsDriver}
                       onChangeIsDriver={setSelectedIsDriver} driverPointOptions={driverCreateOptions}
                       defaultValueMaxPlace={selectedMaxPlace} onChangeMaxPlace={setSelectedMaxPlace}
                       takenPointOptions={takenPointsOptions} defaultValueTakenPlace={selectedTakenPlace}
                       onChangeTakenPlace={setSelectedTakenPlace} onTextChange={setSelectedText}
                       onConfirmSubmit={applySubmit} defaultValueText={selectedText}
                       onConfirmExit={applyExit}/>
        }
        {/* {creates == null? null:
            <SubmitBar token={props.token} creates={creates}></SubmitBar>
            } */}
        {filters == null || createMenuOpen ? null :
            <TripCollection token={props.token} pointToName={numberToLabel} filters={filters}/>}
            {/* {<BottomNavigation 
            sx={{width : '100%' , position: "absolute" , bottom:0}}
            onChange={() =>{
            }}>
                <BottomNavigationAction label = 'Home' icon = {<HomeIcon />} />
                <BottomNavigationAction label = 'Favorite' icon = {<FavoriteIcon />} />
                <BottomNavigationAction label = 'Profile' icon = {<PersonIcon />} />
                </BottomNavigation>} */}
    </>;

}

export default injectIntl(SignedInMainView)