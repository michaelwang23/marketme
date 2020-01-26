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
import logo from './Cadence.png'

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
      email: '',
      password: '',
      signup: false
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login(e) {
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

  signup(e){
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then((u)=>this.createUserObj(u.user.uid, u.user.email))
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
            {this.state.signup === false ? 
            <Grid container component="main" className={styles.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={styles.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
              <div className={styles.paper}>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <form className={styles.form} noValidate>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
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
                    className={styles.submit}
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
                      <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Grid>
          </Grid>
    //    <div className="col-md-6">
    //    <form>
    //   <div class="form-group">
    //    <label for="exampleInputEmail1">Email address</label>
    //    <input value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
    //   </div>
    //   <div class="form-group">
    //   <label for="exampleInputPassword1">Password</label>
    //   <input value={this.state.password} onChange={this.handleChange} type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
    //   </div>
    //   <div class="form-group">
    //    <label for="exampleInputEmail2">Platforms Offering (Instagram, Youtube, etc)</label>
    //    <input value={this.state.platforms} onChange={this.handleChange} type="email" name="platforms" class="form-control" placeholder="Enter platforms" />
    //   </div>
      
      
    //   <button onClick={this.signup} style={{marginLeft: '25px'}} className="btn btn-success">Signup</button>
    //   <button onClick={this.gotoLogin} style={{marginLeft: '25px'}} >Go to Login</button>

    // </form>
    //  </div>
    :
      <div className="col-md-6">
      <form>
     <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
     </div>

      <div class="form-group">
     <label for="exampleInputPassword1">Password</label>
     <input value={this.state.password} onChange={this.handleChange} type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
     </div>
     
     <button type="submit" onClick={this.login} class="btn btn-primary">Login</button>
     <button onClick={this.gotoSignup} style={{marginLeft: '25px'}}>Go to Signup</button>
   </form>
    </div>
  }
    </div>
    );
  }
}


let styles = ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: logo,
    backgroundRepeat: 'no-repeat',
    // backgroundColor:
      // theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    // margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    // margin: theme.spacing(1),
    // backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: 10
  },
  submit: {
    // margin: theme.spacing(3, 0, 2),
  },
});

export default Login;