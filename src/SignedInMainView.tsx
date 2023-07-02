import FilterBar from "./FilterBar.tsx";
import TripCollection, {serverAdjacentTripsRequest} from "./TripCollection.tsx";
import {useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {getDefaultDarkMode} from "./TelegramUtils.ts";
import {injectIntl, IntlShape} from "react-intl";

function SignedInMainView(props: {
    token: string,
    intl: IntlShape
}) {

    const prefersDarkMode = getDefaultDarkMode();


    const [selectedDeparturePoint, setSelectedDeparturePoint] =
        useState<{ value: string; label: string; } | null>(null);
    const [selectedArrivalPoint, setSelectedArrivalPoint] =
        useState<{ value: string; label: string; } | null>(null);
    const [selectedDateTime, setSelectedDateTime] = useState<Dayjs | null>(dayjs());


    const travelPointsOptions = [
        {value: '0', label: props.intl.formatMessage({id: "innopolis"})},
        {value: '1', label: props.intl.formatMessage({id: "kazan"})},
        {value: '2', label: props.intl.formatMessage({id: "uslon"})}
    ];
    const numberToLabel = new Map(travelPointsOptions
        .map(({label}, index) => [index, label]))


    const [filters, setFilters] = useState<null | serverAdjacentTripsRequest>(null);

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
                    from_point: parseInt(selectedDeparturePoint.value),
                    to_point: parseInt(selectedArrivalPoint.value),
                    companion_type: "both" // TODO: select in UI
                }
            )
        }
    }

    return <>
        <FilterBar defaultValueStartLocation={selectedDeparturePoint}
                   onChangeStartLocation={setSelectedDeparturePoint}
                   travelPointOptions={travelPointsOptions} prefersDark={prefersDarkMode}
                   defaultValueEndLocation={selectedArrivalPoint}
                   onChangeEndLocation={setSelectedArrivalPoint} chosenDateTime={selectedDateTime}
                   onDateTimeChange={setSelectedDateTime} onConfirmFilters={applyFilters}/>
        {filters == null ? null :
            <TripCollection token={props.token} pointToName={numberToLabel} filters={filters}/>}
    </>
        ;

}

export default injectIntl(SignedInMainView)