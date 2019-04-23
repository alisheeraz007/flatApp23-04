import React, { Component } from 'react';
import { goBack } from '../common/index'
import { NavLink, withRouter } from 'react-router-dom'
import LoaderDiv from './loaderDiv'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

class AddCollectorPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collectorUserName: "",
            collectorPasscode: "",
        }
    }

    authStateChange = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                if (!this.props.state.adminConfimation) {
                    this.props.history.push("/MainDashBoard")
                }
                // User is signed in.
                var uid = user.uid;
                this.setState({
                    uid: uid
                })
                // ...
            }
            else {
                this.props.history.push("/")
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

    addCollector = (ev) => {
        ev.preventDefault()
        // console.log(this.props)
        let collectorObj = {
            collectorUserName: this.state.collectorUserName,
            collectorPasscode: this.state.collectorPasscode
        }
        const firebaseRef = firebase.database().ref();
        firebaseRef.child(this.state.uid).child("Collectors/").child(collectorObj.collectorUserName).set(collectorObj)
        this.props.openHiddenDiv("Collector Creacted")
        setTimeout(() => {

            this.setState({
                collectorUserName: "",
                collectorPasscode: "",
            })
        }, 2000)
    }

    componentWillMount() {
        this.authStateChange()
    }

    render() {
        return (
            <div>
                {this.props.state.adminConfimation ?                
                <div className="mainContainer">
                    <div className="backButtonDiv">
                        <button onClick={() => goBack(this.props)} className="backButton"> <i className='fas fa-chevron-left'></i> </button>
                    </div>
                    <div className="head">
                        <p>Add Collector</p>
                    </div>
                    <div className="allInput">
                        <form onSubmit={this.addCollector}>
                            <input
                                type="text"
                                placeholder="Collector Name"
                                name="collectorUserName"
                                onChange={(ev) => { this.gettingValues(ev) }}
                                value={this.state.collectorUserName}
                                required
                                autoFocus
                            />
                            <input
                                type="password"
                                placeholder="Collector Passcode"
                                name="collectorPasscode"
                                onChange={(ev) => { this.gettingValues(ev) }}
                                value={this.state.collectorPasscode}
                                required
                            />
                            <div className="signUpButtonDiv">
                                <button className="signUpButton">Send</button>
                            </div>
                        </form>
                        <div className="listOfCollecterDiv">
                            <p><NavLink className="listOfCollecter" to="/CollectorListPage">List Of All Collector</NavLink></p>
                        </div>
                    </div>
                </div>
                :<LoaderDiv/>}
            </div>
        )
    }
}

export default withRouter(AddCollectorPage);