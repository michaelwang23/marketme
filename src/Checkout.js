import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Dwolla from 'react-dwolla-iav'
const STRIPE_PUBLISHABLE_KEY = 'pk_test_0JmbhOMJTWU7Gei8Y6P7QetK00mMgXJlXX';
const STRIPE_SECRET_KEY = "sk_test_DBPDVZceddOyN0GW1wgJVPWa00zdKcNXw0"
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
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    // marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      // marginTop: theme.spacing(6),
      // marginBottom: theme.spacing(6),
      // padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
});

const steps = ['Shipping address', 'Payment details', 'Review your order'];

// function getStepContent(step) {
//   switch (step) {
//     case 0:
//       return <AddressForm />;
//     case 1:
//       return <PaymentForm />;
//     case 2:
//       return <Review />;
//     default:
//       throw new Error('Unknown step');
//   }
// }

class Checkout extends Component {
  constructor() {
    super();
    this.state = ({
        step: 2
    });
  }

  componentDidMount = () => {
    console.log(this.props.name)
  }

  dwollaConfig = {
    backButton: false,
    customerToken: 'asdf',
    environment: 'sandboox',
    fallbackToMicroDeposits: false,
    microDeposits: false,
    stylesheets: [],
    subscriber: () => {},
  }

  handleNext = () => {
    this.setState({
      step: this.state.step + 1
    })
  };
  handleBack = () => {
    this.setState({
      step: this.state.step - 1
    })
  };
  handleChange = (e) => {
    console.log(this.state.cvv)
    this.setState({ [e.target.name]: e.target.value });
  }

  registerStripe = async() => {
    await this.addCard()
  }

  addCard = async() => {
    // var cardName = this.state.cardName
    var cardNumber = this.state.cardNumber
    var expMonth = this.state.expMonth
    var expYear = this.state.expYear
    var cvv = this.state.cvv
    console.log(cardNumber, expMonth, expYear, cvv)
    fetch("https://api.stripe.com/v1/tokens", {
      body: "card[number]=" +  cardNumber + "&card[exp_month]=" + expMonth + "&card[exp_year]=" + expYear + "&card[cvc]=" + cvv,
      headers: {
        Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: 'application/json'
      },
      method: "POST"
    }).then(response => response.json())
    .then(data => {
      this.createAccount(data.id)
    });
  }


  createAccount = async(token) => {
    let response = await fetch("https://api.stripe.com/v1/customers", {
       body: "description=User" + this.state.cardName,
       headers: {
           Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
          "Content-Type": "application/x-www-form-urlencoded"
       },
       method: "POST"
     })
     let responseJson = await response.json();
     this.updateCard(token, responseJson.id)
 }

    
 updateCard = async(token, id) => {
   console.log(token)
  let response = await fetch("https://api.stripe.com/v1/customers/" + id + "/sources", {
      // body: "source=tok_visa",
      body: "source=" + token,
      headers: {
      Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST"
    })
  let responseJson = await response.json()
  console.log(responseJson.id)
  this.setState({
    card_id: responseJson.id,
    cus_id: responseJson.customer
  })
  this.chargeAccount(responseJson.id, responseJson.customer, 10)

}

chargeAccount = async (card_id, cus_id, number) => {
  console.log(number)
  let response = await fetch("https://api.stripe.com/v1/charges", {
    body: "amount=" + number * 100 + "&currency=usd&source=" + card_id + "&customer=" + cus_id + "&description=" + "Chosen One",
    headers: {
      Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST"
  })
  let responseJson = await response.json();
  console.log(responseJson)

}

  

  render() {
    const { classes } = this.props;
  return (
    <div>
    
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <React.Fragment>
            {this.state.step === 3 ? (
              <React.Fragment>
                
                <Review />
                {/* <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order confirmation, and will
                  send you an update when your order has shipped.
                </Typography> */}
                
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleBack}
                    className={classes.button}
                  >
                    {'Back'}
                  </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleNext}
                    className={classes.button}
                  >
                    {'Place order'}
                  </Button>

              </React.Fragment>
            ) : (
              <div>
              {this.state.step === 2 ? (
                
                <div>

                <React.Fragment>
                <Typography variant="h6" gutterBottom>
        Payment Info
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField required id="cardName" label="Name on card" name = "cardName" fullWidth
          value={this.state.cardName} 
          onChange={this.handleChange}
          />
          
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="cardNumber" label="Card number" name = "cardNumber" fullWidth 
          value={this.state.cardNumber} 
          onChange={this.handleChange}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField required id="expMonth" label="Expiry month" name = "expMonth" fullWidth 
          value={this.state.expMonth} 
          onChange={this.handleChange}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField required id="expDate" label="Expiry year" name = "expYear" fullWidth 
          value={this.state.expYear} 
          onChange={this.handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            name = "cvv"
            helperText="Last three digits on signature strip"
            value={this.state.cvv} 
            onChange={this.handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
        
      </Grid>
      <Typography variant="h6" gutterBottom>
        Review Order
      </Typography>
      <Typography variant="h6" gutterBottom>
        Pay $5 for a story share on {this.props.name}
      </Typography>
    </React.Fragment>
    <Button
                    variant="contained"
                    color="primary"
                    onClick={this.registerStripe}
                    className={classes.button}
                  >
                    {'Add Card'}
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.chargeAccount(10)}
                    className={classes.button}
                  >
                    {'Submit'}
                  </Button>
                </div>
              ) : (
                <div>
                  <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            value={this.state.firstname} 
            onChange={this.handleChange}
            fullWidth
            autoComplete="fname"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            value={this.state.lastname} 
            onChange={this.handleChange}
            fullWidth
            autoComplete="lname"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line"
            fullWidth
            value={this.state.address} 
            onChange={this.handleChange}
            autoComplete="billing address-line1"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            value={this.state.city} 
            onChange={this.handleChange}
            autoComplete="billing address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="state" name="state" label="State/Province/Region" fullWidth 
          value={this.state.state} 
          onChange={this.handleChange}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="billing postal-code"
            value={this.state.zipcode} 
            onChange={this.handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="billing country"
            value={this.state.country} 
            onChange={this.handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </React.Fragment>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleNext}
                    className={classes.button}
                  >
                    {'Next'}
                  </Button>
                  </div>
              )}
            </div>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
    </div>
  );
     }
}

export default withStyles(styles, { withTheme: true })(Checkout);
