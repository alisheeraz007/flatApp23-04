import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import LoaderDiv from './loaderDiv'
import { goBack } from '../common/index'
import HiddenUpdateDiv from './HiddenUpdateDiv'

class CollectorListPage extends Component {
    constructor() {
        super()
        this.state = {
            loader: true,
            hiddenUpdateDiv: false
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
                }, () => { this.gettingCollector(); })
            }
            else {
                this.props.history.push("/")
            }
        })
    }
    
    gettingCollector = () => {
        firebase.database().ref(this.state.uid).once('value').then((snapshot) => {
            if (snapshot.val() !== null) {
                if (snapshot.val().Collectors !== null) {
                    
                    
                    let Collectors = snapshot.val().Collectors;
                    if (Collectors) {
                        Collectors = Object.values(Collectors)
                    }
                    this.setState({
                        Collectors: Collectors,
                    })
                    // for(let i = 0; i<this.state.Collectors.length; i++){
                    //     console.log(this.state.Collectors[i].collectorUserName)
                    // }
                }
            }
        })
    }

    deleteUser = (index, ev) => {
        // console.log(ev)
        let array = this.state.Collectors
        // console.log(array[index])
        if (array.length) {
            firebase.database().ref().child(this.state.uid).child("Collectors").child(this.state.Collectors[index].collectorUserName).remove()
        }
        array.splice(index, 1)
        // console.log(index)
        this.setState({
            Collectors: array,
        })
    }

    editButton = (index) => {
        this.setState({
            hiddenUpdateDiv: true,
            collectorForUpdate: this.state.Collectors[index]
        })
    }

    goBack = () => {
        // console.log(this.props.state.hi)
        this.setState({
            hiddenUpdateDiv: false,
        })
    }

    componentWillMount() {
        this.authStateChange()
    }

    render() {
        // console.log(this.props)
        return (
            <div>
                {this.props.state.adminConfimation && this.state.Collectors?
                    <div>
                    {/* {console.log(this.state.Collectors)} */}
                        <HiddenUpdateDiv state={this.state} goBack={this.goBack} />
                        <div className="backButtonDiv">
                            <button onClick={() => goBack(this.props)} className="backButton"> <i className='fas fa-chevron-left'></i> </button>
                        </div>
                        <div className="head">
                            <p>
                                Collectors List
                    </p>
                        </div>
                        <div className="tableDiv">

                            <table className="collectorList">
                                <tbody>
                                    {this.state.Collectors.map((x)=>{console.log(x)})}
                                    {this.state.Collectors.map((collector, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="indexNo">
                                                    {index +1}.
                                                </td>
                                                <td key={index}>
                                                    {collector.collectorUserName}
                                                </td>
                                                <td className="buttonTd">
                                                    <button onClick={(ev) => { this.editButton(index) }}>Edit Passcode</button>
                                                </td>
                                                <td className="buttonTd">
                                                    <button key={index}  onClick={(ev) => { this.deleteUser(index, ev) }}>Delete Account</button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div> 
                    : <LoaderDiv />}

            </div>
        )
    }
}
export default withRouter(CollectorListPage)