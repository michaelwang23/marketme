import React from 'react';
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
import { withStyles } from "@material-ui/core/styles";
import fire from './fire';
import logo from './Cadence.png'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const styles = (theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${logo})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'contain',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});



class Signin extends React.Component {
    constructor() {
        super();
        this.state = ({
            signin: true
        });
      }

      gotoSignUp = () => {
        this.setState({
            signin: false
        })
        }

        componentDidMount = () => {
            
        }

    signup = (e) => {
        e.preventDefault();
        console.log(this.state.email, this.state.password)

        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((u)=>this.createUserObj(u.user.uid, u.user.email))
        .catch((error) => {
            console.log(error);
            })
    }


    createUserObj = async(uid, email) => {
        var that = this;
        fetch("https://www.instagram.com/" + that.state.instagram + "/?__a=1")
        .then(res => res.json())
        .then(
            (result) => {
                var uObj = {
                    name: this.state.name,
                    instagram: this.state.instagram,
                    email: this.state.email,
                    explanation: this.state.explanation,
                    followers: (result['graphql']['user']['edge_followed_by']['count']),
                    profile_pic: (result['graphql']['user']['profile_pic_url_hd']),
                    biography: (result['graphql']['user']['biography']),
                };
                fire.database().ref('influencers').child(uid).set(uObj)
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                console.log(error)
            }
        )
    }
        handleChange = (e) => {
            this.setState({ [e.target.name]: e.target.value });
          }


  render() {
    const { classes } = this.props;
  return (
      <div>
    {this.state.signin === true ?
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} noValidate>
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              value={this.state.name} 
              onChange={this.handleChange}
              autoFocus
            />
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
              autoComplete="current-password"
              value={this.state.password} 
              onChange={this.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="instagram"
              label="Your Instagram Handle"
              id="instagram"
              value={this.state.instagram} 
              onChange={this.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="explanation"
              label="Describe the demographic of your followers"
              id="explanation"
              value={this.state.explanation} 
              onChange={this.handleChange}
            />
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
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
    :
    <div>
    </div>
  }
  </div>
  );
  }
}

export default withStyles(styles, { withTheme: true })(Signin);
