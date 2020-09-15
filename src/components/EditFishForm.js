import React from "react";

class EditFishForm extends React.Component {
    render() {
        return(
            <div className="fish-edit">
                <input type="text" name="name" value={this.props.fish.name}></input>
                <input type="text" name="price" value={this.props.fish.price}></input>
                <select type="text" name="status" value={this.props.fish.status}>
                    <option value="available">Fresh</option>
                    <option value="unavailable">Sold Out</option>
                </select>
                <textarea type="text" name="desc" value={this.props.fish.desc} />
                <input type="text" name="image" value={this.props.fish.image}></input>
            </div>
        );
    }
}

export default EditFishForm;