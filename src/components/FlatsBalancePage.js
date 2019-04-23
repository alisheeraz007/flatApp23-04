import React, { Component } from 'react';
import { withRouter } from "react-router-dom"
import { goBack, changePath } from '../common/index'
import LoaderDiv from './loaderDiv';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

class FlatsBalancePage extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    gettingBlocksAndFlats() {
        firebase.database().ref().child(this.state.uid).child("Year2019").once('value').then((snap) => {
            // console.log(snap.val())
            let wholeData = snap.val()
            let dataValue = Object.values(wholeData)
            let dataKey = Object.keys(wholeData)
            // console.log(dataKey)
            // console.log(dataValue[0])

            this.setState({
                wholeData,
                dataValue,
                dataKey,
            }, () => { console.log(dataValue) })
        })
    }

    authStateChange = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // if (!this.props.state.adminConfimation) {
                //     // this.props.history.push("/MainDashBoard")
                // }
                // User is signed in.
                var uid = user.uid;
                console.log(uid)
                this.setState({
                    uid: uid
                }, () => {
                    // console.log(this.state)
                    this.gettingBlocksAndFlats()
                })
                // ...
            }
            // else {
            //     this.props.history.push("/")
            // }
        })
    }

    componentWillMount() {
        this.authStateChange()
    }

    buttonDisplayToggle = (index) => {
        // document.getElementById("mainDropDown" + index).classList.toggle("dropDownDiv");
        document.getElementById("totalButton" + index).classList.toggle("dropDownDiv");
        document.getElementById("blockList").classList.toggle("positionTop");
        // document.getElementById("BlockNoDiv" + index).sc
        // window.scroll(-100,0)
        document.body.scrollTop = -100
        document.documentElement.scrollTop = -100;
        document.getElementById("head").classList.toggle("hide");
    }

    gettingFlatsNo = (ev) => {
        console.log(ev.target.name)
    }

    render() {
        return (
            <div>
                {this.state.dataValue ?

                    <div className="mainContainer">
                        <div className="backButtonDiv">
                            <button onClick={() => goBack(this.props)} className="backButton"> <i className='fas fa-chevron-left'></i> </button>
                        </div>
                        <div id="head" className="head">
                            <p>
                                Flats Balance
                    </p>
                        </div>
                        <div id="blockList" className="blockList">

                            {this.state.dataKey.map((block, index) => {
                                return (
                                    <div className="top">
                                        <div id={"mainDropDown" + index} className="dropDownDivShow" >
                                            <div className="dropDownMain">
                                                <div id={"BlockNoDiv" + index} className="BlockNoDiv">
                                                    <button onClick={() => this.buttonDisplayToggle(index)} className="dropDown" >{block}</button>
                                                </div>
                                                <div id={"totalButton" + index} className="totalButton">
                                                    {Object.values(this.state.dataValue[index]).map((flat) => {
                                                        return (
                                                            <div className="flatDiv">
                                                                <button
                                                                    name={flat.recievable.flatNo}
                                                                    onClick={(ev) => { this.gettingFlatsNo(ev) }}>
                                                                    {flat.recievable.flatNo}
                                                                </button>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    : <LoaderDiv />}
            </div>
        )
    }
}
export default withRouter(FlatsBalancePage)