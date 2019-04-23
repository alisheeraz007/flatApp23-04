import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


class Values extends Component {
    constructor() {
        super();
    }

    authStateChange=()=>{
        firebase.auth().onAuthStateChanged((user)=> {
            if (user) {
              // User is signed in.
              var uid = user.uid;
              this.setState({
                uid: uid
              })
              // ...
            }
          })
        }

    // getCurrentUid = () => {
    //     const userId = firebase.auth().currentUser.uid;
    //     return userId
    // }


    componentDidMount() {
        let wholeData = "";

        firebase.database().ref(this.state.uid).once('value').then((snapshot) => {
            let wholeDataobj = snapshot.val();
            // console.log(snapshot.val())

            let values = Object.values(wholeDataobj)
            console.log(values)

            this.setState({
                data: values
            }, () => {
                console.log(this.state.data)
            })

        })
    }

    componentWillMount(){
        this.authStateChange()
    }

    //This render is begin called even before props getting updated
    render() {
        return (
            <div>
                <h1>{'This will always render'}</h1>
                {/* {this.state && this.state.data &&
                    <div>{this.state.allAdmins.Ali}</div>
                } */}
            </div>
        )
    }
}


export default Values