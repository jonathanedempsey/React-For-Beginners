import React from "react";
import PropTypes from "prop-types";
import firebase from 'firebase';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { firebaseApp } from "../base";



class Inventory extends React.Component {
    // Validation
    static propTypes = {
        fishes: PropTypes.object,
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        loadSampleFishes: PropTypes.func
    };

    // On page load, set owner and uid to null
    state = {
        uid: null,
        owner: null
    };

    // Each time we load the page, check if the user was already logged in.
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            // If they are, pass the user to our authHandler which checks if they're the owner
            if(user) {
                this.authHandler({ user });
            }
        });
    }

    authHandler = async (authData) => {
        // console.log(authData);
        // 1. Look up current store in the firebase database
        // fetch() will return a promise. Put await in front of it to get the store name variable instead
        const store = await base.fetch(this.props.storeId, { context: this });
        // console.log(store);

        //2. Claim it if there is no owner
        if(!store.owner) {
            // Save it as our own
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            });
        }

        // 3. Set the state of inventory component to reflect the current user
        // Find the current logged in user and find the store owner, if the same user allow access to Inventory
        // Otherwise give user error saying they aren't the store owner
        this.setState({
            uid:authData.user.uid,
            owner: store.owner || authData.user.uid
        });

    }

    authenticate = provider => {
        // Dynimcally look up function name of clicked provider
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
    }

    logout = async () => {
        // Wait for user to be logged out of firebase first
        await firebase.auth().signOut();

        // Then clear user ID from state
        this.setState({ uid: null });
    }

    render() {
        const logout = <button onClick={this.logout}>Logout</button>

        // 1. Check if user is logged in
        if(!this.state.uid) {
            // If not logged in, load login buttons
            return <Login authenticate={this.authenticate} />
        }

        // 2. Check if they are not the store owner
        if(this.state.uid !== this.state.owner) {
            // If the state user ID and Store owner ID dont match, print error
            return (
                <div>
                    <p>Sorry, you are not the owner</p>
                    {logout}
                </div>
            );
        }

        // 3. No objections, they must be the owner. Just render the inventory
        return (
            <div className="inventory">
                <h2>Inventory</h2>
                {logout}
                {Object.keys(this.props.fishes).map(key => (
                    <EditFishForm
                        key={key}
                        index={key}
                        fish={this.props.fishes[key]}
                        updateFish={this.props.updateFish}
                        deleteFish={this.props.deleteFish} />
                ))}
                <AddFishForm addFish={this.props.addFish} />
                <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
            </div>
        );
    }
}

export default Inventory;
