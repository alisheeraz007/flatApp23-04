import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { goBack } from '../common/index'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import LoaderDiv from './loaderDiv';

class AddBlockFlatsPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            blockNo: "",
            flatNo: "",
            previousBalance: "",
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
        console.log(today.toDateString())
        console.log(today.toLocaleTimeString())
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        console.log(time)
        let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        let months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

        let obj1 = {
            flatNo: this.state.flatNo,
            blockNo: this.state.blockNo
        }
        let obj2 = {
            blockNo: this.state.blockNo,
            previousBalance: this.state.previousBalance,
            date: today.toDateString(),
            time: today.toLocaleTimeString(),
            flatNo: this.state.flatNo,
        }
        // console.log(obj2.date)
        const firebaseRef = firebase.database().ref();
        firebaseRef.child(this.state.uid).child("FlatsBalance").child(obj1.blockNo).child(obj1.flatNo).set(obj2)
        this.props.openHiddenDiv("Added")
        setTimeout(() => {

            this.setState({
                blockNo: "",
                flatNo: "",
                previousBalance: "",
            })
        }, 2000)
    }

    componentWillMount() {
        this.authStateChange()
    }

    // componentWillReceiveProps(props) {
    //     // console.log(props)
    // }

    render() {
        return (
            <div>
                {this.props.state.adminConfimation ?
                    <div className="mainContainer">
                        <div className="backButtonDiv">
                            <button onClick={() => goBack(this.props)} className="backButton"> <i className='fas fa-chevron-left'></i> </button>
                        </div>
                        <div className="head">
                            <p>
                                Add Blocks & Flats
                    </p>
                        </div>
                        <div className="allInput">
                            <form onSubmit={this.flatsDescription}>
                                <input
                                    list="block"
                                    placeholder="Block No."
                                    onChange={(ev) => this.gettingValues(ev)}
                                    name="blockNo"
                                    value={this.state.blockNo}
                                    required
                                    autoFocus
                                />
                                <datalist id="block">
                                    <option>abc</option>
                                </datalist>

                                <input
                                    list="flat"
                                    placeholder="Flat No."
                                    onChange={(ev) => this.gettingValues(ev)}
                                    name="flatNo"
                                    value={this.state.flatNo}
                                    required
                                />
                                <datalist id="flat">
                                    <option>abc</option>
                                </datalist>

                                <input
                                    type="text"
                                    placeholder="Previous Balance"
                                    onChange={(ev) => this.gettingValues(ev)}
                                    name="previousBalance"
                                    value={this.state.previousBalance}
                                    required
                                />

                                <div className="signUpButtonDiv">
                                    <button className="signUpButton">Send</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    : <LoaderDiv />}

            </div>
        )
    }
}

export default withRouter(AddBlockFlatsPage);