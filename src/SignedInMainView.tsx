import FilterBar from "./FilterBar.tsx";
import {serverAdjacentTripsRequest} from "./TripCollection.tsx";
import TripCollection from "./TripCollection.tsx"
import { useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {SERVER_URL} from "./MainView.tsx";
import {getDefaultDarkMode} from "./TelegramUtils.ts";
import {injectIntl, IntlShape} from "react-intl";
import CreateBar from "./CreateBar.tsx";

function SignedInMainView(props: {
    token: string,
    intl: IntlShape
}) {

    const prefersDarkMode = getDefaultDarkMode();


    const [selectedDeparturePoint, setSelectedDeparturePoint] =
        useState<string | null>(null);
    const [selectedArrivalPoint, setSelectedArrivalPoint] =
        useState<string | null>(null);
    const [selectedDateTime, setSelectedDateTime] = useState<Dayjs | null>(dayjs());
    const [selectedIsDriver, setSelectedIsDriver] =
        useState<string| null>(null);
    const [selectedMaxPlace, setSelectedMaxPlace] =
        useState<{ value: number; label: number; } | null>(null);
    const [selectedTakenPlace, setSelectedTakenPlace] =
        useState<{ value: number; label: number; } | null>(null);
    const [selectedText, setSelectedText] =useState< string >("");
    const travelPointsOptions = [
        {value: '0', label: props.intl.formatMessage({id: "innopolis"})},
        {value: '1', label: props.intl.formatMessage({id: "kazan"})},
        {value: '2', label: props.intl.formatMessage({id: "uslon"})}
    ];
    const numberToLabel = new Map(travelPointsOptions
        .map(({label}, index) => [index, label]))

    const driverPointsOptions = [
            {value: '0', label: 'YES'},
            {value: '1', label: 'NO'},
            {value: '2', label: 'BOTH'}
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
                    left_timestamp: selectedDateTime.add(-filteringThresholdInHours, 'hour').toISOString(),
                    right_timestamp: selectedDateTime.add(filteringThresholdInHours, 'hour').toISOString(),
                    from_point: parseInt(selectedDeparturePoint),
                    to_point: parseInt(selectedArrivalPoint),
                    companion_type: selectedIsDriver === '0'? 'driver' : (selectedIsDriver === '1'? 'passenger' : 'both')
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
                        is_driver : (selectedIsDriver == "0"),
                        places_max : selectedMaxPlace.value,
                        places_taken : selectedTakenPlace.value ,
                        chosen_timestamp : selectedDateTime.toISOString(),
                        from_point: parseInt(selectedDeparturePoint),
                        to_point: parseInt(selectedArrivalPoint  ),
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
    return <>
            <FilterBar defaultValueStartLocation={selectedDeparturePoint}
                       onChangeStartLocation={setSelectedDeparturePoint}
                       travelPointOptions={travelPointsOptions} prefersDark={prefersDarkMode}
                       defaultValueEndLocation={selectedArrivalPoint}
                       onChangeEndLocation={setSelectedArrivalPoint} chosenDateTime={selectedDateTime}
                       onDateTimeChange={setSelectedDateTime} onConfirmFilters={applyFilters}
                       onConfirmCreate={applyCreate} defaultValueIsDriver={selectedIsDriver} onChangeIsDriver={setSelectedIsDriver} driverPointOptions={driverPointsOptions}/>
            {/*{flag == false? false :*/}
            {/*// <CreateBar defaultValueStartLocation={selectedDeparturePoint}*/}
            {/*// onChangeStartLocation={setSelectedDeparturePoint}*/}
            {/*// travelPointOptions={travelPointsOptions} prefersDark={prefersDarkMode}*/}
            {/*// defaultValueEndLocation={selectedArrivalPoint}*/}
            {/*// onChangeEndLocation={setSelectedArrivalPoint} chosenDateTime={selectedDateTime}*/}
            {/*// onDateTimeChange={setSelectedDateTime} defaultValueIsDriver={selectedIsDriver}*/}
            {/*// onChangeIsDriver={setSelectedIsDriver} driverPointOptions={driverPointsOptions}*/}
            {/*// defaultValueMaxPlace={selectedMaxPlace} onChangeMaxPlace={setSelectedMaxPlace}*/}
            {/*// takenPointOptions={takenPointsOptions} defaultValueTakenPlace={selectedTakenPlace}*/}
            {/*// onChangeTakenPlace={setSelectedTakenPlace}  onTextChange={setSelectedText}*/}
            {/*// onConfirmSubmit={applySubmit} defaultValueText={selectedText}*/}
            {/*// onConfirmExit={applyExit}/>*/}
            {/*}*/}
            {/* {creates == null? null:
            <SubmitBar token={props.token} creates={creates}></SubmitBar>
            } */}
            {filters == null? null :
            <TripCollection  token={props.token} pointToName={numberToLabel} filters={filters}/>}
    </>;

}

export default injectIntl(SignedInMainView)