import FilterBar from "./FilterBar.tsx";
import TripCollection, {serverAdjacentTripsRequest} from "./TripCollection.tsx";
import {useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {SERVER_URL} from "./MainView.tsx";
import {getDefaultDarkMode} from "./TelegramUtils.ts";
import {injectIntl, IntlShape} from "react-intl";
import CreateBar from "./CreateBar.tsx";
import TopAppBar from "./AppBar.tsx";
import OwnTripCollection from "./OwnTripCollection.tsx";
function SignedInMainView(props: {
    token: string,
    intl: IntlShape,
    locale: "en" | "ru",
    setLocale: (newValue: "en" | "ru") => void
}) {

    const prefersDarkMode = getDefaultDarkMode();

    const [selectedDeparturePoint, setSelectedDeparturePoint] =
        useState<string>('0');
    const [selectedArrivalPoint, setSelectedArrivalPoint] =
        useState<string>('0');
    const [selectedDateTime, setSelectedDateTime] = useState<Dayjs>(dayjs());
    const [selectedIsDriverFilter, setSelectedIsDriverFilter] =
        useState<string>('0');
    const [selectedIsDriverCreation, setSelectedIsDriverCreation] =
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

    const DRIVER_OPTION = '1', PASSENGER_OPTION = '2', EITHER_OPTION = '0';
    const driverPointsOptions = [
        {value: EITHER_OPTION, label: props.intl.formatMessage({id: 'idk_car'})},
        {value: DRIVER_OPTION, label: props.intl.formatMessage({id: 'has_car'})},
        {value: PASSENGER_OPTION, label: props.intl.formatMessage({id: 'no_car'})},
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
    const [MenuHome, setMenuHome] = useState<boolean>(true);
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
                    companion_type: selectedIsDriverFilter === DRIVER_OPTION ? 'driver' : (selectedIsDriverFilter === PASSENGER_OPTION ? 'passenger' : 'both')
                }
            )
        }
    }

    async function applySubmit() {
        if (selectedDateTime == null || selectedDeparturePoint == null || selectedArrivalPoint == null || selectedMaxPlace == null || selectedTakenPlace == null || selectedIsDriverCreation == null)
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
                    is_driver: (selectedIsDriverCreation == DRIVER_OPTION),
                    places_max: parseInt(selectedMaxPlace),
                    places_taken: parseInt(selectedTakenPlace),
                    chosen_timestamp: selectedDateTime.toISOString(),
                    from_point: parseInt(selectedDeparturePoint),
                    to_point: parseInt(selectedArrivalPoint),
                    description: selectedText
                })
            });
            // Clear description after successful trip creation
            setSelectedText("")
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
    }
    function applyHome(){
        setMenuHome(true);
    }
    function applyMyTrip(){
        setMenuHome(false);
    }
    return <>
        {<TopAppBar setLocale={props.setLocale} locale={props.locale} applyHome={applyHome} applyMyTrip={applyMyTrip}/>}
        {MenuHome ? false : <OwnTripCollection token={props.token} pointToName={numberToLabel} />}
        {(createMenuOpen || !MenuHome) ? undefined: <FilterBar defaultValueStartLocation={selectedDeparturePoint}
                                             onChangeStartLocation={setSelectedDeparturePoint}
                                             travelPointOptions={travelPointsOptions} prefersDark={prefersDarkMode}
                                             defaultValueEndLocation={selectedArrivalPoint}
                                             onChangeEndLocation={setSelectedArrivalPoint}
                                             chosenDateTime={selectedDateTime}
                                             onDateTimeChange={setSelectedDateTime} onConfirmFilters={applyFilters}
                                             onConfirmCreate={applyCreate} defaultValueIsDriver={selectedIsDriverFilter}
                                             onChangeIsDriver={setSelectedIsDriverFilter}
                                             driverPointOptions={driverPointsOptions}/>
        }
        {(!createMenuOpen || !MenuHome) ? undefined :
            <CreateBar defaultValueStartLocation={selectedDeparturePoint}
                       onChangeStartLocation={setSelectedDeparturePoint}
                       travelPointOptions={travelPointsOptions} prefersDark={prefersDarkMode}
                       defaultValueEndLocation={selectedArrivalPoint}
                       onChangeEndLocation={setSelectedArrivalPoint} chosenDateTime={selectedDateTime}
                       onDateTimeChange={setSelectedDateTime} defaultValueIsDriver={selectedIsDriverCreation}
                       onChangeIsDriver={setSelectedIsDriverCreation} driverPointOptions={driverCreateOptions}
                       defaultValueMaxPlace={selectedMaxPlace} onChangeMaxPlace={setSelectedMaxPlace}
                       takenPointOptions={takenPointsOptions} defaultValueTakenPlace={selectedTakenPlace}
                       onChangeTakenPlace={setSelectedTakenPlace} onTextChange={setSelectedText}
                       onConfirmSubmit={applySubmit} defaultValueText={selectedText}
                       onConfirmExit={applyExit}/>
        }
        {/* {creates == null? null:
            <SubmitBar token={props.token} creates={creates}></SubmitBar>
            } */}
        {filters == null || createMenuOpen || !MenuHome? null :
            <TripCollection token={props.token} pointToName={numberToLabel} filters={filters}/>}
    </>;

}

export default injectIntl(SignedInMainView)