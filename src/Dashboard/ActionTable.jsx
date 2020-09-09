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
import {isEmpty} from 'lodash'
import moment from 'moment'
import PriceInfo from './PriceInfo';

const useStyles = makeStyles({
  hr1:{
    position: "absolute",
    width: '80%',
    marginLeft: '20%',
    left: '0px',
    bottom: '0',
    borderColor: 'white',
  },
  hr2:{
    position: "absolute",
    width: '100%',
    left: '0px',
    bottom: '0',
    borderColor: 'white'
  },
  hr3:{
    position: "absolute",
    width: '100%',
    left: '0px',
    bottom: '0',
    borderColor: 'white'
  },
  hr4:{
    position: "absolute",
    width: '90%',
    marginRight: '10%',
    left: '0px',
    bottom: '0',
    borderColor: 'white'
  },

  table: {
    minWidth: 650,
    position: 'relative',
    paddingBottom: '10px'
  },
  tableHeader:{
    backgroundColor: '#d3d3d36b',
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
  },
  cell:{
    borderBottom: '0px',
    position: 'relative'
  }

});

let Pricing = (props) =>{
  const classes = useStyles();
  const {data} = props;
  let [priceInfo, setPriceInfo] = useState(false);

  return (<span>
    <IconButton onClick={() => setPriceInfo(true)} aria-label="add an alarm" classes={{
      root: classes.iconButton
    }}>
      <MonetizationOnIcon className={classes.price}/>
      View Pricing
    </IconButton>
      <PriceInfo open={priceInfo} handleClose={()=>setPriceInfo(false)} data={data}/>
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
    return (
      <ListItem>
          <Avatar variant="square" alt='Game logo' src={props.image_url} />
        <ListItemText primary={props.campaign} secondary={props.region} style={{textAlign: "left", paddingLeft: "8px"}}/>
      </ListItem>
    )
};

let Actions = props =>{
    const classes = useStyles();

    let handleChange = date =>{
      const {data} = props;
      let changed_date = date.unix();
      props.reschedule(data, changed_date);
    };

    let toggle = key =>{
      setActionButtons({
        ...actionButtons, [key]: !actionButtons[key]
      })
    };

    let [actionButtons, setActionButtons] = useState({
      'schedullar': false,
      'csv': false,
      'report': false
    });

    return (<span>
      <Grid container direction='column'>
        <Grid item container spacing={1}>
          <Grid item sm={1} xs={0}>
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

          <Grid item sm={5} xs={4}>
          <IconButton  aria-label="reschedule" classes={{root: classes.iconButton}}
            onClick={()=>toggle("schedullar")}>
            <DateRangeTwoToneIcon className={classes.calender}/> Schedule Again
          </IconButton>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <DatePicker  open={actionButtons.schedullar}
                  value={moment.unix(props.data.timeStamp)}
                  TextFieldComponent={() => null}
                  onClose={()=>toggle("schedullar")}
                  onChange={handleChange}/>
            </MuiPickersUtilsProvider>
          </Grid>
        </Grid>
      </Grid>
    </span>);
};

let  ActionTable = props =>{
  const classes = useStyles();
  let {data} = props
  data =  isEmpty(data) ? [] : data ;
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className={classes.tableHeader}>
          <TableRow>
            <TableCell align="center" size="small">Date</TableCell>
            <TableCell align="center">Campaign</TableCell>
            <TableCell align="center" size="small">View</TableCell>
            <TableCell align="center" size="large">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {data.map((row) => (
            <TableRow key={row.name}>
              <TableCell  align="left" classes={{root: classes.cell}} size="small">
                <DateItem {...row}/>
                <hr className={classes.hr1}/>
              </TableCell>


              <TableCell  align="center" classes={{root: classes.cell}}>
                <Campaign {...row}/>
                <hr className={classes.hr2}/>
              </TableCell>


              <TableCell  align="center" classes={{root: classes.cell}} size="small">
                <Pricing data={row}/>
                <hr className={classes.hr3}/>
              </TableCell>

              <TableCell  align="center" size="large" classes={{root: classes.cell}}>
                <Actions data={row}  reschedule={props.reschedule}/>
                <hr className={classes.hr4}/>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ActionTable