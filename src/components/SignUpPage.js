import React, { Component } from 'react';
import { goBack } from '../common/index'
import { withRouter } from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


class SignUpPage extends Component {
    constructor(props) {
        super(props);
    }

    getttingValueFromInput = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value
        },(ev)=>{
            // console.log(this.state)
        })
    }

    signUp = (ev) => {
        let obj = {
            buildingname: this.state.buildingname,
            email: this.state.email,
            mobileNo: this.state.mobileNo,
        }
        ev.preventDefault();
        const firebaseRef = firebase.database().ref()
        firebase.auth().createUserWithEmailAndPassword(obj.email, this.state.password1)
        .then((res)=>{
            // console.log(res.user.uid)
            firebaseRef.child(res.user.uid).child("Building Information").set(obj)
            this.props.openHiddenDiv("Successfully Signed Up")
            this.props.history.push("/MainDashBoard")
        })
        .catch((error)=> {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            this.props.openHiddenDiv(errorMessage)
            setTimeout(()=>{
                document.getElementById("alertDiv").classList += " redAlert"
            },350)
            // console.log(errorMessage);
            // ...
        });
    }

    render() {
        //    console.log(this.props)
        return (
            <div className="mainContainer">
                <div className="backButtonDiv">
                    <button onClick={() => goBack(this.props)} className="backButton"> <i className='fas fa-chevron-left'></i> </button>
                </div>
                <div className="head">
                    <p>Sign Up</p>
                </div>
                <div className="allInput">
                    <form onSubmit={this.signUp}>
                        <input
                            onChange={(ev)=>{this.getttingValueFromInput(ev)}}
                            type="text"
                            placeholder="Building Name"
                            name="buildingname"
                            required
                            autoFocus
                        />
                        <input
                            onChange={(ev)=>{this.getttingValueFromInput(ev)}}
                            type="text"
                            placeholder="Mobile No."
                            name="mobileNo"
                            required
                        />
                        <input
                            onChange={(ev)=>{this.getttingValueFromInput(ev)}}
                            type="text"
                            placeholder="Email"
                            name="email"
                            required
                        />
                        <input
                            onChange={(ev)=>{this.getttingValueFromInput(ev)}}
                            type="password"
                            placeholder="Password"
                            name="password1"
                            required
                        />
                        <input
                            onChange={(ev)=>{this.getttingValueFromInput(ev)}}
                            type="password"
                            placeholder="Confirm Password"
                            name="password2"
                            required
                        />
                        <div className="signUpButtonDiv">
                            <button className="signUpButton">Sign Up</button>
                        </div>
                    </form>
                </div>

            </div>
        )
    }
}

export default withRouter(SignUpPage)