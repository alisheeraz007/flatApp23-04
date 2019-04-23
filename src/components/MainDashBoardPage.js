import React, { Component } from 'react';
import { goBack, changePath } from '../common/index'
import { withRouter } from 'react-router-dom'
import HiddenPasscodeDiv from './HiddenPasscodeDiv'
import LoaderDiv from './loaderDiv'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

class MainDashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hiddenDiv: false,
            createAdmin :false,
            loader: true
        }
    }
    signOut=()=>{
        firebase.auth().signOut().then(()=> {
            // console.log(this.props)
            this.props.history.push("/")
        }).catch((error)=> {
            console.log(error)
        });
    }

    authStateChange=()=>{
        firebase.auth().onAuthStateChanged((user)=> {
            if (user) {
              // User is signed in.
              var uid = user.uid;
            //   this.setState({
            //     uid: uid
            //   },()=>{this.gettigCollectorsAndAdmins();})
                this.gettigCollectorsAndAdmins(uid)
              // ...
            }else{
                this.props.history.push("/")
            }
          })
        }

    gettigCollectorsAndAdmins = (uid) => {
        if(uid){
            firebase.database().ref(uid).once('value').then((snapshot) => {
                if (snapshot.val() !== null) {
                    if (snapshot.val().Admins !== null) {
                        
                        
                        let adminData = snapshot.val().Admins;
                    if (adminData) {
                        adminData = Object.values(adminData)
                    }
                    this.setState({
                        Admins: adminData,
                        loader: false
                    })
                }
                
                if (snapshot.val().Admins === undefined) {
                    this.setState({
                        createAdmin : true,
                        loader: false
                    })
                }
                if (snapshot.val().Collectors !== null) {
                    
                    let collectorData = snapshot.val().Collectors;
                    if (collectorData) {
                        collectorData = Object.values(collectorData)
                    }
                    this.setState({
                        Collectors: collectorData,
                        loader: false
                    })
                }
            }
        })
    }
    }
    
    openHiddenDiv = (ev) => {
        if (ev.target.name === "AdminPannelPage") {
            this.setState({
                hiddenDiv: true,
                headerName: "Admin Passcode",
                path: "AdminPannelPage"
            })
        } else {
            this.setState({
                hiddenDiv: true,
                headerName: "Collector Passcode",
                path: "CollectorPannelPage"
            })
        }
    }
    hideHiddenDiv = () => {
        this.setState({
            hiddenDiv: false
        })
    }

    buttonDisplay = () => {
        let buttons = document.getElementById("buttons");
        if (this.state.Admins.length <= 1) {
            buttons[0].className = "hide"
        }
    }

    componentWillMount() {
        this.authStateChange();
    }

    render() {
        return (
            <div className="mainContainer">

                {this.state.hiddenDiv ? <HiddenPasscodeDiv props={this.props} state={this.state} back={this.hideHiddenDiv} /> : null}
                {this.state.loader ? <LoaderDiv/>:null}
                <div className="backButtonDiv">
                    <button onClick={() => this.signOut(this.props)} className="backButton"> <i className="fas fa-sign-out-alt"></i> </button>
                </div>
                <div className="head">
                    <p>
                        Main Dashboard
                    </p>
                </div>
                <div id="buttonsDiv" className="dashboardDiv">
                    {this.state.Admins ? <button onClick={(ev) => this.openHiddenDiv(ev, this.props)} name="AdminPannelPage">Admin</button> : null}
                    {this.state.Collectors ? <button onClick={(ev) => this.openHiddenDiv(ev, this.props)} name="CollectorPannelPage">Collector</button> : null}
                    {this.state.createAdmin ? <button onClick={(ev) => changePath(ev.target.name, this.props)} name="CreateAdminPage">Create Admin</button>: null}
                </div>
            </div>
        )
    }
}

export default withRouter(MainDashBoard);