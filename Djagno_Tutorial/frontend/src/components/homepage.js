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


export default class HomePage extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            userinfo: {},
            userLoggedIn: false
        }

        this.handleLogOut = this.handleLogOut.bind(this)
    }

    

    async handleLogOut(){
        console.log("user is logging out")
        try {
            const response = await fetch('api/logout/', { method: 'GET' });
            if (response.ok) {
                console.log('User has been logged out');
                window.location.href = '/';
            } else {
                console.error('Logout failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }
    
    async componentDidMount() {
        try {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            };
    
            const response = await fetch('/api/getCurrentUser/', requestOptions);
            const data = await response.json();
    
            if ('email' in data) {
                console.log('User exists:', data);
                this.setState({ userinfo: data, userLoggedIn: true });
            } 
            else {
                console.log('User is not logged in');
            }
        } 
        catch (error) {
          console.error('Error during fetch:', error);
        }
    }
    
    
    render(){
        const { userinfo, userLoggedIn } = this.state;
        return <Grid container spacing={1} style={{ display: 'flex',height:'100vh' }} >
        
            <Grid item xs={3} style={{ background: 'rgb(201, 255, 210)',height:'100%' }}>
                <p id = "Build_Header" style={{ marginTop: '5%',marginLeft: '10%' }} >Design your Circuit Here</p>
            </Grid>
            
            <Grid item xs={9}>
                <div style={{ textAlign: 'right' }}>
                    
                    {userLoggedIn ? (
                            <div >  
                                <p1>
                                    Welcome, {userinfo.email}!
                                </p1>
                                <Button variant="contained" onClick = {this.handleLogOut}  >
                                    Sign Out
                                </Button>      
                            </div>
                        ) : 
                    (
                            <Button to='LogIn' component = {Link}>
                                Login/Signup
                            </Button>
                        )
                    }                

                </div>
                
                <Typography component = 'h3' variant = 'h3'style={{ marginTop: '2%',marginLeft: '5%' }}>
                    Quantum Composer
                </Typography>
            </Grid>
            
        </Grid>
    }
}
