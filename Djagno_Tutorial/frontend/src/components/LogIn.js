
import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default class LogIn extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            email:"",
            password:"",
            showLoginFail: false,
        }
        this.handleSignIn = this.handleSignIn.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
    }

    handleEmailChange(e){
        this.setState({
            email:e.target.value
        })
        
    }

    handlePasswordChange(e){
        this.setState({
            password:e.target.value
        })
    }
    
    handleSignIn (){
        
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password:this.state.password
            })
        }
        fetch('/api/sign_in/',requestOptions).then((response)=>response.json()).then((data)=>{ 
            if ('email' in data) {
                console.log('User exists:', data.email);
                this.setState({ showMessage: true });
                window.location.href = '/';
            } 
            else {
                console.log('Log in failed');
                this.setState({ showLoginFail: true });
            }
            
        });
        
    }

    render(){
        
        return < Grid container spacing={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh',flexDirection: 'column' } } >
                
                <Grid item xs={4} align = "center" style={{ background: 'rgb(201, 255, 210)' }}>
                    <Typography >
                        Sign In Here
                    </Typography>
                    <FormControl  component="fieldset">
                        <TextField id="outlined-basic" required={true} label = "Email" onChange={this.handleEmailChange}/>
                        <TextField id="outlined-basic" required={true} label = "Password" onChange={this.handlePasswordChange}/>

                        < Grid container spacing={1} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',minHeight: '15vh' } } >
                            <Button variant="outlined" style={{width: "70%"}} onClick = {this.handleSignIn}>
                                Log In
                            </Button>
                        </Grid>
                            
                        <Button to='/SignUp' component={Link} variant="outlined">
                            Create a new account
                        </Button>


                    </FormControl>
                </Grid>

                <Grid item align = "center">
                    <Button to='/' component={Link}>
                        Go Back 
                    </Button>
                    {this.state.showLoginFail && (
                        <Typography>
                            Log in failed: User does not exist or password is wrong
                        </Typography>
                    )}
                </Grid>
               
                    
            </Grid>
        
    }
}