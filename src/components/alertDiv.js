import React, { Component } from 'react';


class AlertDiv extends Component {
    constructor(props) {
        super(props)
    }



    

    render() {
        return (

            <div id="alertDiv" className="alertDivHide">
                <p>
                 
                    {   this.props.headerName}
                </p>
                <form>
                    {/* <button onClick={(props)=>this.goback(props)}>Ok</button> */}
                </form>
            </div>
        )
    }
}

export default AlertDiv;