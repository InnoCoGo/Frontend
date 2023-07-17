import useFetch from './UseFetch.ts';
import {SERVER_URL} from "./MainView.tsx";
import {injectIntl, IntlShape} from "react-intl";
import JoinedTripBlock from './JoinedTripBlock.tsx';
import {singleTripDescription} from "./TripCollection.tsx";
import {useEffect, useState} from "react";
import {enqueueSnackbar} from "notistack";

export type serverJoinedTripsResponse =
    {
        data: singleTripDescription[] | null
    }

function OwnTripCollection(props: {
    intl: IntlShape,
    pointToName: Map<number, string>,
    token: string,
    locale: "en" | "ru",
    tripsAlreadyAttemptedToJoin: Set<number>,
    setTripsAlreadyAttemptedToJoin: (newValue: Set<number>) => void

}) {
    const {
        data,
        errorMessage,
        hasError,
        isLoading,
        refetch
    } = useFetch<serverJoinedTripsResponse>(`${SERVER_URL}/api/v1/trip/?token=${props.token}`, null, "get", false)

    const [deletedTripId, setDeletedTripId] = useState<number | null>(null);

    useEffect(() => {
        if (deletedTripId === null) {
            return;
        }
        const tripCurrentlyBeingDeleted = deletedTripId;
        console.log(tripCurrentlyBeingDeleted);
        // Call the API here
        fetch(`${SERVER_URL}/api/v1/trip/${tripCurrentlyBeingDeleted}?token=${props.token}`, {
            method: "delete",
            body: JSON.stringify({"trip_id": tripCurrentlyBeingDeleted})
        }).then(refetch)
            .then(()=>props.tripsAlreadyAttemptedToJoin.delete(tripCurrentlyBeingDeleted))
            .then(()=> enqueueSnackbar(props.intl.formatMessage({id:"trip_deleted_message"}),
                {variant: 'success', anchorOrigin:{vertical:"bottom", horizontal:"center"}}))
    }, [deletedTripId]);

    const clickDelete = (index: number) => {
        setDeletedTripId(index);
    };

    return <div className="results">
        {hasError ? errorMessage :
            isLoading || data == null ? props.intl.formatMessage({id: "loading_trips"}) :
                data.data == null ? props.intl.formatMessage({id: "no_trip_matches"}) :
                    data.data.map(trip => (
                        <JoinedTripBlock
                            key={trip.id}
                            username={trip.admin_username}
                            departure={props.pointToName.get(trip.from_point) ?? `${props.intl.formatMessage({id: "unknown_trip_point"})}: ${trip.from_point}`}
                            arrival={props.pointToName.get(trip.to_point) ?? `${props.intl.formatMessage({id: "unknown_trip_point"})}: ${trip.to_point}`}
                            date={trip.chosen_timestamp}
                            passengers={trip.places_max - trip.places_taken}
                            extraNote={props.locale === "en" ? trip.translated_desc : trip.description}
                            clickDelete={() => clickDelete(trip.id)}
                        />
                    ))}
    </div>
}

export default injectIntl(OwnTripCollection);
