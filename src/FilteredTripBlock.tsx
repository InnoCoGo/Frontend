import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import {injectIntl, IntlShape} from "react-intl";
import {Box, Button, CardActions} from "@mui/material";
import TelegramIcon from '@mui/icons-material/Telegram';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import SportsScoreIcon from '@mui/icons-material/SportsScore';
import AlarmIcon from '@mui/icons-material/Alarm';
import DescriptionIcon from '@mui/icons-material/Description';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import GroupIcon from '@mui/icons-material/Group';

export type filteredTripBlockProps = {
    departure: string,
    arrival: string,
    date: string,
    passengers: number,
    username: string,
    extraNote: string,
    intl: IntlShape,
    applyJoin: () => void,
    disableButton: boolean
}
export type filteredTripBlockDescription = filteredTripBlockProps & { tripId: number };

function FilteredTripBlock({
                               departure,
                               arrival,
                               date,
                               passengers,
                               username,
                               extraNote,
                               intl,
                               applyJoin,
                               disableButton
                           }: filteredTripBlockProps) {
    const url = `https://t.me/${username}`;
    return <Card className="trip-block" sx={{borderRadius:"30px"}}>
        <CardContent>
        <Box display="center" alignItems="center" justifyContent={"center"}>
            <Typography variant="h6" style={{ color: departure === 'Kazan' || departure === 'Казань' ?  'red' 
                        : departure === 'Innopolis' || departure === 'Иннополис' ? 'green' 
                        : 'orange' }}>
                    {departure}
                </Typography>
                <ArrowRightAltIcon sx={{fontSize: 32}}/>
                <Typography variant="h6" style={{ color: arrival === 'Kazan' || arrival === 'Казань' ?  'red' 
                        : arrival === 'Innopolis' || arrival === 'Иннополис' ? 'green' 
                        : 'orange' }}>
                    {arrival}
                </Typography>
            </Box>

            <Box display="center" alignItems="center" justifyContent={"center"}>
                <AlarmIcon style={{marginRight:10}} sx={{fontSize: 27}}/>
                <Typography variant="h6">
                    {dayjs(date).format("HH:mm DD.MM.YYYY")}
                </Typography>
            </Box>

            <Box display="center" alignItems="center" justifyContent={"center"}>
                <GroupIcon sx={{fontSize: 27}} style={{marginRight:3}}/>
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
            <Button variant="contained" disableElevation disabled={disableButton}
                    onClick={applyJoin} endIcon={<BookmarkAddIcon/>}>{intl.formatMessage({id: "join"})}</Button>
        </CardActions>
    </Card>
}

export default injectIntl(FilteredTripBlock)