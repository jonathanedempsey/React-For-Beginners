import React from "react";

class EditFishForm extends React.Component {
    render() {
        return(
            <div className="fish-edit">
                <input type="text" name="name"></input>
                <input type="text" name="price"></input>
                <select type="text" name="status">
                    <option value="available">Fresh</option>
                    <option value="unavailable">Sold Out</option>
                </select>
                <textarea type="text" name="desc" />
                <input type="text" name="image"></input>
            </div>
        );
    }
}

export default EditFishForm;