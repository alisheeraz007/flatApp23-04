import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


class HiddenUpdateDiv extends Component {
    constructor(props) {
        super(props)
        this.state={
            oldPasscode: "",
            confirmNewPasscode: ""
        }
    }

    gettingValues = (ev) => {
        let eve = ev.target.name
        this.setState({
            [ev.target.name]: ev.target.value
        }, (ev) => {
            if(eve === "oldPasscode"){
                // console.log(eve)
                if (this.state.oldPasscode !== this.props.state.collectorForUpdate.collectorPasscode) {
                    document.getElementById("passcodeCorrection").innerHTML = "Wrong Passcode..."
                    document.getElementById("passcodeCorrection").classList = "wrong"
                } else {
                    document.getElementById("passcodeCorrection").innerHTML = "Correct..."
                    document.getElementById("passcodeCorrection").classList = "right"
                    setTimeout(() => {
                        document.getElementById("passcodeCorrection").innerHTML = ""
                    }, 1500)
                }
                if (this.state.oldPasscode === "") {
                    document.getElementById("passcodeCorrection").innerHTML = ""
                }
            }
            if(eve === "confirmNewPasscode"){
                // console.log(eve)
                if (this.state.confirmNewPasscode !== this.state.newPasscode) {
                    document.getElementById("confirmPasscode").innerHTML = "Password Not Match..."
                    document.getElementById("confirmPasscode").classList = "wrong"
                } else {
                    document.getElementById("confirmPasscode").innerHTML = "Password Matched..."
                    document.getElementById("confirmPasscode").classList = "right"
                    setTimeout(() => {
                        document.getElementById("confirmPasscode").innerHTML = ""
                    }, 1500)
                }
                if (this.state.confirmNewPasscode === "") {
                    document.getElementById("confirmPasscode").innerHTML = ""
                }
            }
        })
    }

    updateCollector = (ev) => {
        // ev.preventDefault()
        let updateObject = {
            collectorUserName: this.state.newUsername,
            collectorPasscode: this.state.newPasscode,
        }
        if (this.props.state.collectorForUpdate.collectorPasscode === this.state.oldPasscode
            && this.state.newPasscode === this.state.confirmNewPasscode) {

            // firebase.database().ref().child(this.props.state.uid).child("Collectors").child(this.props.state.collectorForUpdate.collectorUserName).update(updateObject)
            firebase.database().ref().child(this.props.state.uid).child("Collectors").child(this.props.state.collectorForUpdate.collectorUserName).remove()
            firebase.database().ref().child(this.props.state.uid).child("Collectors").child(this.state.newUsername).set(updateObject)
            .then((res) => {
                this.props.goBack()
            })
            // this.props.goBack()
        }
    }

    

    render() {
        console.log(this.props.state)
        return (
            <div>

                {this.props.state.hiddenUpdateDiv ?
                    <div className="adminPasscodeInputDiv">
                        <div className="backButtonDiv">
                            <button onClick={() => this.props.goBack(this.props)} className="backButton"> <i className='fas fa-chevron-left'></i> </button>
                        </div>
                        <div className="head">
                            <p>
                                Update Collector
                    </p>
                        </div>
                        <div>
                            <form className="allInput" onSubmit={(ev) => this.updateCollector(ev)}>
                                <input
                                    type="text"
                                    placeholder="New Username"
                                    onChange={(ev) => { this.gettingValues(ev) }}
                                    defaultValue={this.props.state.collectorForUpdate.collectorUserName}
                                    name="newUsername"
                                    required
                                    autoFocus
                                />
                                <input
                                    type="password"
                                    placeholder="Old Passcode"
                                    onChange={(ev) => { this.gettingValues(ev) }}
                                    name="oldPasscode"
                                    required
                                /><p id="passcodeCorrection" ></p>
                                <input
                                    type="password"
                                    placeholder="New Passcode"
                                    onChange={(ev) => { this.gettingValues(ev) }}
                                    name="newPasscode"
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="Confirm New Passcode"
                                    onChange={(ev) => { this.gettingValues(ev) }}
                                    name="confirmNewPasscode"
                                    required
                                /><p id="confirmPasscode" ></p>
                                <div className="signUpButtonDiv">
                                    <button className="signUpButton">Update</button>
                                </div>
                            </form>
                        </div>
                    </div> : null}
            </div>
        )
    }
}

export default withRouter(HiddenUpdateDiv)