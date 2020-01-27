import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { withStyles } from "@material-ui/core/styles";
import Signin from './Signin'
import Signup from './Signup'
import Signup2 from './Signup2'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        publicizeMe
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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

class Album extends Component {
    constructor() {
        super();
        this.state = ({
            signin: false,
            signup: false,
            signup2: false
        });
      }
      gotoSignIn = () => {
          this.setState({
              signin: true
          })
      }
      gotoSignUp = () => {
        this.setState({
            signup: true,
        })
    }
    gotoSignUp2 = () => {
        this.setState({
            signup2: true,
            signup: false,
            signin: false
        })
    }

    render() {
    const { classes } = this.props;
        console.log(this.state.signup2)
        console.log(this.state.signup)
        console.log(this.state.signin)

        return (
            <div>
            {this.state.signup2 === false ? 
            <div>
            {this.state.signup === false ?
            <div>
            {this.state.signin === false ? 
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Publicize Me
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Publicize Me
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Pay people to post or share about your brand.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary" onClick={() => this.gotoSignUp()}>
                    Find influencers
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary" onClick={() => this.gotoSignUp2()}>
                    Become an influencer
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="secondary" onClick={() => this.gotoSignIn()}>
                    Sign In
                  </Button>
                </Grid>
              </Grid>
            </div>
            <div>
                
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Typography gutterBottom variant="h5" component="h2">
                      Sample Profiles
                    </Typography>
          <Grid container spacing={4}>
            {cards.map(card => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image = {require(`${card.image}`)}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.name}
                    </Typography>
                    <Typography>
                    Followers: {card.followers}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Edit
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
          Low Pricing High Engagement
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
    : 
    <div>
        <Signin />
    </div>
    }
    </div>
    : 
    <div>
        <Signup />
    </div>
    }
    </div>
    : 
    //signup 2 is true
    //signup everything is false
    <div>
        <Signup2 />
    </div>
    }
    </div>

        )
            };

}
export default withStyles(styles, { withTheme: true })(Album);
