import React, { Component } from 'react';
import { goBack, changePath } from '../common/index'
import { withRouter } from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import AlertDiv from './alertDiv'
import { timeout } from 'q';

class CreateAdminPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hiddenDiv: false,
        }
    }

    authStateChange=()=>{
        firebase.auth().onAuthStateChanged((user)=> {
            if (user) {
              // User is signed in.
              var uid = user.uid;
              this.setState({
                uid: uid
              })
              // ...
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
    // getCurrentUid = () => {
    //     const userId = firebase.auth().currentUser.uid;
    //     return userId
    // }

    adminSignUp = (ev) => {
        ev.preventDefault()
        let obj = {
            adminUserName: this.state.adminUserName,
            adminPasscode: this.state.adminPasscode1
        }
        const firebaseRef = firebase.database().ref();
        firebaseRef.child(this.state.uid).child("Admins/").child(obj.adminUserName).set(obj).then(() => {


            // this.props.settingState("sdasd")
            this.props.openHiddenDiv("Admin Created")
            setTimeout(() => {
                goBack(this.props)
            }, 300)
        }
        ).catch((err)=>{
            console.log(err)
            this.props.openHiddenDiv(err)
        })
    }

    componentWillMount(){
        this.authStateChange()
    }

    render() {

        var alertDiv = document.getElementById("alertDiv")
        // console.log(this.props)
        return (

            <div className="">


                {/* <div id="alertDiv"className="alertDiv">
                        <p>
                            Admin Created
    </p>
                    
                    </div> */}

                {/* {this.state.hiddenDiv ?<AlertDiv props={this.props} head={this.state.headerName} back={() => goBack(this.props)} /> :null} */}
                <div className="backButtonDiv">
                    <a>
                        <button onClick={() => goBack(this.props)} className="backButton"> <i className='fas fa-chevron-left'></i> </button>
                    </a>
                </div>
                <div className="head">
                    <p>
                        Create Admin
                    </p>
                </div>
                <div className="allInput">
                    <form onSubmit={this.adminSignUp}>

                        <input
                            type="text"
                            placeholder="Admin Username"
                            name="adminUserName"
                            onChange={(ev) => { this.gettingValues(ev) }}
                            required
                            autoFocus
                        />
                        <input
                            type="password"
                            placeholder="Passcode"
                            name="adminPasscode1"
                            onChange={(ev) => { this.gettingValues(ev) }}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Confirm Passcode"
                            name="adminPasscode2"
                            onChange={(ev) => { this.gettingValues(ev) }}
                            required
                        />
                        <div className="signUpButtonDiv">
                            <button className="signUpButton">Send</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}

export default withRouter(CreateAdminPage);