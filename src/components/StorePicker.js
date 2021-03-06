import React, { Fragment } from 'react';
import { getFunName } from "../helpers";
import PropTypes from "prop-types";

class StorePicker extends React.Component {
    myInput = React.createRef();

    // Validation
    static propTypes = {
        history: PropTypes.object
    };

    // Option 1 : Since goToStore isn't bound in React by default (because it's custom made by us),
    // we need to bind it so 'this' will work in our StorePicker class
    // constructor() {
    //     super();
    //     console.log("Run");
    //     this.goToStore = this.goToStore.bind(this);
    // }
    // goToStore(event) {
    //     code here..
    // }


    // Option 2: the arrow function will be bound to the instance automatically so it's
    // which also allows us to use 'this'. Much cleaner than option 1
    goToStore = (event) => {
        // 1. Stop form from submitting
        event.preventDefault();

        // 2. Get text from input
        const storeName = this.myInput.current.value;
        console.log(storeName);

        // 3. Change the page to /store/what-ever-they-enetered
        this.props.history.push(`/store/${storeName}`);
    }
    render() {
        return (
            <Fragment>
                { /* goToStore - we dont include () because we dont want it to run on page load */ }
                { /* getFunName() - we include () because we DO want it to run on page load */ }
                <form className="store-selector" onSubmit={this.goToStore}>
                    <h2>Please Enter A Store</h2>
                    <input
                        type="text"
                        ref={this.myInput}
                        required
                        placeholder="Store Name"
                        defaultValue={getFunName()}
                    />
                    <button type="submit">Visit Store</button>
                </form>
            </Fragment>
        )
    }
}

export default StorePicker;
