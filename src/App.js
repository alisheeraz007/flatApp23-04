import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, withRouter } from 'react-router-dom'
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import ResetPasswordPage from './components/ResetPasswordPage';
import MainDashBoard from './components/MainDashBoardPage';
import AdminPannelPage from './components/AdminPannelPage';
import AddBlockFlatsPage from './components/AddBlockFlatsPage';
import AddCollectorPage from './components/AddCollectorPage';
import ExpensePannelPage from './components/ExpensePannelPage';
import CollectorPannelPage from './components/CollectorPannelPage';
import CreateAdminPage from './components/CreateAdminPage';
import HiddenPasscodeDiv from './components/HiddenPasscodeDiv';
import Values from './components/gettingValues'
import CollectorListPage from './components/CollectorListPage'
import LoaderDiv from './components/loaderDiv'
import NotLogin from './components/NotLoginPage'
import ReportsPannelPage from "./components/ReportsPannelPage"
import FlatsBalancePage from "./components/FlatsBalancePage"
import config from './config/configKey'
import firebase from 'firebase/app'
import AlertDiv from './components/alertDiv'
import './all.css';
import ReportsTable from './components/ReportsTable';

firebase.initializeApp(config);


class App extends Component {
  constructor() {
    super();
    this.state = {
      hiddenDiv: false,
      adminConfimation: false,
      collectorConfimation: false,
      private: false,

    }
  }

  authStateChange = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        var uid = user.uid;
        this.setState({
          uid: uid,
          private: true,
        })
        // ...
      }


    })
  }
  componentWillMount() {
    this.authStateChange()
  }
  settingAdminCollectorState = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  openHiddenDiv = (props) => {
    // console.log(props)
    this.setState({
      hiddenDiv: true,
      headerName: props
    }, () => {


      setTimeout(() => {

        let alertDiv = document.getElementById("alertDiv")

        alertDiv.className = "alertDivShow"

        setTimeout(() => {
          alertDiv.className = "alertDivHide"
        }, 1500)

      }, 300)
    })
  }

  render() {
    // console.log(this.authStateChange())
    return (
      <div>
        {this.state.hiddenDiv ? <AlertDiv props={this.props} headerName={this.state.headerName} /> : null}

        <Router>
          <div>
            <Route
              exact path="/"
              render={() => <SignInPage
                state={this.state}
                openHiddenDiv={this.openHiddenDiv}
                authStateChange={this.authStateChange}
              />} />
            <Route
              path="/SignUpPage"
              render={(props) => <SignUpPage
                state={this.state}
                openHiddenDiv={this.openHiddenDiv}
              // authStateChange={this.authStateChange}
              />} />

            <Route
              path="/ResetPasswordPage"
              render={(props) => <ResetPasswordPage
                state={this.state}
                openHiddenDiv={this.openHiddenDiv}
              // authStateChange={this.authStateChange}
              />} />
          </div>

          <Route path="/NotLoginPage" component={NotLogin}></Route>

          {/* {this.state.private ? */}
          <div>

            <Route path="/MainDashBoard"
              render={(props) => <MainDashBoard
                state={this.state}
                openHiddenDiv={this.openHiddenDiv}
                settingAdminCollectorState={this.settingAdminCollectorState}
              // authStateChange={this.authStateChange}
              />} />

            {/* {this.state.collectorConfimation ? */}

            <div>
              <Route
                path="/CollectorPannelPage"
                render={(props) => <CollectorPannelPage
                  state={this.state}
                  openHiddenDiv={this.openHiddenDiv}
                // authStateChange={this.authStateChange}
                />} />
            </div>
            {/* : null} */}

            <Route
              path="/CreateAdminPage"
              render={(props) => <CreateAdminPage
                state={this.state}
                openHiddenDiv={this.openHiddenDiv}
              // authStateChange={this.authStateChange}
              />} />

            {/* {this.state.adminConfimation ? */}
            <div>
              <Route
                path="/AdminPannelPage"
                render={(props) => <AdminPannelPage
                  state={this.state}
                  openHiddenDiv={this.openHiddenDiv}
                />} />

              <Route
                path="/AddBlockFlatsPage"
                render={() => <AddBlockFlatsPage
                  state={this.state}
                  openHiddenDiv={this.openHiddenDiv}
                // authStateChange={this.authStateChange}
                />} />

              <Route
                path="/AddCollectorPage"
                render={() => <AddCollectorPage
                  state={this.state}
                  openHiddenDiv={this.openHiddenDiv}
                // authStateChange={this.authStateChange}
                />} />

              <Route
                path="/CollectorListPage"
                render={() => <CollectorListPage
                  state={this.state}
                  openHiddenDiv={this.openHiddenDiv}
                />} />

              <Route
                path="/ExpensePannelPage"
                render={() => <ExpensePannelPage
                  state={this.state}
                  openHiddenDiv={this.openHiddenDiv}
                // authStateChange={this.authStateChange}
                />} />

              <Route
                path="/HiddenPasscodeDiv"
                render={() => <HiddenPasscodeDiv
                  state={this.state}
                  openHiddenDiv={this.openHiddenDiv}
                // authStateChange={this.authStateChange}
                />} />

              <Route path="/gettingValues" component={Values} />

              <Route
                path="/ReportsPannelPage"
                render={() => <ReportsPannelPage
                  state={this.state}
                  openHiddenDiv={this.openHiddenDiv}
                // authStateChange={this.authStateChange}
                />} />

              <Route
                path="/FlatsBalancePage"
                render={() => <FlatsBalancePage
                  state={this.state}
                  openHiddenDiv={this.openHiddenDiv}
                // authStateChange={this.authStateChange}
                />} />


              <Route
                path="/ReportsTable"
                render={() => <ReportsTable
                  state={this.state}
                  openHiddenDiv={this.openHiddenDiv}
                // authStateChange={this.authStateChange}
                />} />
            </div>
            {/* : null
                // window.location.pathname === "/"
                //   || window.location.pathname === "/SignUpPage"
                //   || window.location.pathname === "/ResetPasswordPage"
                //   || window.location.pathname === "/MainDashBoard" ? null : <NotLogin />
              } */}
          </div>
          {/* :
            // null
            window.location.pathname === "/"
              || window.location.pathname === "/SignUpPage"
              || window.location.pathname === "/ResetPasswordPage" ? null : <NotLogin />


          } */}


          {/* <Values/> */}
          {/* <SignUpPage/> */}
          {/* <ResetPasswordPage/> */}
          {/* <MainDashBoard/> */}
          {/* <AdminPannelPage/> */}
          {/* <AddBlockFlatsPage/> */}
          {/* <AddCollectorPage/> */}
          {/* <ExpensePannelPage/> */}
          {/* <CollectorPannelPage/> */}
        </Router>
      </div>
    );
  }
}
export default App;
