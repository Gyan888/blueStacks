import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { IconButton, ListItem, ListItemText, Avatar, Grid } from '@material-ui/core';
import DateRangeTwoToneIcon from '@material-ui/icons/DateRangeTwoTone';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import InsertDriveFileRoundedIcon from '@material-ui/icons/InsertDriveFileRounded';
import {get} from 'lodash';
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";



const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableHeader:{
    backgroundColor: '#d3d3d36b'
  },
  price:{
    color: '#c9d069',
    paddingRight: '3px',
    marginLeft: '4px'
  },
  iconButton:{
    fontSize: 'inherit',
  },
  dateItem:{
    textAlign: 'center',
    position: 'relative'
  },
  avatar:{
    position: 'relative',
    left: '72px',
  },
  calender:{
    color:'lightblue'
  },
  reports:{
    color: 'red'
  },
  file:{
    color: '#95e895'
  }
});

let Pricing = (props) =>{
  const classes = useStyles();
  return (<span>
    <IconButton  aria-label="add an alarm" classes={{
      root: classes.iconButton
    }}>
      <MonetizationOnIcon className={classes.price}/>
      View Pricing
    </IconButton>
  </span>)

}

let DateItem = props =>{
  const classes = useStyles();

  return (<span>
    <ListItem classes={{
      root: classes.dateItem
    }}>
      <ListItemText primary={get(props, 'date')} secondary={get(props, 'days_left')} />
    </ListItem>
  </span>)

}

let Campaign = props =>{
    const classes = useStyles();
    return (
      <ListItem classes={{
        root: classes.dateItem
      }}>
          <Avatar variant="square" alt='Game logo' src={props.image_url} />
        <ListItemText primary={props.campaign} secondary={props.region} />
      </ListItem>
    )
};

let Actions = props =>{
    const classes = useStyles();

    let [actionButtons, setActionButtons] = useState({
      'schedullar': false,
      'csv': false,
      'report': false
    });

    return (<span>
      <Grid container direction='column'>
        <Grid item container>
        <Grid item sm={2} xs={0}>
        </Grid>
        <Grid item sm={3} xs={4}>
        <IconButton  aria-label="get csv" classes={{root: classes.iconButton}}>
          <InsertDriveFileRoundedIcon className={classes.file}/> CSV
        </IconButton>
        </Grid>

        <Grid item sm={3} xs={4}>
        <IconButton  aria-label="get report" classes={{root: classes.iconButton}}>
          <TrendingUpIcon className={classes.reports}/> Report
        </IconButton>
        </Grid>

        <Grid item sm={4} xs={4}>
        <IconButton  aria-label="reschedule" classes={{root: classes.iconButton}} onClick={()=>{setActionButtons({
          ...actionButtons, 'schedullar': !actionButtons.schedullar
        })}}>

          <DateRangeTwoToneIcon className={classes.calender}/> Schedule Again
          <MuiPickersUtilsProvider utils={MomentUtils}>

              <DatePicker variant="inline" open={actionButtons.schedullar}
              TextFieldComponent={() => null}/>
          </MuiPickersUtilsProvider>
        </IconButton>
        </Grid>

        </Grid>
      </Grid>
    </span>);
};

const rows = [
  {
    "campaign": "PubG",
    "region": "US",
    "date": 'Oct 2019, 28',
    'days_left': '23 days ago',
    "price": 200,
    "csv": "Some CSV link for Whatsapp",
    "report": "Some report link for Whatsapp",
    "image_url":"static/games/Bitmap.png"

  },
  {
    "campaign": "PubG",
    "region": "US",
    "date": 'Oct 2019, 28',
    'days_left': '23 days ago',
    "price": 200,
    "csv": "Some CSV link for Whatsapp",
    "report": "Some report link for Whatsapp",
    "image_url":"static/games/Bitmap.png"

  },{
    "campaign": "PubG",
    "region": "US",
    "date": 'Oct 2019, 28',
    'days_left': '23 days ago',
    "price": 200,
    "csv": "Some CSV link for Whatsapp",
    "report": "Some report link for Whatsapp",
    "image_url":"static/games/Bitmap.png"

  },{
    "campaign": "PubG",
    "region": "US",
    "date": 'Oct 2019, 28',
    'days_left': '23 days ago',
    "price": 200,
    "csv": "Some CSV link for Whatsapp",
    "report": "Some report link for Whatsapp",
    "image_url":"static/games/Bitmap.png"

  },{
    "campaign": "PubG",
    "region": "US",
    "date": 'Oct 2019, 28',
    'days_left': '23 days ago',
    "price": 200,
    "csv": "Some CSV link for Whatsapp",
    "report": "Some report link for Whatsapp",
    "image_url":"static/games/Bitmap.png"

  },{
    "campaign": "PubG",
    "region": "US",
    "date": 'Oct 2019, 28',
    'days_left': '23 days ago',
    "price": 200,
    "csv": "Some CSV link for Whatsapp",
    "report": "Some report link for Whatsapp",
    "image_url":"static/games/Bitmap.png"

  },
];

let  ActionTable = () =>{
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className={classes.tableHeader}>
          <TableRow>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Campaign</TableCell>
            <TableCell align="center">View</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell  align="left">
                <DateItem {...row}/>
              </TableCell>

              <TableCell  align="center">
                <Campaign {...row}/>
              </TableCell>

              <TableCell  align="center" >
                <Pricing/>
              </TableCell>

              <TableCell  align="center">
                <Actions {...row}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ActionTable