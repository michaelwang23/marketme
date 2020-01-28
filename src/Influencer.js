import React, { Component } from 'react';
import fire from './fire';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import logo from './Cadence.png'
import Container from '@material-ui/core/Container';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from "@material-ui/core/styles";
import Popup from "reactjs-popup";
import './App.css';
import styles2 from './popup.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram } from "@fortawesome/free-brands-svg-icons"
import Checkout from './Checkout'
const styles = (theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '100%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  });
  var card1 = {
    name: "Carolyn",
    followers: 2000,
    image: './carolyn.PNG'
}
var card2 = {
    name: "Michael",
    followers: 1000,
    image: './michael.JPG'
}
var card3 = {
    name: "James",
    followers: 3000,
    image: './james.jpg'
}



const cards = [card1, card2, card3];
var style = {
    color: 'black',
    fontSize: 20
  };
// var style2 = {
//     maxWidth: '100%'
// }

const Card2 = ({ title, explanation }) => (
    <div className="card" style = {style}>
      <div className="content">
        Target market: {explanation}
      </div>
    </div>
  );
class Business extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = {
        listOfBusinesses : [],
        title: [],
        open: false,
        story: [],
        date: [],
        post: '',
        selection: null,
        card: []

        }
    }
    logout = () => {
        fire.auth().signOut();
    }


    findList = () => {
        const rootRef = fire.database().ref();
        const post = rootRef.child('influencers').orderByKey();
        post.once('value', snap => {
            snap.forEach(child => {
                // console.log(child.val())
                var obj = {
                    biography: child.val().biography,
                    explanation: child.val().explanation,
                    followers: child.val().followers,
                    instagram: child.val().instagram,
                    name: child.val().name,
                    profile_pic: child.val().profile_pic
                }
                this.setState({
                    card: this.state.card.concat(obj)
                });

        });
        })
    }


    componentDidMount = () => {
        console.log("mount")
        // this.checkType()
       this.findList()
    }

    showInstagram = (handle) => {
        window.open('//www.instagram.com/' + handle);
        console.log("Hello")
    }

    openPayment = () => {
        // window.open('//www.instagram.com/' + 'carochenz');
        this.setState({
            open: true
        })
    }
   handleClose = () => {
       this.setState({
           open: false
       })
   }

    

    render() {
        const { classes } = this.props;
        return (
          
            <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
        <div style = {{flex: 1}}>
          <Typography variant="h6" color="inherit" noWrap>
            Publicize Me
          </Typography>
        </div>
          <Button variant="contained" color="primary" onClick = {this.logout}>
            Log Out
            </Button>
        </Toolbar>
      </AppBar>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Typography gutterBottom variant="h5" component="h2">
                      find influencers to promote your brand
                    </Typography>
          <Grid container spacing={4}>
            {this.state.card.map(card => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image = {card.profile_pic}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.instagram}
                    </Typography>
                    <Typography gutterBottom variant="subtitle1" component="h2">
                      {card.biography}
                    </Typography>
                    <Typography>
                    Followers: {card.followers}
                    </Typography>
                  </CardContent>
                  <CardActions>
                  <Popup
      trigger={
      <div>
      <Button className="button"> 
      Learn More
      </Button>
      </div>
      }
      position="bottom center"
      on="hover"
    >
      <Card2 title= {card.business} explanation = {card.explanation} />
    </Popup>
    <Button onClick={() => this.showInstagram(card.instagram)}>
    {/* <Link target="_blank" to={"//www.mylink.com"} > */}
    <FontAwesomeIcon icon={faInstagram} size = '2x' />
    {/* </Link> */}
    </Button>
    <Button onClick = {() => this.openPayment()}>
    <Fab color="primary" aria-label="add">
            <AddIcon />
        </Fab>
        </Button>
      {this.state.open === true ? 
      <Dialog open = {true} onClose={this.handleClose} aria-labelledby="form-dialog-title">
      <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
          <Checkout name = {card.instagram} />
        {/* <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent> */}
        
      </Dialog>
      : 
      <div>
          
      </div>
    }
   

                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          The New Way to Market
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Low  yet High Engagement
        </Typography>
      </footer>
      {/* End footer */}
    </React.Fragment>
           
        );
    }
}
            
export default withStyles(styles, { withTheme: true })(Business);
            



// seeMore = (selection) => {
//     var that = this;
    
//     fire.database().ref('businesses').once('value').then(function(snapshot){
//         const exists = (snapshot.val() !== null);
//         if (exists) {
//             var data = snapshot.val()
//             for (var business in data){
//                 that.seeMore2(business, selection)
//             }
//         }
//     })
// }

// seeMore2 = (business, selection) => {
//     var that = this
//     fire.database().ref('businesses').child(business).once('value').then(function(snapshot){
//         const exists = (snapshot.val() !== null);
//         if (exists) {
//             var data = snapshot.val()
//             if (data.business === selection){
//                 that.setState({
//                     selection: data.businessRep
//                 })
//             }
//         }
//     })
// }