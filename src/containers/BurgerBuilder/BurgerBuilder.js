import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary' 
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = { 
        ingredients :{
            salad: 1,
            bacon: 0,
            cheese: 0,
            meat: 1
        },
        totalPrice: 4
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
    }


    render() { 
        const disableInfo = {
            ...this.state.ingredients
        };
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }
        return (
            <Aux>
            <Burger ingredients={this.state.ingredients}/>
            <BuildControls 
            ingredientAdded = {this.addIngredientHandler}
            ingredientRemoved ={this.removeIngredientHandler}
            disabled = {disableInfo}/>
            </Aux>
        );
    }
}
 
export default BurgerBuilder;