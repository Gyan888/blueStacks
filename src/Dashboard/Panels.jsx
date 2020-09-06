import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Toolbar, Grid, ListItem, ListItemText } from '@material-ui/core';
import ActionTable from './ActionTable';



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
  const [value, setValue] = React.useState(1);

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
                        <Tab className={value === 1 ? classes.activeStyle: classes.defaultStyle} value={1} label="Upcoming Campaigns" />
                        <Tab className={value === 2 ? classes.activeStyle: classes.defaultStyle} value={2} label="Live Campaigns" />
                        <Tab className={value === 3 ? classes.activeStyle: classes.defaultStyle} value={3} label="Past Campaigns" />
                    </Tabs>
                </AppBar>
                {
                  [1, 2, 3].map(e =>
                    (
                    <TabPanel value={value} index={e}>
                      <ActionTable {...e} style={{
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
