import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import {injectIntl, IntlShape} from "react-intl";

export type tripBlockProps = {
    departure: string,
    arrival: string,
    date: string,
    passengers: number,
    username: string,
    extraNote: string,
    intl: IntlShape
}
export type tripBlockDescription = tripBlockProps & { tripId: number };

function TripBlock({departure, arrival, date, passengers, username, extraNote, intl}: tripBlockProps) {
    return <Card className="trip-block">
        <CardContent>
            <Typography variant="h6">{intl.formatMessage({id: "trip_from"})}: {departure}</Typography>
            <Typography variant="h6">{intl.formatMessage({id: "trip_to"})}: {arrival}</Typography>
            <Typography
                variant="h6">{intl.formatMessage({id: "trip_datetime"})}: {dayjs(date, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD HH:mm")}</Typography>
            <Typography variant="h6">{intl.formatMessage({id: "trip_free_seats"})}: {passengers}</Typography>
            <Typography variant="h6">{intl.formatMessage({id: "trip_admin_username"})}: {username}</Typography>
            {extraNote && (
                <Typography variant="body2">{intl.formatMessage({id: "trip_description"})}: {extraNote}</Typography>
            )}
        </CardContent>
    </Card>
}

export default injectIntl(TripBlock)