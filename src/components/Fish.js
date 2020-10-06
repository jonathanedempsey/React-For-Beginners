import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";

class Fish extends React.Component {
    // If we're in a class we use static!
    // Use shape() for validating obejcts
    static propTypes = {
        details: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            desc: PropTypes.string,
            status: PropTypes.string,
            price: PropTypes.number
        }),
        addToOrder: PropTypes.func,
    }

    handleClick = () => {
        // Run addToOrder with current fish's key
        this.props.addToOrder(this.props.index);
    }

    render() {
        const {image, name, price, desc, status} = this.props.details;
        const isAvailable = status === 'available'; // Boolean

        return (
            <li className="menu-fish">
                <img src={image} alt={name} />
                <h3 className="fish-name">{name}
                    <span className="price">{formatPrice(price)}</span>
                </h3>
                <p>{desc}</p>
                <button disabled={!isAvailable} onClick={this.handleClick}>{isAvailable ? "Add To Order" : "Sold Out!"}</button>
            </li>
        );
    }
}

export default Fish;
