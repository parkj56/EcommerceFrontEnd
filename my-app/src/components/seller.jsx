import React from "react";
import "./seller.css"
import axios from 'axios';
import useForm from './userForm';
import { useHistory } from "react-router-dom";


const Seller = () => {

    const { formValues, handleChange, handleSubmit } = useForm(submitProduct)
    const history = useHistory();

    function submitProduct(){
        let priceAsNumber = parseFloat(formValues.price);
        let newProduct = {
            name: formValues.name,
            category: formValues.category,
            description: formValues.description,
            price: priceAsNumber
        }
        createProduct(newProduct);
    }

    
    const createProduct = async (productObject) => {
        try{
            let newProduct = productObject;
            const jwt = localStorage.getItem('token');
            await axios.post("https://localhost:44394/api/products", newProduct, { headers: {Authorization: 'Bearer ' + jwt}});
            history.push('/')
        }
            
        catch(ex){
            console.log('Error in createProduct API call', ex)
        }
    }
    
    return (
        <div className="body">
            <div className= 'container'>
                <div className ="title">Create a Product Listing</div>
                <form className = "-container" onSubmit={handleSubmit}>
                    <div className ="user-details">
                        <div className="input-box">
                            <span className="details">Product Name</span>
                            <input type='text' name='name' value={formValues.name} onChange={handleChange}/>
                        </div>
                        <div className="input-box">
                            <span className="details">Category</span>
                            <select name='category' value={formValues.category} onChange={handleChange}>
                                <option value=""></option>
                                <option value="Hoodies">Hoodies</option>
                                <option value="Pants">Pants</option>
                                <option value="Shirts">Shirts</option>
                                <option value="Hats">Hats</option>
                                <option value="Jackets">Jackets</option>
                            </select>
                        </div>
                        <div className="input-box">
                            <span className="details">Description</span>
                            <input type='text' name='description' value={formValues.description} onChange={handleChange}/>
                        </div>
                        <div className="input-box">
                            <span className="details">Price</span>
                            <input type="number" min="1" id="number" name="price" value={formValues.price} onChange={handleChange}/>
                        </div>
                        <button className="button" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default Seller;