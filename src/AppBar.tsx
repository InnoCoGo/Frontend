import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Container from '@mui/material/Container';
import {Tab} from '@mui/material';
import imgUrl from './img/LOGO(resize).svg'
import imgUrlWhite from './img/LOGO(resize)_white.svg'
import {FlagLocaleSelector} from "./App.tsx";
import {getDefaultDarkMode} from "./TelegramUtils.ts";
import {injectIntl, IntlShape} from "react-intl";


function TopAppBar(props: {
    intl: IntlShape,
    locale: "en" | "ru",
    setLocale: (newValue: "en" | "ru") => void,
    applyHome: () => void,
    applyMyTrip: () => void,
}) {

    const prefersDarkMode = getDefaultDarkMode();
    const [value, setValue] = React.useState(0);

    return (
        <AppBar position='fixed'>
            <Container>
                <Toolbar disableGutters>
                    <Box sx={{height: 64}}>
                        <img src={prefersDarkMode ? imgUrlWhite : imgUrl} alt={"InnoCoGo"}/>
                    </Box>

                    <Tabs textColor='inherit' value={value} onChange={() => setValue(value)} indicatorColor='primary'>
                        <Tab label={props.intl.formatMessage({id: "home_tab"})} onClick={()=>{setValue(0); props.applyHome();}}/>
                        <Tab label={props.intl.formatMessage({id: "my_trips_tab"})} onClick={()=>{setValue(1); props.applyMyTrip();}}/>
                    </Tabs>
                    <Box sx={{flexGrow: 1}}/>
                    <FlagLocaleSelector locale={props.locale} setLocale={props.setLocale}/>
                </Toolbar>
            </Container>
        </AppBar>
    );
    // TODO: fix fixed placement https://mui.com/material-ui/react-app-bar/#fixed-placement (move this appbar to top)
}

export default injectIntl(TopAppBar);