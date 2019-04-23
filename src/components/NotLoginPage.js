import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';



class NotLogin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uid: ""
        }
    }

    authStateChange = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                var uid = user.uid;
                this.setState({
                    uid: uid
                })
            }
        })
    }

    mainSignIn = (ev) => {
        ev.preventDefault()
        if (this.state.uid === "") {
            window.location.pathname = "/"
        }
        else {
            window.location.pathname = "/MainDashBoard"
        }
    }

    componentWillMount() {
        // this.authStateChange()
    }

    render() {
        // console.log(window.location.pathname)
        return (
            <div>
                <div className="head">
                    <p>
                        Login First...
                    </p>
                </div>
                <div id="buttonsDiv" className="dashboardDiv">
                    <button onClick={this.mainSignIn} name="LogInButton">Click Here To LogIn</button>
                </div>
            </div>

        )
    }
}
export default NotLogin