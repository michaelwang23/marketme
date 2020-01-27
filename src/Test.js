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

import ReactDOM from 'react-dom';
import Toggle from 'react-bootstrap-toggle';


class SignInSide extends Component {
    constructor(props) {
        super(props);
        var card1 = {
          name: "Michael",
          followers: 1000,
        }
        var card2 = {
          name: "Carolyn",
          followers: 2000,
        }
        this.state = {
          email: '',
          password: '',
          signup: false,
          toggleActive: false,
          decided: false,
          cards: [card1, card2]
        };
      }
      handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      }

      onToggle = () => {
        this.setState({ toggleActive: !this.state.toggleActive });
      }

      login = (e) => {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
        }).catch((error) => {
            console.log(error);
          });
      }
      createUserObj = (uid, email) => {
        var uObj = {
            email: email,
            platforms: this.state.platforms
        };
        fire.database().ref('influencers').child(uid).set(uObj)
    }
    createBusinessObj = (uid, email) => {
        var uObj = {
            email: email,
            businesses: this.state.business
        };
        console.log(email)
        console.log(this.state.business)
        console.log(uid)
        fire.database().ref('businesses').child(uid).set(uObj)
    }
    signup = (e) => {
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((u)=>this.createUserObj(u.user.uid, u.user.email))
        .catch((error) => {
            console.log(error);
          })
      }
      signupBusiness = (e) => {
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((u)=>this.createBusinessObj(u.user.uid, u.user.email))
        .catch((error) => {
            console.log(error);
          })
      }
      gotoLogin = () => {
        this.setState({
            signup: true
        })
    }
    gotoSignup = () => {
      this.setState({
          signup: false
      })
  }

    render() {
        return (
        <div>
        {this.state.decided === true ? 
           
        <div>
            
            {this.state.signup === false ? 
            //signup == false
            <div>
            {this.state.influencer === true ? 
           
            // influencer == true
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                  Sign in as Influencer
                </Typography>
                <form className={classes.form} noValidate>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={this.state.email} 
                    onChange={this.handleChange}
                    autoFocus
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={this.state.password} 
                    onChange={this.handleChange}
                    autoComplete="current-password"
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={this.login}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Button onClick = {() => {
                          this.setState({
                              signup: true,
                              influencerSignUp:true,
                              decided: true,
                              influencer: false
                          })
                      }} >
                        {"Don't have an account? Sign Up"}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </div>
              
            </Container>
            : 
            //influencer == false
            <div>
                <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                  Sign in as a Business
                </Typography>
                <form className={classes.form} noValidate>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={this.state.email} 
                    onChange={this.handleChange}
                    autoFocus
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={this.state.password} 
                    onChange={this.handleChange}
                    autoComplete="current-password"
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={this.login}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Button onClick = {this.gotoLogin} >
                        {"Don't have an account? Sign Up"}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </div>
              
            </Container>
            </div>
            }

            </div>
            : 
            <div>
            {this.state.influencerSignUp === true ? 
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                Sign up as an Influencer
              </Typography>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      value={this.state.firstname} 
                      onChange={this.handleChange}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                      value={this.state.lastname} 
                    onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={this.state.email} 
                    onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={this.state.password} 
                        onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="platforms"
                      label="Platforms"
                      id="platforms"
                      value={this.state.platform} 
                        onChange={this.handleChange}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={this.signup}
                >
                  Sign Up
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Button onClick = {this.gotoSignup} variant="body2">
                      Already have an account? Sign in
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
          : 
          <div>
               <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Typography component="h1" variant="h5">
                Sign up as a Business
              </Typography>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      value={this.state.firstname} 
                      onChange={this.handleChange}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                      value={this.state.lastname} 
                    onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={this.state.email} 
                    onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={this.state.password} 
                        onChange={this.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="business"
                      label="business"
                      id="business"
                      value={this.state.business} 
                        onChange={this.handleChange}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={this.signupBusiness}
                >
                  Sign Up
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Button onClick = {this.gotoSignup} variant="body2">
                      Already have an account? Sign in
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
              </div>
        }
          </div>
        
    }
            </div>
            : 
             <React.Fragment>
            <CssBaseline />
            <AppBar position="relative">
              <Toolbar>
                <Typography variant="h6" color="inherit" noWrap>
                </Typography>
              </Toolbar>
            </AppBar>
            <main>
              {/* Hero unit */}
              <div className={classes.heroContent}>
                <Container maxWidth="sm">
                  <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    publicizeMe
                  </Typography>
                  <Typography variant="h5" align="center" color="textSecondary" paragraph>
                    Pay people to share or post about you on Instagram
                  </Typography>
                  <div className={classes.heroButtons}>
                    <Grid container spacing={2} justify="center">
                      <Grid item>
                        <Button variant="contained" color="primary">
                          Main call to action
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button variant="outlined" color="primary">
                          Secondary action
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                </Container>
              </div>
              <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {this.state.cards.map(card => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={require('./Cadence.png')}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.name}
                    </Typography>
                    <Typography>
                      Instagram followers: {card.followers}
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
                Footer
              </Typography>
              <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                Something here to give the footer a purpose!
              </Typography>
            </footer>
            {/* End footer */}
          </React.Fragment>
        // <div>
        // Welcome to publicizeMe. It's simple: Get paid to share/post other people's events.
        // <Button
        //           type="submit"
        //           variant="contained"
        //           color="primary"
        //           className={classes.submit}
        //           onClick={() => {
        //               this.setState({
        //                     influencer: true,
        //                     decided: true
        //               })
        //           }}
        //         >
        //           Go to the Influencers Home Page
        // </Button>
        // <Button
        //           type="submit"
        //           variant="contained"
        //           color="primary"
        //           className={classes.submit}
        //           onClick={() => {
        //             this.setState({
        //                   influencer: false,
        //                   decided: true
        //             })
        //         }}
        //         >
        //           Go to the Businesses Home Page
        // </Button>
        // </div>

}
</div>
          );
    }
}

let classes = ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
       
      },
      avatar: {
      },
      form: {
        width: '100%', 
        marginTop: 20
      },
      submit: {
      },
      heroContent: {
        // backgroundColor: theme.palette.background.paper,
      },
      heroButtons: {
        marginTop: 4
      },
      cardGrid: {
        paddingTop: 8,
        paddingBottom: 8
      },
      card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
      cardMedia: {
        height: 0,
        paddingTop: '56.25%', // 16:9,
        marginTop:'30'
      },
      cardContent: {
        flexGrow: 1,
      },
      footer: {
        // backgroundColor: theme.palette.background.paper,
        // padding: theme.spacing(6),
      },
  });
export default SignInSide;