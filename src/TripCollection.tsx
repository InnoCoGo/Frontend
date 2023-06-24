import {TripBlock, tripBlockDescription} from "./TripBlock.tsx";

export function TripCollection({filteredTripData}: { filteredTripData: tripBlockDescription[] }) {
    return <div className="results">
        {filteredTripData.map((trip) => (
            <TripBlock
                key={trip.tripId}
                departure={trip.departure}
                arrival={trip.arrival}
                date={trip.date}
                passengers={trip.passengers}
                username={trip.username}
                extraNote={trip.extraNote}
            />
        ))}
    </div>
}