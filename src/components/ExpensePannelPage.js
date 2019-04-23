import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { goBack } from '../common/index'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import LoaderDiv from './loaderDiv'

class ExpensePannelPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expenseTitle: "",
            description: "",
            expenseAmount: ""
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

    addExpense = (ev) => {
        ev.preventDefault()
        let today = new Date()
        let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        let months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

        let obj = {
            description: this.state.description,
            expenseAmount: this.state.expenseAmount,
            date: date
        }
        const firebaseRef = firebase.database().ref();
        firebaseRef.child(this.state.uid).child("expenses" + " " + today.getFullYear()).child(months[today.getMonth()]).child(this.state.expenseTitle).set(obj)

        this.props.openHiddenDiv("Expense Added")

        setTimeout(() => {

            this.setState({
                expenseTitle: "",
                description: "",
                expenseAmount: ""
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
                        <p>
                            Expense Pannel
                    </p>
                    </div>
                    <div className="allInput">
                        <form onSubmit={this.addExpense}>
                            <input
                                list="block"
                                placeholder="Expense Title"
                                onChange={(ev) => this.gettingValues(ev)}
                                name="expenseTitle"
                                value={this.state.expenseTitle}
                                required
                                autoFocus
                            />
                            <datalist id="block">
                                <option>abc</option>
                            </datalist>

                            <input
                                type="text"
                                placeholder="Description"
                                onChange={(ev) => this.gettingValues(ev)}
                                name="description"
                                value={this.state.description}
                                required
                            />

                            <input
                                type="text"
                                placeholder="Expense Amount"
                                onChange={(ev) => this.gettingValues(ev)}
                                name="expenseAmount"
                                value={this.state.expenseAmount}
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

export default withRouter(ExpensePannelPage);