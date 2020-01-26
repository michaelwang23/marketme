import React, { Component } from 'react';
import fire from './fire';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
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
import ReactDOM from 'react-dom';
import Toggle from 'react-bootstrap-toggle';


class SignInSide extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: '',
          signup: false,
          toggleActive: false,
          decided: false
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
            //influencer == true
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
        <div>
        Welcome to publicizeMe. It's simple: Get paid to share/post other people's events.
        <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={() => {
                      this.setState({
                            influencer: true,
                            decided: true
                      })
                  }}
                >
                  Go to the Influencers Home Page
        </Button>
        <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={() => {
                    this.setState({
                          influencer: false,
                          decided: true
                    })
                }}
                >
                  Go to the Businesses Home Page
        </Button>
        </div>

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
  });
export default SignInSide;