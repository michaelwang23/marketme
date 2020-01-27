import React, { Component } from 'react';
import fire from './fire';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
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
        {explanation}
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
        const post = rootRef.child('businesses').orderByKey();
        post.once('value', snap => {
            snap.forEach(child => {
                // console.log(child.val())
                var obj = {
                    business: child.val().business,
                    businessRep: child.val().businessRep,
                    image: './no_image.png',
                    explanation: child.val().explanation
                }
                this.setState({
                    card: this.state.card.concat(obj)
                });
                console.log(this.state.card)

        });
        })
    }


    componentDidMount = () => {
        console.log("mount")
        // this.checkType()
       this.findList()
    }


   

    

    render() {
        console.log(this.state.cards)
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
                      Profiles
                    </Typography>
          <Grid container spacing={4}>
            {this.state.card.map(card => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image = {require(`${card.image}`)}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.business}
                    </Typography>
                    <Typography>
                    Contact: {card.businessRep}
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

    <Button class="ui instagram button">
  <i class="instagram icon"></i>
  Instagram
</Button>
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