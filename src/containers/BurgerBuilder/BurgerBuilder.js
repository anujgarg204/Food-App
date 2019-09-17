import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary' 
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'


const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = { 
        ingredients :null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
     }

     componentDidMount(){
           axios.get('https://food-app-cbb1c.firebaseio.com/ingredients.json')
           .then(response => {
                this.setState({ingredients: response.data})
           }).catch(error => {
               this.setState({error: true})
           })
     }

     updatePurchaseState(ingredients){
         const sum = Object.keys(ingredients)
         .map(igKey => {
             return ingredients[igKey]
         }).reduce((sum, el) => {
             return sum+el
         },0);
         this.setState({purchasable: sum > 0})

     }

     addIngredientHandler = (type) => {
         const oldCount = this.state.ingredients[type];
         const updatedCount = oldCount+1;
         const UpdatedIngredients = {
             ...this.state.ingredients
         };
         UpdatedIngredients[type] = updatedCount;
         const priceAddition = INGREDIENTS_PRICES[type]
         const oldPrice = this.state.totalPrice;
         const newPrice = oldPrice + priceAddition;
         this.setState({totalPrice: newPrice, ingredients: UpdatedIngredients})
         this.updatePurchaseState(UpdatedIngredients);
        }

     removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0 ){
            return
        }
        const updatedCount = oldCount-1;
        const UpdatedIngredients = {
            ...this.state.ingredients
        };
        UpdatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENTS_PRICES[type]
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;
        this.setState({totalPrice: newPrice, ingredients: UpdatedIngredients})
        this.updatePurchaseState(UpdatedIngredients);  
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        // alert('You continued')
        this.setState({loading: true})
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
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
            this.setState({loading: false, purchasing: false});
        })
        .catch(err => {
            this.setState({loading: false, purchasing: false});
        })
    }

    render() { 
        const disableInfo = {
            ...this.state.ingredients
        };
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />
        
        if(this.state.ingredients ){
            burger = (
                <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls 
        ingredientAdded = {this.addIngredientHandler}
        ingredientRemoved ={this.removeIngredientHandler}
        disabled = {disableInfo}
        price = {this.state.totalPrice}
        purchasable={this.state.purchasable}
        ordered={this.purchaseHandler}/>
        </Aux> );

       orderSummary =  <OrderSummary 
            price={this.state.totalPrice}
            ingredients = {this.state.ingredients}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}/>
        }

        if(this.state.loading){
            orderSummary = <Spinner />
        }


        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}
 
export default withErrorHandler(BurgerBuilder, axios);