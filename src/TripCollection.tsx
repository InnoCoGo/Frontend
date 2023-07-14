import TripBlock from "./TripBlock.tsx";
import useFetch from "./UseFetch.ts";
import {SERVER_URL} from "./MainView.tsx";
import {injectIntl, IntlShape} from "react-intl";
import { useState, useEffect } from 'react';

export type singleTripDescription = {
    "id" : number,
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
export type serverJoinTripsResponse =
    {
        data: singleJoinDescription | null
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
    filters: serverAdjacentTripsRequest
}) {
    const [joinTripId, setJoinTripId] = useState<number|null>(null);

    const {
        data: tripsData,
        errorMessage : tripsErrorMessage,
        hasError : tripsHasError,
        isLoading : tripsIsLoading,
    } = useFetch<serverAdjacentTripsResponse>(`${SERVER_URL}/api/v1/trip/adjacent?token=${props.token}`, JSON.stringify(props.filters), "put", false)

    const JOIN_TRIP_URL = joinTripId !== null 
    ? `${SERVER_URL}/api/v1/user/join_trip/req/${joinTripId}?token=${props.token}`
    : null;
    
    const {
        data: joinsData,
        errorMessage : joinsErrorMessage,
        hasError : joinsHasError,
        isLoading : joinsIsLoading,
    } = useFetch<serverJoinTripsResponse>(JOIN_TRIP_URL!, null , "get", false)

    useEffect(() => {
        if (joinTripId === null) {
            return;
        }
        console.log(joinTripId);
        // Call the API here
        console.log(joinsData);
        console.log(joinsErrorMessage);
        console.log(joinsHasError);
        console.log(joinsIsLoading);
        console.log(JOIN_TRIP_URL);
    }, [joinTripId]);
    const applyJoin = (index:number) => {
        console.log(index);
        setJoinTripId(index);
    };    
    return <div className="results">

        {tripsHasError ? tripsErrorMessage :
            tripsIsLoading || tripsData == null ? props.intl.formatMessage({id: "loading_trips"}) :
                tripsData.data == null ? props.intl.formatMessage({id: "no_trip_matches"}) :
                    tripsData.data.map((trip, index) => (
                        <TripBlock
                            key={index}
                            username={trip.admin_username}
                            departure={props.pointToName.get(trip.from_point) ?? `${props.intl.formatMessage({id: "unknown_trip_point"})}: ${trip.from_point}`}
                            arrival={props.pointToName.get(trip.to_point) ?? `${props.intl.formatMessage({id: "unknown_trip_point"})}: ${trip.to_point}`}
                            date={trip.chosen_timestamp}
                            passengers={trip.places_max - trip.places_taken}
                            extraNote={trip.description}
                            applyJoin={() => applyJoin(trip.id)}
                        />
                    ))}
    </div>
}

export default injectIntl(TripCollection)