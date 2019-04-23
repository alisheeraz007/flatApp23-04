import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom'
import { goBack } from '../common/index'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import LoaderDiv from './loaderDiv';

class CollectorPannelPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            flatNo: "",
            blockNo: "",
            paymentRecieved: "",
        }
    }

    authStateChange = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                // if(this.props.location.state.userName){
                if (!this.props.state.collectorConfimation) {
                    this.props.history.push("/MainDashBoard")


                }
                // }
                var uid = user.uid;
                this.setState({
                    uid: uid
                }, () => { this.gettingCollecters() })
                // ...
            } else {
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

    flatsDescription = (ev) => {
        ev.preventDefault()
        let today = new Date();
        let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        let months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        let obj1 = {
            flatNo: this.state.flatNo,
            blockNo: this.state.blockNo
        }
        let obj2 = {
            paymentRecieved: this.state.paymentRecieved,
            date: date,
            name: this.state.userName
        }
        // console.log(obj2.date)
        const firebaseRef = firebase.database().ref();
        firebaseRef.child(this.state.uid).child("Year" + today.getFullYear()).child(obj1.blockNo).child(obj1.flatNo).child("/recieved").set(obj2)
        this.props.openHiddenDiv("Payment Added")
        setTimeout(() => {

            this.setState({
                flatNo: "",
                blockNo: "",
                paymentRecieved: ""
            })
        }, 2000)
    }

    gettingCollecters = () => {
        firebase.database().ref(this.state.uid).once('value').then((snapshot) => {
            let collectorData = snapshot.val().Collectors;
            if (collectorData) {
                collectorData = Object.values(collectorData)
            }
            this.setState({
                Collectors: collectorData,
            })
        })

    }

    componentWillMount() {
        this.authStateChange()

        this.setState({
            userName: this.props.location.state.userName
        })
    }
    componentWillReceiveProps(props) {
        console.log(props)
    }

    render() {
        // console.log(this.props)
        return (
            this.props.state.collectorConfimation ?
                <div className="mainContainer">
                    <div className="backButtonDiv">
                        <button onClick={() => goBack(this.props)} className="backButton"> <i className="fas fa-sign-out-alt"></i> </button>
                    </div>
                    <div className="head">
                        <p>
                            Collector Pannel
                    </p>
                    </div>
                    <div className="allInput">
                        <form onSubmit={this.flatsDescription}>

                            <input
                                list="block"
                                placeholder="Block No."
                                onChange={(ev) => this.gettingValues(ev)}
                                value={this.state.blockNo}
                                name="blockNo"
                                required
                                autoFocus
                            />
                            <datalist id="block">
                                <option>abc</option>
                            </datalist>

                            <input
                                list="block"
                                placeholder="Flat No."
                                onChange={(ev) => this.gettingValues(ev)}
                                value={this.state.flatNo}
                                name="flatNo"
                                required
                            />
                            <datalist id="block">
                                <option>abc</option>
                            </datalist>

                            <input
                                type="text"
                                placeholder="Payment Recieved"
                                onChange={(ev) => this.gettingValues(ev)}
                                value={this.state.paymentRecieved}
                                name="paymentRecieved"
                                required
                            />

                            <div className="signUpButtonDiv">
                                <button className="signUpButton">Send</button>
                            </div>
                        </form>
                        <div className="CollectorName">
                            <p>{this.state.userName}</p>
                        </div>
                    </div>
                </div>
                : <LoaderDiv />
        )
    }
}

export default withRouter(CollectorPannelPage);