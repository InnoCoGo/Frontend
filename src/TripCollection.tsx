import useFetch from "./UseFetch.ts";
import {SERVER_URL} from "./MainView.tsx";
import {injectIntl, IntlShape} from "react-intl";
import {useEffect, useState} from 'react';
import FilteredTripBlock from "./FilteredTripBlock.tsx";
import {enqueueSnackbar} from "notistack";
import dayjs from "dayjs";

export type singleTripDescription = {
    "id": number,
    "admin_username": string,
    "admin_id": number,
    "is_driver": boolean,
    "places_max": number,
    "places_taken": number,
    "chosen_timestamp": string, // new Date()-parsable string
    "from_point": number,
    "to_point": number,
    "description": string
}
export type singleJoinDescription = {
    "status": string,
}
export type serverAdjacentTripsResponse =
    {
        data: singleTripDescription[] | null
    }
export type serverAdjacentTripsRequest = {
    "left_timestamp": string, // new Date()-parsable string
    "right_timestamp": string, // new Date()-parsable string
    "from_point": number,
    "to_point": number,
    "companion_type": 'driver' | 'passenger' | 'both'
}

function TripCollection(props: {
    intl: IntlShape,
    pointToName: Map<number, string>,
    token: string,
    filters: serverAdjacentTripsRequest,
    userTelegramUsername: string,
    tripsAlreadyAttemptedToJoin: Set<number>,
    setTripsAlreadyAttemptedToJoin: (newValue: Set<number>) => void,
    middleTimestamp: dayjs.Dayjs
}) {
    const [joinTripId, setJoinTripId] = useState<number | null>(null);
    const [isFetching, setIsFetching] = useState<boolean>(false);

    // TODO: do something with the value
    console.log(isFetching)

    const {
        data: tripsData,
        errorMessage: tripsErrorMessage,
        hasError: tripsHasError,
        isLoading: tripsIsLoading,
    } = useFetch<serverAdjacentTripsResponse>(`${SERVER_URL}/api/v1/trip/adjacent?token=${props.token}`, JSON.stringify(props.filters), "put", false)


    useEffect(() => {
        if (joinTripId === null) {
            return;
        }
        console.log(joinTripId);
        // Call the API here
        setIsFetching(true)
        fetch(`${SERVER_URL}/api/v1/user/join_trip/req/${joinTripId}?token=${props.token}`)
            .then(() => setIsFetching(false))
            .then(()=> enqueueSnackbar(props.intl.formatMessage({id:"trip_joined_message"}),
                {variant: 'success', anchorOrigin:{vertical:"bottom", horizontal:"center"}}))
    }, [joinTripId]);
    const applyJoin = (index: number) => {
        console.log(index);
        props.tripsAlreadyAttemptedToJoin.add(index)
        setJoinTripId(index);
    };
    return <div className="results">

        {tripsHasError ? tripsErrorMessage :
            tripsIsLoading || tripsData == null ? props.intl.formatMessage({id: "loading_trips"}) :
                tripsData.data == null ? props.intl.formatMessage({id: "no_trip_matches"}) :
                    tripsData.data
                        .sort(trip => Math.abs(dayjs(trip.chosen_timestamp).valueOf() - props.middleTimestamp.valueOf()))
                        .map(trip => (
                            <FilteredTripBlock
                                key={trip.id}
                                username={trip.admin_username}
                                departure={props.pointToName.get(trip.from_point) ?? `${props.intl.formatMessage({id: "unknown_trip_point"})}: ${trip.from_point}`}
                                arrival={props.pointToName.get(trip.to_point) ?? `${props.intl.formatMessage({id: "unknown_trip_point"})}: ${trip.to_point}`}
                                date={trip.chosen_timestamp}
                                passengers={trip.places_max - trip.places_taken}
                                extraNote={trip.description}
                                applyJoin={() => applyJoin(trip.id)}
                                disableButton={props.userTelegramUsername == trip.admin_username || props.tripsAlreadyAttemptedToJoin.has(trip.id)}
                            />
                        ))}
    </div>
}

export default injectIntl(TripCollection)