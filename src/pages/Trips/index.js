import React, { useState, useEffect } from 'react'
import {
  Tabs,
  Tab,
  Paper,
  Box,
  Typography,
  SvgIcon,
  CircularProgress,
  useTheme,
  Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom'
import RoomIcon from '@material-ui/icons/Room';
import useStyles from './styles'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import colors from '../../utils/colors'
import listTrips from './trips'
import history from '../../services/history';

const TabPanel = props => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

const TripBox = ({ destiny, date, distance, time, points, classes }) => {
  const theme = useTheme()
  return (
    <Box p={2} mb={2} elevation="0" component={Paper} display="flex" alignItems="center">
      <Box mr={1}><SvgIcon color="primary" component={RoomIcon} /></Box>
      <Box overflow="hidden">
        <Typography className={classes.destiny} component="p">{destiny}</Typography>
        <Typography component="div" className={classes.infosTrip}>
          {time} - {date} - {distance}km
        </Typography>
        <Box component={Typography} color={theme.palette.success.main}> <b>{points}Pts</b></Box>
      </Box>
      <Box ml={1}><SvgIcon fontSize="16px" component={ArrowForwardIosIcon} /></Box>
    </Box>
  )
}

const Trips = () => {
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(true);

  const classes = useStyles()

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 600)
  }, [])

  const handleNext = () => {
    history.push('/trip');
  };

  return (
    <div>
      <Box p={4} mb={2} bgcolor={colors.white} component="header"position="relative">
        <Box position="absolute" component={Link} to="/" left={32} top={32}><SvgIcon component={ArrowBackIosIcon} /></Box>
        <Typography align="center">Viagens</Typography>
      </Box>
      {
        loading ? (
          <Box display="flex" mt="-60px" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              className={classes.tabs}
              aria-label="full width tabs example"
            >
              <Tab label="Viagens agendadas" />
              <Tab label="Viagens Finalizadas" />
            </Tabs>

            <TabPanel value={value} index={0}>
              {
                listTrips.map((trip, index) => <TripBox classes={classes} key={index} {...trip} />)
              }
            </TabPanel>
            <TabPanel value={value} index={1}>
              {
                listTrips.map((trip, index) => <TripBox classes={classes} key={index} {...trip} />)
              }
            </TabPanel>
          </>
        )
      }

      <Box className={classes.fixed} position="fixed" bottom="30px" left="0" width="100%" maxWidth="375px" display="flex" justifyContent="center">
        <Button onClick={handleNext} className={classes.button} variant="contained" color="primary">Criar agendamento de viagem</Button>
      </Box>
    </div>
  )
}

export default Trips
