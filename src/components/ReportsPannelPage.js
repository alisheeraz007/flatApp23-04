import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { withRouter } from "react-router-dom"
import { goBack, changePath } from '../common/index'
import LoaderDiv from './loaderDiv';


class ReportsPannelPage extends Component {
    constructor(props) {
        super(props)
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

    componentWillMount() {
        this.authStateChange()
    }

    render() {
        // console.log(this.props)
        return (
            <div>
                {this.props.state.adminConfimation ?

                    <div className="mainContainer">
                        <div className="backButtonDiv">
                            <button onClick={() => goBack(this.props)} className="backButton"> <i className='fas fa-chevron-left'></i> </button>
                        </div>
                        <div className="head">
                            <p>
                                Reports
                    </p>
                        </div>
                        <div className="dashboardDiv">
                            <button onClick={(ev) => changePath(ev.target.name, this.props)} name="FlatsBalancePage">Flats <br /> Balance</button>
                            <button onClick={(ev) => changePath(ev.target.name, this.props)} name="">Expense <br /> Reports</button>
                            <button onClick={(ev) => changePath(ev.target.name, this.props)} name="">Summary</button>
                            <button onClick={(ev) => changePath(ev.target.name, this.props)} name="">Reports</button>
                        </div>
                    </div>
                    : <LoaderDiv />}
            </div>
        )
    }
}

export default withRouter(ReportsPannelPage);