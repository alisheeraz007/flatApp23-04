import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import { goBack } from '../common/index'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

class ResetPasswordPage extends Component {
    constructor(props) {
        super(props)
    }

    gettingValues = (ev) => {
        let eve = ev.target.name
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }

    resetPassword = (ev) => {
        ev.preventDefault()
        var auth = firebase.auth();
        var emailAddress = this.state.email;

        auth.sendPasswordResetEmail(emailAddress).then(()=> {
            this.props.openHiddenDiv("Email Sent.")
            // Email sent.
        }).catch((error)=> {
            this.props.openHiddenDiv("Email Not Found.")
            setTimeout(() => {
                document.getElementById("alertDiv").classList += " redAlert"
            }, 350)
        });
    }


    render() {
        return (
            <div className="mainContainer">

                <div className="backButtonDiv">
                    <button onClick={() => goBack(this.props)} className="backButton"> <i className='fas fa-chevron-left'></i> </button>
                </div>
                <div className="head">
                    <p>Reset Password</p>
                </div>
                <div className="allInput">
                    <form onSubmit={this.resetPassword}>
                        <input
                            type="text"
                            placeholder="Email"
                            onChange={(ev) => { this.gettingValues(ev) }}
                            name="email"
                        />
                        <br /><button>Send</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(ResetPasswordPage);