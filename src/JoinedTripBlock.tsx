import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import {injectIntl, IntlShape} from "react-intl";
import {Box, Button, CardActions} from "@mui/material";
import TelegramIcon from '@mui/icons-material/Telegram';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import SportsScoreIcon from '@mui/icons-material/SportsScore';
import GroupIcon from '@mui/icons-material/Group';
import AlarmIcon from '@mui/icons-material/Alarm';
import DescriptionIcon from '@mui/icons-material/Description';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';


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
    console.log(departure);
    return <Card className="trip-block" sx={{borderRadius:"30px"}}>
        <CardContent>
            <Box display="center" alignItems="center" justifyContent={"center"}>
            <Typography variant="h6" style={{ color: departure === 'Kazan' || departure === 'Казань' ?  'red' 
                        : departure === 'Innopolis' || departure === 'Иннополис' ? 'green'
                        : departure === 'Airport' || departure === 'Аэропорт' ? 'blue'  
                        : 'orange' }}>
                    {departure}
                </Typography>
                <ArrowRightAltIcon style={{ position: 'relative', top: '2px' }} sx={{fontSize: 32}}/>
                <Typography variant="h6" style={{ color: arrival === 'Kazan' || arrival === 'Казань' ?  'red' 
                        : arrival === 'Innopolis' || arrival === 'Иннополис' ? 'green' 
                        : arrival === 'Airport' || arrival === 'Аэропорт' ? 'blue' 
                        : 'orange' }}>
                    {arrival}
                </Typography>
            </Box>

            {/* <Box display="center" alignItems="center" justifyContent={"center"}>
                <SportsScoreIcon sx={{fontSize: 27}}/>
                <Typography variant="h6">
                    {intl.formatMessage({id: "trip_to"})}: {arrival}
                </Typography>
            </Box> */}

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
            <Button variant="contained" disableElevation
                    onClick={clickDelete} endIcon={<LogoutIcon/>}>{intl.formatMessage({id: "leave"})}</Button>
        </CardActions>
    </Card>
}

export default injectIntl(JoinedTripBlock)