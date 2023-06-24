import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";

export type tripBlockProps = {
    departure: string,
    arrival: string,
    date: string,
    passengers: number,
    username: string,
    extraNote: string
}
export type tripBlockDescription = tripBlockProps & { tripId: number };

export function TripBlock({departure, arrival, date, passengers, username, extraNote}: tripBlockProps) {
    return <Card className="trip-block">
        <CardContent>
            <Typography variant="h6">Departure: {departure}</Typography>
            <Typography variant="h6">Arrival: {arrival}</Typography>
            <Typography
                variant="h6">Date: {dayjs(date, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm")}</Typography>
            <Typography variant="h6">Passengers: {passengers}</Typography>
            <Typography variant="h6">Username: {username}</Typography>
            {extraNote && (
                <Typography variant="body2">Extra Note: {extraNote}</Typography>
            )}
        </CardContent>
    </Card>
}