import React from "react";

class Order extends React.Component {
    render() {
        const orderIds = Object.keys(this.props.order);

        return (
            <div className="order-wrap">
                <h2>Order</h2>
                {orderIds}
                <ul>
                    <li></li>
                </ul>
            </div>
        )
    }
}

export default Order;
