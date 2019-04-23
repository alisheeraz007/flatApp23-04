import React, { Component } from 'react';


class LoaderDiv extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            // <div className="passcodeInputDivs"><div className="loader"></div></div>
            <div className="span adminPasscodeInputDiv">
            <div className="typing_loader"></div>
        </div>
        )
    }
}

export default LoaderDiv