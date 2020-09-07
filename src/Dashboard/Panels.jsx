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

  let rows = [{"campaign": "sudo ku", "timeStamp": 1599468176, "price": 749, "image_url": "static/games/Sudoku.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp"}, {"campaign": "Commando 1947", "timeStamp": 1599813776, "price": 34, "image_url": "static/games/com2os.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp"}, {"campaign": "Man of steel", "timeStamp": 1599640976, "price": 632, "image_url": "static/games/Mansteel.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp"}, {"campaign": "shadow fight", "timeStamp": 1599813776, "price": 691, "image_url": "static/games/ShadowFight.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp"}, {"campaign": "shadow fight", "timeStamp": 1599381776, "price": 195, "image_url": "static/games/ShadowFight.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp"}, {"campaign": "shadow fight", "timeStamp": 1599381776, "price": 52, "image_url": "static/games/ShadowFight.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp"}, {"campaign": "sudo ku", "timeStamp": 1599381776, "price": 622, "image_url": "static/games/Sudoku.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp"}, {"campaign": "Ugly Dragon123", "timeStamp": 1599468176, "price": 11, "image_url": "static/games/UglyDragon.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp"}, {"campaign": "sudo ku", "timeStamp": 1599468176, "price": 86, "image_url": "static/games/Sudoku.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp"}, {"campaign": "sudo ku", "timeStamp": 1599468176, "price": 655, "image_url": "static/games/Sudoku.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp"}, {"campaign": "Commando 1947", "timeStamp": 1599468176, "price": 689, "image_url": "static/games/com2os.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp"}, {"campaign": "shadow fight", "timeStamp": 1599122576, "price": 116, "image_url": "static/games/ShadowFight.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp"}, {"campaign": "Man of steel", "timeStamp": 1599468176, "price": 195, "image_url": "static/games/Mansteel.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp"}, {"campaign": "shadow fight", "timeStamp": 1599640976, "price": 447, "image_url": "static/games/ShadowFight.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp"}, {"campaign": "Ugly Dragon123", "timeStamp": 1599381776, "price": 507, "image_url": "static/games/UglyDragon.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp"}, {"campaign": "Commando 1947", "timeStamp": 1599295376, "price": 203, "image_url": "static/games/com2os.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp"}, {"campaign": "Man of steel", "timeStamp": 1599468176, "price": 62, "image_url": "static/games/Mansteel.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp"}, {"campaign": "Ugly Dragon123", "timeStamp": 1599813776, "price": 466, "image_url": "static/games/UglyDragon.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp"}, {"campaign": "Ugly Dragon123", "timeStamp": 1599727376, "price": 674, "image_url": "static/games/UglyDragon.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp"}, {"campaign": "shadow fight", "timeStamp": 1599468176, "price": 78, "image_url": "static/games/ShadowFight.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp"}, {"campaign": "Commando 1947", "timeStamp": 1599381776, "price": 292, "image_url": "static/games/com2os.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp"}, {"campaign": "shadow fight", "timeStamp": 1599468176, "price": 349, "image_url": "static/games/ShadowFight.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp"}, {"campaign": "Ghost protocol", "timeStamp": 1599640976, "price": 585, "image_url": "static/games/GhostProtocol.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp"}, {"campaign": "Commando 1947", "timeStamp": 1599554576, "price": 782, "image_url": "static/games/com2os.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp"}, {"campaign": "shadow fight", "timeStamp": 1599468176, "price": 160, "image_url": "static/games/ShadowFight.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp"}, {"campaign": "Ugly Dragon123", "timeStamp": 1599554576, "price": 138, "image_url": "static/games/UglyDragon.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp"}, {"campaign": "Commando 1947", "timeStamp": 1599122576, "price": 222, "image_url": "static/games/com2os.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp"}, {"campaign": "Ghost protocol", "timeStamp": 1599813776, "price": 739, "image_url": "static/games/GhostProtocol.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp"}, {"campaign": "Commando 1947", "timeStamp": 1599208976, "price": 105, "image_url": "static/games/com2os.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp"}, {"campaign": "Ugly Dragon123", "timeStamp": 1599381776, "price": 190, "image_url": "static/games/UglyDragon.png", "report": "Some report link for Whatsapp", "csv": "Some CSV link for Whatsapp"}];

  let loadData = ()=>{
    let future_event = [];
    let past_event = [];
    let current_event = [];
    rows.forEach( row =>{
        let converted = moment.unix(row.timeStamp).format('MMM YYYY, DD')
        set(row, 'date', converted);
        let days = moment.duration(moment().diff(moment.unix(row.timeStamp))).asDays()
        if (Math.round(Math.abs(days)) === 0){
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
                        <Tab className={value === "future_event" ? classes.activeStyle: classes.defaultStyle} value={"future_event"} label="Upcoming Campaigns" />
                        <Tab className={value === "current_event" ? classes.activeStyle: classes.defaultStyle} value={"current_event"} label="Live Campaigns" />
                        <Tab className={value === "past_event" ? classes.activeStyle: classes.defaultStyle} value={"past_event"} label="Past Campaigns" />
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
