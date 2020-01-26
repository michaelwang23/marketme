import React, { Component } from 'react';
import fire from './fire';
import 'bootstrap/dist/css/bootstrap.min.css';
import Business from './Business'
import Influencer from './Influencer'

class Home extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = {
            listOfBusinesses : [],
            title: [],
        story: [],
        date: [],
        post: '',
        selection: null
        }
    }


    findList = () => {
        const rootRef = fire.database().ref();
        const post = rootRef.child('businesses').orderByKey();
        post.once('value', snap => {
            snap.forEach(child => {
                // console.log(child.val())
                this.setState({
                    title: this.state.title.concat([child.val().business]),
                    story: this.state.story.concat([child.val().businessRep])
                });
     
                const postList = this.state.date.map((dataList, index) =>
                     <p>
                         {dataList}
                         <br />
                         {this.state.title[index]}
                         <br />
                         {this.state.story[index]}
                         <hr />
                     </p>
     
                 );
                 console.log(this.state.title)
     
                 this.setState({
                     post: postList
                 });
        });
        })
    }

    seeMore = (selection) => {
        var that = this;
        
        fire.database().ref('businesses').once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null);
            if (exists) {
                var data = snapshot.val()
                for (var business in data){
                    that.seeMore2(business, selection)
                }
            }
        })
    }

    seeMore2 = (business, selection) => {
        var that = this
        fire.database().ref('businesses').child(business).once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null);
            if (exists) {
                var data = snapshot.val()
                if (data.business === selection){
                    that.setState({
                        selection: data.businessRep
                    })
                }
            }
        })
    }

    checkType = () => {
        var that = this;
        var userid = fire.auth().currentUser.uid;
        fire.database().ref('influencers').once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null);
            if (exists) {
                var data = snapshot.val()
                for (var business in data){
                    console.log(business)
                    if (business === userid){
                        that.findList()
                    }
                }
            }
        })
        fire.database().ref('businesses').once('value').then(function(snapshot){
            const exists = (snapshot.val() !== null);
            if (exists) {
                var data = snapshot.val()
                for (var business in data){
                    console.log(business)
                    if (business === userid){
                        that.findBusinessList()
                    }
                }
            }
        })

    }

    componentDidMount = () => {
        // console.log("mount")
        // this.checkType()
    //    this.findList()
    }


    logout() {
        fire.auth().signOut();
    }

    render() {
        const listOfBusinessesList = this.state.title.map(position => 
            <div>
                <h1>{position}</h1>
                <button type="submit" onClick = {() => this.seeMore(position)} class="btn btn-primary">See more</button>
            </div>
        );
        return (
            // <div> 
            //     <ul>{listOfBusinessesList}</ul>
            //     <div>{this.state.selection == null ? <label> No Selection </label> : <label> Contact {this.state.selection} </label>}</div>
            //     {/* <label> Connect with businesses, non-profits, and organizations </label>
            //      <div>  </div>
            //     <button type="submit" onClick={this.logout} class="btn btn-primary">Sign Out</button>
            //     <button type="submit" onClick={this.findBusinesses} class="btn btn-primary">Refresh</button> */}
            //     <button type="submit" onClick={this.logout} class="btn btn-primary">Sign Out</button>

            // </div>
            (<Influencer />)
           
        );
    }
}
            
export default Home;
            