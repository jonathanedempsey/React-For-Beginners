import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";

class App extends React.Component {
    // Set empty state on App load
    state = {
        fishes: {},
        order: {}
    };

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
                <Order />
                <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes} />
            </div>
        )
    }
}

export default App;
