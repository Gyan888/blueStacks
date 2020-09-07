import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Toolbar, Grid, ListItem, ListItemText } from '@material-ui/core';
import ActionTable from './ActionTable';
import {set} from 'lodash'
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
  const [value, setValue] = React.useState("current_event");

  const [events, setEvents] = useState({
      'current_event': '',
      'past_event': '',
      'future_event': '',
  });

  let rows = [{"timeStamp": 1598768803, "image_url": "static/games/com2os.png", "campaign": "Commando 1947", "price": 205, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp"}, {"timeStamp": 1598941603, "image_url": "static/games/ShadowFight.png", "campaign": "shadow fight", "price": 478, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp"}, {"timeStamp": 1600151203, "image_url": "static/games/Mansteel.png", "campaign": "Man of steel", "price": 114, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp"}, {"timeStamp": 1599978403, "image_url": "static/games/Sudoku.png", "campaign": "sudo ku", "price": 363, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp"}, {"timeStamp": 1599028003, "image_url": "static/games/Mansteel.png", "campaign": "Man of steel", "price": 198, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp"}, {"timeStamp": 1599719203, "image_url": "static/games/GhostProtocol.png", "campaign": "Ghost protocol", "price": 352, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp"}, {"timeStamp": 1599632803, "image_url": "static/games/UglyDragon.png", "campaign": "Ugly Dragon123", "price": 232, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp"}, {"timeStamp": 1598768803, "image_url": "static/games/com2os.png", "campaign": "Commando 1947", "price": 32, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp"}, {"timeStamp": 1600064803, "image_url": "static/games/PubG.png", "campaign": "Pug G", "price": 321, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp"}, {"timeStamp": 1598941603, "image_url": "static/games/Sudoku.png", "campaign": "sudo ku", "price": 77, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp"}, {"timeStamp": 1599978403, "image_url": "static/games/com2os.png", "campaign": "Commando 1947", "price": 14, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp"}, {"timeStamp": 1599200803, "image_url": "static/games/GhostProtocol.png", "campaign": "Ghost protocol", "price": 290, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp"}, {"timeStamp": 1599719203, "image_url": "static/games/Sudoku.png", "campaign": "sudo ku", "price": 223, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp"}, {"timeStamp": 1599805603, "image_url": "static/games/PubG.png", "campaign": "Pug G", "price": 544, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp"}, {"timeStamp": 1599719203, "image_url": "static/games/Sudoku.png", "campaign": "sudo ku", "price": 747, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp"}, {"timeStamp": 1598682403, "image_url": "static/games/ShadowFight.png", "campaign": "shadow fight", "price": 622, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp"}, {"timeStamp": 1599546403, "image_url": "static/games/com2os.png", "campaign": "Commando 1947", "price": 23, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp"}, {"timeStamp": 1599373603, "image_url": "static/games/UglyDragon.png", "campaign": "Ugly Dragon123", "price": 412, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp"}, {"timeStamp": 1600151203, "image_url": "static/games/UglyDragon.png", "campaign": "Ugly Dragon123", "price": 278, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp"}, {"timeStamp": 1599892003, "image_url": "static/games/Sudoku.png", "campaign": "sudo ku", "price": 89, "csv": "Some CSV link for Whatsapp", "report": "Some report link for Whatsapp"}];

  let loadData = ()=>{
    let future_event = [];
    let past_event = [];
    let current_event = [];
    rows.forEach( row =>{
        let converted = moment(row.timeStamp).format('MMM YYYY, DD')
        set(row, 'date', converted);
        let days = moment.duration(moment().diff(moment.unix(row.timeStamp))).asDays()
        if (days < 0){
          set(row, 'days_left', days);
          future_event.push(row)
        }
        else if (days>0){
          days = Math.round(Math.abs(days))
          set(row, 'days_left', days);
          past_event.push(row);
        }
        else{
          current_event.push(row);
        }
    });
    setEvents({
      current_event: current_event,
      past_event: past_event,
      future_event: future_event
    })
  };

  useEffect(() => {
    loadData(rows);
  }, []);

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
                        <Tab className={value === "current_event" ? classes.activeStyle: classes.defaultStyle} value={"current_event"} label="Upcoming Campaigns" />
                        <Tab className={value === "past_event" ? classes.activeStyle: classes.defaultStyle} value={"past_event"} label="Live Campaigns" />
                        <Tab className={value === "future_event" ? classes.activeStyle: classes.defaultStyle} value={"future_event"} label="Past Campaigns" />
                    </Tabs>
                </AppBar>
                {
                  ["current_event", "past_event", "future_event"].map(e =>
                    (
                    <TabPanel value={value} index={e}>
                      <ActionTable  key={e} event={e} data={events[e]} style={{
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
