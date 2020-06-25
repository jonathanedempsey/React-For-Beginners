import React, { Fragment } from 'react';
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
    goToStore(event) {
        // 1. Stop form from submitting
        event.preventDefault();

        // 2. Get text from input
        // 3. Change the page to /store/what-ever-they-enetered
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
