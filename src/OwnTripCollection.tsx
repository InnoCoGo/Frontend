import useFetch from './UseFetch.ts';
import {SERVER_URL} from "./MainView.tsx";
import {injectIntl, IntlShape} from "react-intl";
import TripBlock from './TripBlock.tsx';
export type singleTripDescription = {
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
export type serverJoinedTripsResponse =
    {
        data: singleTripDescription[] | null
    }

export type serverJoinedTripsRequest = null;
async function applyJoin() {
    // if ()
    // else {
    //     fetch(`${SERVER_URL}/api/v1/trip/?token=${props.token}`, {
    //         method: 'post',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },

    //         body: JSON.stringify({
    //             trip_id: index,
    //         })
    //     });
    // }
}
function OwnTripCollection(props: {
    intl: IntlShape,
    pointToName: Map<number, string>,
    token: string,
}) {
    const {
        data,
        errorMessage,
        hasError,
        isLoading,
    } = useFetch<serverJoinedTripsResponse>(`${SERVER_URL}/api/v1/trip/?token=${props.token}`, null, "get", false)

    return <div className="results">
        {hasError ? errorMessage :
            isLoading || data == null ? props.intl.formatMessage({id: "loading_trips"}) :
                data.data == null ? props.intl.formatMessage({id: "no_trip_matches"}) :
                    data.data.map((trip, index) => (
                        <TripBlock
                            key={index}
                            username={trip.admin_username}
                            departure={props.pointToName.get(trip.from_point) ?? `${props.intl.formatMessage({id: "unknown_trip_point"})}: ${trip.from_point}`}
                            arrival={props.pointToName.get(trip.to_point) ?? `${props.intl.formatMessage({id: "unknown_trip_point"})}: ${trip.to_point}`}
                            date={trip.chosen_timestamp}
                            passengers={trip.places_max - trip.places_taken}
                            extraNote={trip.description}
                            applyJoin={applyJoin}
                        />
                    ))}
    </div>
}

export default injectIntl(OwnTripCollection);
