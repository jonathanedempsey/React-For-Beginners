import React from "react";

class AddFishForm extends React.Component {
    render() {
        return (
            <form className="fish-edit">
                <input name="name" type="type" placeholder="Name" />
                <input name="price" type="type" placeholder="Price" />
                <select name="status">
                    <option value="available">Fresh</option>
                    <option value="unavailable">Sold Out</option>
                </select>
                <textarea name="desc" placeholder="Desc" />
                <input name="image" type="type" placeholder="Image" />
                <button type="submit">+ Add Fish</button>
            </form>
        );
    }
}

export default AddFishForm;
