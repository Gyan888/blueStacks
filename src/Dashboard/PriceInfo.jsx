import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import { DialogContent, Grid } from '@material-ui/core';


const useStyles = makeStyles({
  root: {
    maxWidth: 500,
  },
  button: {
    position: 'relative' ,
    left: '132px',
    border: "2px solid black"
  },
  media: {
    maxWidth: '85%',
    marginLeft: '15%',
    paddingTop: "10px"
  },
  cell:{
    borderBottom: '0px'
  },
  gameInfo:{
    position: "absolute",
    left: '17px',
    bottom: '31px',
    fontSize: 'x-large'
  },
  origin:{
    position: "absolute",
    left: '17px',
    bottom: '13px',
    fontSize: 'medium',
    color: 'grey'
  }
});
function createData(time, price) {
  return { time, price};
}

const rows = price => [
  createData('1 Week - 1 Month', price),
  createData('6 Month', 5*price-100),
  createData('1 Year', 10*price-200),
];


let PriceInfo = props =>{
  const classes = useStyles();

  return (
    <Dialog onClose={props.handleClose} aria-labelledby="simple-dialog-title" open={props.open}>
      <DialogContent style={{padding: "0px", width: '385px'}}>
        <Card className={classes.root}>
            <Grid container>
              <Grid item xs={6}>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              image={props.data.image_url}
              title="Contemplative Reptile"
              className={classes.media}
            />
            </Grid>
            <Grid item xs={6} style={{position: 'relative'}}>
                <span className={classes.gameInfo}>{props.data.campaign}</span>
              <br/>
                <span className={classes.origin}>{props.data.origin}</span>
            </Grid>
            </Grid>
            <CardContent>
              <Typography gutterBottom variant="h4" component="h2" style={{position: 'relative', left: '13px'}}>
                <span style={{fontWeight: "bold", fontStyle: 'initial', color: '#808080f2'}}> Pricing </span>
              </Typography>

          <Table className={classes.table} aria-label="simple table">
            <TableBody>
              {rows(props.data.price).map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" classes={{root: classes.cell}}>
                    {row.time}
                  </TableCell>
                  <TableCell align="right" classes={{root: classes.cell}}>
                    <span style={{fontStyle: 'oblique', fontWeight: 'bold'}}>$ {row.price}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

            </CardContent>
          <CardActions >
            <Button variant="outlined" className={classes.button} size="large" onClick={props.handleClose}>
              CLOSE
            </Button>
          </CardActions>
        </Card>
    </DialogContent>
    </Dialog>
  );
}

export default PriceInfo;