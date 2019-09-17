import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends Component {
    state = { 
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false,
     }

     orderHandler = (event) => {
        event.preventDefault();
        // alert('You continued')
        this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Greg',
                address: {
                    street: 'G3s ke pass',
                    zipCode: '132113',
                    country: 'Uganda'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
        .then(res => {
            this.setState({loading: false});
            this.props.history.push('/')
        })
        .catch(err => {
            this.setState({loading: false});
        })
     }
 
    render() { 
        let form = (
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Name" />
                    <input className={classes.Input} type="email" name="email" placeholder="Email" />
                    <input className={classes.Input} type="text" name="street" placeholder="Street" />
                    <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>
        );
        if(this.state.loading){
            form = <Spinner />
        }
        return ( 
            <div className={classes.ContactData}>
                <h4>Almost There</h4>
                {form}
            </div>
         );
    }
}
 
export default ContactData;