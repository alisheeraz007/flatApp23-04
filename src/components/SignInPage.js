import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { changePath } from '../common/index'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import LoaderDiv from './loaderDiv';

class SignInPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loader: false
    }
  }

  getttingValueFromInput = (ev) => {
    this.setState({
      [ev.target.name]: ev.target.value
    }, (ev) => {
      // console.log(this.state)
    })
  }
  validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  checkValidation = () => {
    if (this.state.email && this.state.password) {
      let emailCheck = this.validateEmail(this.state.email)
      if (emailCheck) {
        this.setState({
          loader: false
        })
        return true
      } else {
        this.props.openHiddenDiv("Invalid Email Adress")
        setTimeout(() => {
          this.setState({
            loader: false
          })
          document.getElementById("alertDiv").classList += " redAlert"
        }, 350);
      }
    } else {
      // return alert("email and password could not be empty")
    }
  }

  signIn = (ev) => {
    ev.preventDefault()
    this.setState({
      loader: true
    },()=>{})
    // console.log(this.props)
    let validition = this.checkValidation()
    if (validition) {
      // console.log("true")
      firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          this.setState({
            loader: false
          })
          this.props.authStateChange()
          // console.log(res)
          this.props.history.push("/MainDashBoard")
          this.props.openHiddenDiv("Successfully Logged In")
        })
        .catch((e) => {
          this.setState({
            loader: false
          })
          this.props.openHiddenDiv(e.message)
          setTimeout(() => {
            document.getElementById("alertDiv").classList += " redAlert"
          }, 350);
        })
    }
  }

  render() {
    // console.log(this.props)
    return (
      <div>

      {this.state.loader ? <LoaderDiv /> : null}
      <div className="mainContainer">
        <div className="head">
          <p>Sign In</p>
        </div>
        <div className="allInput">
          <form onSubmit={this.signIn}>
            <input
              onChange={(ev) => { this.getttingValueFromInput(ev) }}
              type="text"
              placeholder="Email"
              name="email"
              required
              autoFocus
              />
            <input
              onChange={(ev) => { this.getttingValueFromInput(ev) }}
              type="password"
              placeholder="Password"
              name="password"
              required
              />
            <button name="MainDashBoard">Sign In</button>
          </form>
          <div className="forSignUp">
            <p>Don't have Account ?? <Link to="/SignUpPage" className="signUp">Sign Up!</Link><br />
              <Link to="/ResetPasswordPage" className="forGetPass">Forget Password !! </Link></p>
          </div>
        </div>
      </div>

</div>

);
}
}

export default withRouter(SignInPage);
