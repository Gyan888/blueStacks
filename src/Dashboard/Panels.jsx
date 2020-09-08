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
import moment from 'moment';

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
  let [value, setValue] = React.useState("current_event");

  let [events, setEvents] = useState({
      'current_event': '',
      'past_event': '',
      'future_event': '',
  });

  let fetchedData = [{"campaign": "Pug G", "timeStamp": 1599654253, "price": 413, "image_url": "static/games/PubG.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp", "id": 0}, {"campaign": "Ghost protocol", "timeStamp": 1599567853, "price": 544, "image_url": "static/games/GhostProtocol.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp", "id": 1}, {"campaign": "Ugly Dragon123", "timeStamp": 1599395053, "price": 476, "image_url": "static/games/UglyDragon.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp", "id": 2}, {"campaign": "Pug G", "timeStamp": 1599481453, "price": 97, "image_url": "static/games/PubG.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp", "id": 3}, {"campaign": "Ghost protocol", "timeStamp": 1599740653, "price": 112, "image_url": "static/games/GhostProtocol.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp", "id": 4}, {"campaign": "Pug G", "timeStamp": 1599135853, "price": 431, "image_url": "static/games/PubG.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp", "id": 5}, {"campaign": "sudo ku", "timeStamp": 1599308653, "price": 676, "image_url": "static/games/Sudoku.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp", "id": 6}, {"campaign": "sudo ku", "timeStamp": 1599740653, "price": 111, "image_url": "static/games/Sudoku.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp", "id": 7}, {"campaign": "Ghost protocol", "timeStamp": 1599308653, "price": 224, "image_url": "static/games/GhostProtocol.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp", "id": 8}, {"campaign": "Pug G", "timeStamp": 1599567853, "price": 423, "image_url": "static/games/PubG.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp", "id": 9}, {"campaign": "Ugly Dragon123", "timeStamp": 1599827053, "price": 314, "image_url": "static/games/UglyDragon.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp", "id": 10}, {"campaign": "sudo ku", "timeStamp": 1599308653, "price": 483, "image_url": "static/games/Sudoku.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp", "id": 11}, {"campaign": "Ghost protocol", "timeStamp": 1599740653, "price": 220, "image_url": "static/games/GhostProtocol.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp", "id": 12}, {"campaign": "shadow fight", "timeStamp": 1599654253, "price": 581, "image_url": "static/games/ShadowFight.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp", "id": 13}, {"campaign": "Pug G", "timeStamp": 1599827053, "price": 629, "image_url": "static/games/PubG.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp", "id": 14}, {"campaign": "Pug G", "timeStamp": 1599395053, "price": 317, "image_url": "static/games/PubG.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp", "id": 15}, {"campaign": "sudo ku", "timeStamp": 1599567853, "price": 577, "image_url": "static/games/Sudoku.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp", "id": 16}, {"campaign": "Pug G", "timeStamp": 1599654253, "price": 216, "image_url": "static/games/PubG.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp", "id": 17}, {"campaign": "Pug G", "timeStamp": 1599135853, "price": 1, "image_url": "static/games/PubG.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp", "id": 18}, {"campaign": "shadow fight", "timeStamp": 1599135853, "price": 214, "image_url": "static/games/ShadowFight.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp", "id": 19}, {"campaign": "Man of steel", "timeStamp": 1599395053, "price": 390, "image_url": "static/games/Mansteel.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp", "id": 20}, {"campaign": "Pug G", "timeStamp": 1599135853, "price": 531, "image_url": "static/games/PubG.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp", "id": 21}, {"campaign": "shadow fight", "timeStamp": 1599135853, "price": 259, "image_url": "static/games/ShadowFight.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp", "id": 22}, {"campaign": "Man of steel", "timeStamp": 1599135853, "price": 43, "image_url": "static/games/Mansteel.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp", "id": 23}, {"campaign": "Man of steel", "timeStamp": 1599135853, "price": 638, "image_url": "static/games/Mansteel.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp", "id": 24}, {"campaign": "Commando 1947", "timeStamp": 1599135853, "price": 705, "image_url": "static/games/com2os.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp", "id": 25}, {"campaign": "shadow fight", "timeStamp": 1599308653, "price": 603, "image_url": "static/games/ShadowFight.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp", "id": 26}, {"campaign": "Commando 1947", "timeStamp": 1599827053, "price": 678, "image_url": "static/games/com2os.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp", "id": 27}, {"campaign": "Pug G", "timeStamp": 1599481453, "price": 363, "image_url": "static/games/PubG.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp", "id": 28}, {"campaign": "sudo ku", "timeStamp": 1599222253, "price": 314, "image_url": "static/games/Sudoku.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp", "id": 29}];

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
        let converted = moment.unix(row.timeStamp).format('MMM YYYY, DD')
        set(row, 'date', converted);
        let days = moment.duration(moment().diff(moment.unix(row.timeStamp))).asDays()
        if (Math.round(Math.abs(days)) === 0){
          set(row, 'days_left', null);
          current_event.push(row);
        }
        else if (days>0){
          days = Math.round(Math.abs(days))
          set(row, 'days_left', `${days} days ago`);
          past_event.push(row);
        }
        else if (days < 0){
          days = Math.round(Math.abs(days))
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
