import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Toolbar, Grid, ListItem, ListItemText } from '@material-ui/core';
import ActionTable from './ActionTable';
import {set, remove} from 'lodash'
import moment from 'moment-timezone';

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: 'black',
    minHeight: 20,
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    textAlign: "left",
  },
  tabStyle: {
    backgroundColor: 'white',
  },
  title: {
    flexGrow: 1,
    position: "absolute",
    left: '146px'
  },
  activeStyle:{
    textTransform: 'initial',
    color: '#7aa543'
  },
  defaultStyle:{
    textTransform: 'initial',
    color: '#606869',
  },
  secondary:{
    color: '#32b132',
    lineHeight: '0.43'
  }
}));



function TabPanel(props) {
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
        <Box p={0} style={{paddingTop: '30px'}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

let Panel = () => {
  const classes = useStyles();
  let [value, setValue] = React.useState("future_event");

  let [events, setEvents] = useState({
      'current_event': '',
      'past_event': '',
      'future_event': '',
  });

  let fetchedData = [{"timeStamp": 1599926388, "image_url": "static/games/com2os.png", "campaign": "Commando 1947", "price": 473, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp", "id": 0, "origin": "US"}, {"timeStamp": 1599235188, "image_url": "static/games/PubG.png", "campaign": "Pug G", "price": 727, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp", "id": 1, "origin": "UK"}, {"timeStamp": 1599667188, "image_url": "static/games/Mansteel.png", "campaign": "Man of steel", "price": 797, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp", "id": 2, "origin": "Ind"}, {"timeStamp": 1599580788, "image_url": "static/games/PubG.png", "campaign": "Pug G", "price": 344, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp", "id": 3, "origin": "UK"}, {"timeStamp": 1599407988, "image_url": "static/games/ShadowFight.png", "campaign": "shadow fight", "price": 230, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp", "id": 4, "origin": "Jap"}, {"timeStamp": 1599839988, "image_url": "static/games/PubG.png", "campaign": "Pug G", "price": 39, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp", "id": 5, "origin": "UK"}, {"timeStamp": 1599926388, "image_url": "static/games/UglyDragon.png", "campaign": "Ugly Dragon123", "price": 117, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp", "id": 6, "origin": "Jap"}, {"timeStamp": 1599667188, "image_url": "static/games/PubG.png", "campaign": "Pug G", "price": 212, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp", "id": 7, "origin": "UK"}, {"timeStamp": 1599753588, "image_url": "static/games/com2os.png", "campaign": "Commando 1947", "price": 726, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp", "id": 8, "origin": "US"}, {"timeStamp": 1599407988, "image_url": "static/games/com2os.png", "campaign": "Commando 1947", "price": 676, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp", "id": 9, "origin": "US"}, {"timeStamp": 1599494388, "image_url": "static/games/Sudoku.png", "campaign": "sudo ku", "price": 620, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp", "id": 10, "origin": "Kor"}, {"timeStamp": 1599580788, "image_url": "static/games/Mansteel.png", "campaign": "Man of steel", "price": 268, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp", "id": 11, "origin": "Ind"}, {"timeStamp": 1599407988, "image_url": "static/games/UglyDragon.png", "campaign": "Ugly Dragon123", "price": 220, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp", "id": 12, "origin": "Jap"}, {"timeStamp": 1599839988, "image_url": "static/games/PubG.png", "campaign": "Pug G", "price": 111, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp", "id": 13, "origin": "UK"}, {"timeStamp": 1599580788, "image_url": "static/games/GhostProtocol.png", "campaign": "Ghost protocol", "price": 678, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp", "id": 14, "origin": "Rus"}, {"timeStamp": 1599839988, "image_url": "static/games/Mansteel.png", "campaign": "Man of steel", "price": 633, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp", "id": 15, "origin": "Ind"}, {"timeStamp": 1599926388, "image_url": "static/games/com2os.png", "campaign": "Commando 1947", "price": 518, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp", "id": 16, "origin": "US"}, {"timeStamp": 1599753588, "image_url": "static/games/Mansteel.png", "campaign": "Man of steel", "price": 232, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp", "id": 17, "origin": "Ind"}, {"timeStamp": 1599667188, "image_url": "static/games/Sudoku.png", "campaign": "sudo ku", "price": 119, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp", "id": 18, "origin": "Kor"}, {"timeStamp": 1599235188, "image_url": "static/games/Mansteel.png", "campaign": "Man of steel", "price": 518, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp", "id": 19, "origin": "Ind"}, {"timeStamp": 1599407988, "image_url": "static/games/com2os.png", "campaign": "Commando 1947", "price": 393, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp", "id": 20, "origin": "US"}, {"timeStamp": 1599926388, "image_url": "static/games/UglyDragon.png", "campaign": "Ugly Dragon123", "price": 459, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp", "id": 21, "origin": "Jap"}, {"timeStamp": 1599235188, "image_url": "static/games/com2os.png", "campaign": "Commando 1947", "price": 371, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp", "id": 22, "origin": "US"}, {"timeStamp": 1599926388, "image_url": "static/games/PubG.png", "campaign": "Pug G", "price": 643, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp", "id": 23, "origin": "UK"}, {"timeStamp": 1599494388, "image_url": "static/games/ShadowFight.png", "campaign": "shadow fight", "price": 722, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp", "id": 24, "origin": "Jap"}, {"timeStamp": 1599839988, "image_url": "static/games/Sudoku.png", "campaign": "sudo ku", "price": 235, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp", "id": 25, "origin": "Kor"}, {"timeStamp": 1599839988, "image_url": "static/games/PubG.png", "campaign": "Pug G", "price": 160, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp", "id": 26, "origin": "UK"}, {"timeStamp": 1599667188, "image_url": "static/games/GhostProtocol.png", "campaign": "Ghost protocol", "price": 135, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp", "id": 27, "origin": "Rus"}, {"timeStamp": 1599753588, "image_url": "static/games/ShadowFight.png", "campaign": "shadow fight", "price": 205, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp", "id": 28, "origin": "Jap"}, {"timeStamp": 1599839988, "image_url": "static/games/GhostProtocol.png", "campaign": "Ghost protocol", "price": 476, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp", "id": 29, "origin": "Rus"}];

  let [rows, setRows] = useState(fetchedData);

  let reschedule = (data, changed_date) =>{
    let dt = rows.slice()
    let temp = remove(dt, {id: data.id})
    temp = temp[0];
    temp.timeStamp = changed_date;
    dt.push(temp)
    setRows(dt);
  };

  let loadData = rows =>{
    let future_event = [];
    let past_event = [];
    let current_event = [];
    rows.forEach( row =>{
        let converted = moment.unix(row.timeStamp).tz('Asia/Kathmandu').format('MMM YYYY, DD')
        set(row, 'date', converted);
        let today = moment().tz('Asia/Kathmandu')
        let unixToConverted = moment.unix(row.timeStamp).tz('Asia/Kathmandu')
        let days = Math.abs(Math.ceil(moment.duration(today.diff(unixToConverted)).asDays()))
        if (unixToConverted.isSame(today, 'day')){
          set(row, 'days_left', null);
          current_event.push(row);
        }
        else if (unixToConverted.isBefore(today, 'day')){
          set(row, 'days_left', `${days} days ago`);
          past_event.push(row);
        }
        else if (unixToConverted.isAfter(today, 'day')){
          set(row, 'days_left', `${days} days left`);
          future_event.push(row)
        }
    });
    setEvents({
      current_event: current_event,
      past_event: past_event,
      future_event: future_event
    })
  };

  useEffect(() => {
    if (rows)
      loadData(rows);
  }, [rows]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
    <Grid container direction='column'>
        <AppBar position="static" className={classes.header}>
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                <ListItem>
                  <ListItemText primary="BlueStacks" secondary="Play Bigger" classes={{
                    secondary: classes.secondary
                  }}/>
                </ListItem>
                </Typography>
            </Toolbar>
        </AppBar>
        <Grid item container>
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={10}>
                <h1 style={{color: '#1f2327'}}>Manage Campaigns</h1>
                <AppBar position="static">
                    <Tabs
                      value={value} onChange={handleChange}
                      aria-label="Blue stack"
                      className={classes.tabStyle}
                      variant='scrollable'
                      TabIndicatorProps={{style: {background: 'green', minHeight: 4}}}
                    >
                        <Tab className={value === "future_event" ? classes.activeStyle: classes.defaultStyle} value={"future_event"} label="Upcoming Campaigns" />
                        <Tab className={value === "current_event" ? classes.activeStyle: classes.defaultStyle} value={"current_event"} label="Live Campaigns" />
                        <Tab className={value === "past_event" ? classes.activeStyle: classes.defaultStyle} value={"past_event"} label="Past Campaigns" />
                    </Tabs>
                </AppBar>
                {
                  ["current_event", "past_event", "future_event"].map(e =>
                    (
                    <TabPanel value={value} index={e}>
                      <ActionTable  key={e} event={e} data={events[e]} reschedule={reschedule} style={{
                        'width': '100%'
                      }}/>
                    </TabPanel>
                    )
                  )
                }
            </Grid>
            <Grid item xs={1}>
            </Grid>
        </Grid>
    </Grid>
    </div>
  );
}

export default Panel;
