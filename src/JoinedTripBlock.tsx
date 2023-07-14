import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import {injectIntl, IntlShape} from "react-intl";
import {Box, Button, CardActions} from "@mui/material";
import TelegramIcon from '@mui/icons-material/Telegram';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import PersonIcon from '@mui/icons-material/Person';
import AlarmIcon from '@mui/icons-material/Alarm';
import DescriptionIcon from '@mui/icons-material/Description';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';

export type joinedTripBlockProps = {
    departure: string,
    arrival: string,
    date: string,
    passengers: number,
    username: string,
    extraNote: string,
    intl: IntlShape,
    clickDelete: () => void
}
export type joinedTripBlockDescription = joinedTripBlockProps & { tripId: number };

function JoinedTripBlock({
                             departure,
                             arrival,
                             date,
                             passengers,
                             username,
                             extraNote,
                             intl,
                             clickDelete
                         }: joinedTripBlockProps) {
    const url = `https://t.me/${username}`;
    return <Card className="trip-block">
        <CardContent>
            <Box display="center" alignItems="center" justifyContent={"center"}>
                <LocationOnIcon sx={{fontSize: 27}}/>
                <Typography variant="h6">
                    {intl.formatMessage({id: "trip_from"})}: {departure}
                </Typography>
            </Box>

            <Box display="center" alignItems="center" justifyContent={"center"}>
                <SportsScoreIcon sx={{fontSize: 27}}/>
                <Typography variant="h6">
                    {intl.formatMessage({id: "trip_to"})}: {arrival}
                </Typography>
            </Box>

            <Box display="center" alignItems="center" justifyContent={"center"}>
                <AlarmIcon sx={{fontSize: 27}}/>
                <Typography variant="h6">
                    {intl.formatMessage({id: "trip_datetime"})}: {dayjs(date).format("YYYY-MM-DD HH:mm")}
                </Typography>
            </Box>

            <Box display="center" alignItems="center" justifyContent={"center"}>
                <PersonIcon sx={{fontSize: 27}}/>
                <Typography variant="h6">
                    {intl.formatMessage({id: "trip_free_seats"})}: {passengers}
                </Typography>
            </Box>

            <Box display="center" alignItems="center" justifyContent={"center"}>
                <DescriptionIcon sx={{fontSize: 18}}/>
                <Typography variant="body2">
                    {intl.formatMessage({id: "trip_description"})}: {extraNote}
                </Typography>
            </Box>
        </CardContent>

        <CardActions>
            <Button href={url} target="_blank" startIcon={<TelegramIcon/>}>@{username}</Button>
            <Button variant="contained" disableElevation
                    onClick={clickDelete} endIcon={<BookmarkAddIcon/>}>{intl.formatMessage({id: "leave"})}</Button>
        </CardActions>
    </Card>
}

export default injectIntl(JoinedTripBlock)