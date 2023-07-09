import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Container from '@mui/material/Container';
import { Tab } from '@mui/material';
import imgUrl from './img/LOGO(resize).svg'


function TopAppBar() {
    const [value,setValue] = React.useState();

  return (
    <AppBar position='fixed'>
      <Container >
        <Toolbar disableGutters>
        <Box sx={{ height: 64 }}>
          <img src={imgUrl}  alt={"InnoCoGo"}/>
        </Box>

          <Tabs textColor='inherit' value={value} onChange={() => setValue(value)} indicatorColor='primary'>
            <Tab label="HOME"/>
            <Tab label="MY TRIPS"/>
            <Tab label="SETTINGS"/>
          </Tabs>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default TopAppBar;