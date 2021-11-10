import React, { Component } from 'react';
import '../product/products.css';

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: 'Hoodies',
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let category = this.state.category;
        this.props.setSearchCategory(category);
    }

    render() {
        return (
            <React.Fragment>
            <div>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <label htmlFor='category'>Choose a filter: </label>
                    <br />
                    <select name='category' value={this.state.category} onChange={this.handleChange}>
                        <option value='Hoodies'>Hoodies</option>
                        <option value='Pants'>Pants</option>
                        <option value='Shirts'>Shirts</option>
                        <option value='Hats'>Hats</option>
                        <option value='Jackets'>Jackets</option>
                    </select>
                    <button className="btn btn-primary scoot-btn" type="submit">Filter</button>
                </form>
            </div>
            </React.Fragment>
        );
    }
}

export default Filter;