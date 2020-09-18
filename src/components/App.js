import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from '../base';

class App extends React.Component {
    // Set empty state on App load
    state = {
        fishes: {},
        order: {}
    };


    // Executes after component is fully rendered
    componentDidMount() {
        const { params } = this.props.match;

        // First reinstate our local storage.
        const localStorageRef = localStorage.getItem(params.storeId);

        // If a local storage value existed, then reinstate it
        if(localStorageRef) {
            // String to Object
            this.setState({ order: JSON.parse(localStorageRef) });
        }

        // Sync fishes with this specific store name
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: "fishes"
        });
    }

    // Trigger when order is added.
    // Store the user's order in local storage
    componentDidUpdate() {
        console.log(this.state.order);
        // Object to String
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    }

    // Memory leak fix!
    // Stop listening for changes if the app is exited
    componentWillUnmount() {
        base.removeBinding(this.ref);
    }



    addFish = (fish) => {
        console.log("Adding a fish!");
        // Need to use existing State functionality in React or won't work
        // 1. Take copy of existing state. We never want to reach in to state and modify it directly (Mutation)
        const fishes = { ...this.state.fishes }; // Object spread

        // 2. Add new fish to that fishes variable
        // Rather than use imcrementing numbers for unique IDs, use the time by milliseconds
        fishes[`fish${Date.now()}`] = fish;

        // 3. Set the new fishes object to state
        this.setState({
            // If property and value are the same we can just type it out once
            // fishes: fishes
            fishes
        });
    }

    updateFish = (key, updatedFish) => {
        // 1. Take copy of current state
        const fishes = { ...this.state.fishes };

        // 2. Update that state
        fishes[key] = updatedFish;

        // 3. Set that to state
        this.setState({ fishes }); // or fishes: fishes
    }

    loadSampleFishes = () => {
        this.setState({
            fishes: sampleFishes
        });
    }

    addToOrder = (key) => {
        // Take a copy of state
        const order = { ...this.state.order };

        //Either add to order or update number of order
        order[key] = order[key] + 1 || 1;

        // Call setState to update our state object
        this.setState({ order }); // order:order
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="fishes">
                        { /* Map over all our fishes in state with a unique key for each */ }
                        {Object.keys(this.state.fishes).map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} /> )}
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order} />
                <Inventory
                    addFish={this.addFish}
                    updateFish={this.updateFish}
                    loadSampleFishes={this.loadSampleFishes}
                    fishes={this.state.fishes} />
            </div>
        )
    }
}

export default App;
