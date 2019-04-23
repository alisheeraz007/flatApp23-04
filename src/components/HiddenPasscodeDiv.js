import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

class HiddenPasscodeDiv extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false,
        }
    }

    authStateChange = () => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            // User is signed in.
            var uid = user.uid;
            this.setState({
              uid: uid,
            })
          }
        })
      }

    gettingValues = (ev) => {
        this.setState({
            [ev.target.name]: ev.target.value
        }, (ev) => {
            // console.log(this.state)
        })
    }


    checkingField = (ev) => {
        ev.preventDefault()
        // console.log(this.props)
        let matchFound = true
        if (this.props.state.Admins) {
            for (let i = 0; i < this.props.state.Admins.length; i++) {
                if (this.props.state.headerName === "Admin Passcode"
                    && this.state.userName === this.props.state.Admins[i].adminUserName
                    && this.state.passcode === this.props.state.Admins[i].adminPasscode) {
                        this.props.props.settingAdminCollectorState("adminConfimation",true)                        
                        this.props.props.history.push({
                            pathname: '/AdminPannelPage',
                            state: { userName: this.state.userName },
                        })
                    matchFound = false
                }
            }
        }

        if (this.props.state.Collectors) {
            for (let i = 0; i < this.props.state.Collectors.length; i++) {
                if (this.props.state.headerName === "Collector Passcode"
                    && this.state.userName === this.props.state.Collectors[i].collectorUserName
                    && this.state.passcode === this.props.state.Collectors[i].collectorPasscode) {
                        this.props.props.settingAdminCollectorState("collectorConfimation",true)
                        this.props.props.history.push({
                        pathname: '/CollectorPannelPage',
                        state: { userName: this.state.userName },
                    })
                    matchFound = false
                }
            }
        }

        if (matchFound === true) {
            this.props.props.openHiddenDiv("Username Or Passcode Is Incorrect")
            setTimeout(() => {
                document.getElementById("alertDiv").classList += " redAlert"
            }, 350)
        }
    }

    
    componentWillMount(){
        this.authStateChange()
    }

    render() {
        // console.log(this.props)
        return (
            this.props.state.hiddenDiv ?

                <div className="adminPasscodeInputDiv">
                    <div className="backButtonDiv">
                        <button onClick={this.props.back} className="backButton"> <i className='fas fa-chevron-left'></i> </button>
                    </div>
                    <div className="head">
                        <p>
                            {this.props.state.headerName}
                        </p>
                    </div>
                    <div className="allInput">
                        <form>
                            <input
                                type="text"
                                placeholder="UserName"
                                onChange={(ev) => this.gettingValues(ev)}
                                name="userName"
                                required
                                autoFocus
                            />
                            <input
                                type="password"
                                placeholder="Passcode"
                                onChange={(ev) => this.gettingValues(ev)}
                                name="passcode"
                                required
                            />
                            <div className="signUpButtonDiv">
                                <button onClick={(ev) => this.checkingField(ev)} className="signUpButton">Send</button>
                            </div>
                        </form>
                    </div>

                </div> : null
        )
    }
}

export default withRouter(HiddenPasscodeDiv);