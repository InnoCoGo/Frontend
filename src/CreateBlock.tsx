import useFetch from "./UseFetch.ts";
import {SERVER_URL} from "./MainView.tsx";

export type singleCreateDescription = {
    "trip_id" : number
}
export type serverCreateTripResponse =
    {
        data : singleCreateDescription[] | null
    }
export type serverCreateTripRequest = {
    "is_driver" : boolean,
    "places_max" : number,
    "places_taken" : number,
    "chosen_timestamp" : string,
    "from_point" : number,
    "to_point" : number,
    "description" : string
}

export function SubmitBar(props: {
    token: string, 
    creates: serverCreateTripRequest
}) {
    const {
        data,
        errorMessage,
        hasError,
        isLoading,
    } = useFetch<serverCreateTripResponse>(`${SERVER_URL}/api/v1/trip?token=${props.token}`, JSON.stringify(props.creates), "post", false)


    return <div className="flex-container">
        {
        hasError? errorMessage :
            isLoading || data == null ? "loading..." :
                data.data == null? "NOT CREATED" :
                data.data.map((trip) => (
            <div>Succesfully created trip number {trip.trip_id} !</div>
            ))
        }
    </div>;
}