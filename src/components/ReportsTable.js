import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import LoaderDiv from './loaderDiv'


class ReportsTable extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    componentWillMount() {
        firebase.database().ref().child("zC05cTWvA1Wgg35WJvZGqdbFvR32").child("Year2019").once('value').then((snap) => {
            let wholeData = snap.val()
            let dataValue = Object.values(wholeData)
            let dataKey = Object.keys(wholeData)
            // console.log(dataKey)
            // console.log(dataValue[0])

            this.setState({
                wholeData,
                dataValue,
                dataKey,
            })
        })
    }

    showTable = () => {
        document.getElementById("ButtonDiv").classList += "hide"
        document.getElementById("table").classList = "tableDiv1"
    }
    hideTable = () => {
        document.getElementById("ButtonDiv").className = ""
        document.getElementById("table").classList += " hide"
    }

    printDiv = () => {
        window.frames["print_frame"].document.body.innerHTML = document.getElementById("table").innerHTML;
        window.frames["print_frame"].window.focus();
        window.frames["print_frame"].window.print();
    }

    table = () => {

        let key
        let val
        let tr
        return (
            this.state.dataKey.map((blocks, index) => {
                // console.log(this.state.dataValue[index])
                // console.log(Object.values(this.state.dataValue[index]))
                // console.log(blocks)



                return (
                    <tbody>
                        <tr>
                            <th colSpan="6" style={{ textAlign: "center", borderBottom: "2px solid black" }}> {blocks}</th>
                        </tr>
                        <tr>
                            <th>flat No:</th>
                            <th>Prev balance:</th>
                            <th>curr balance:</th>
                            <th>Total balance:</th>
                            <th>Paid Amount</th>
                            <th>New Balance</th>
                        </tr>
                        {Object.values(this.state.dataValue[index]).map((flat) => {

                            return (
                                <tr>
                                    <td>{flat.recievable.flatNo}</td>
                                    {flat.recievable.previousBalance ? <td>{flat.recievable.previousBalance}</td> : <td></td>}
                                    <td>current balance</td>
                                    {flat.recievable.previousBalance ? <td>{flat.recievable.previousBalance}</td> : <td></td>}
                                    {flat.recieved.paymentRecieved ? <td>{flat.recieved.paymentRecieved}</td> : <td>null</td>}
                                    <td>1000</td>
                                </tr>)
                        })}




                    </tbody>
                )
            })
        )
    }

    render() {

        return (
            <div>
                {this.state.dataValue ?
                    <div className="dashboardDiv">
                        <div id="ButtonDiv">
                            <button type="button" value="Open window" onClick={() => { this.printDiv() }}>Flats Reports</button>
                            <input type="button" value="Show Table" onClick={this.showTable} />
                        </div>
                        <div id="table" className="tableDiv1 hide">
                            <input className="fixed" type="button" value="Hide Table" onClick={this.hideTable} />
                            <table className="ReportsTable" >
                                <tbody>

                                    {this.table()}
                                </tbody>
                            </table>
                            <iframe name="print_frame" width="0" height="0" frameBorder="0" src="about:blank"></iframe>
                        </div>
                    </div>
                    : <LoaderDiv />}
            </div>
        )
    }
}

export default ReportsTable;