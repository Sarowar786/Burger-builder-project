import React, { Component } from 'react';
import Burger from './Burger/Burger';
import Controls from './Controls/Controls';
import {Modal,ModalBody,ModalHeader,ModalFooter,Button} from 'reactstrap';
import Summary from './Summary/Summary';
import Checkout from './../Orders/Checkout/Checkout';
import { Navigate } from 'react-router';
import { Connect } from 'react-redux';
import { addIngredient, updatePurchasable ,removeIngredient} from './../../redux/actionCreators';

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable,
    }
}


export default class BurgerBuilder extends Component {
    state = {
        modalOpen:false,
    }

    updatePurchable = ingredients =>{
        const sum = ingredients.reduce((sum , element) =>{
            return sum + element.amount;
        }, 0);
        this.setState({purchable: sum > 0})
    }

    addIngredientHandle = type => {
        const ingredients = [...this.state.ingredients];
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        for (let item of ingredients) {
            if (item.type === type) item.amount++;
        }
        this.setState({ ingredients: ingredients , totalPrice: newPrice });
        this.updatePurchable(ingredients);
    }
    
    removeIngredientHandle = type => {
        const ingredients = [...this.state.ingredients];
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        for (let item of ingredients) {
            if (item.type === type) {
                if (item.amount <= 0) return;
                item.amount--;
            }
        }
        this.setState({ ingredients: ingredients, totalPrice: newPrice });
        this.updatePurchable(ingredients);
    }

    toggleModal = ()=>{
        this.setState({
            modalOpen:!this.state.modalOpen
        })
    }

    handleCheckout = () => {
        this.setState({
            onClickCheckout: true,
        })

	};
    
    render() {
        return (
            <div>
                <div className="d-flex flex-md-row flex-column">
                    <Burger ingredients={this.state.ingredients} />
                    <Controls
                        ingredientAdded={this.addIngredientHandle}
                        ingredientRemoved={this.removeIngredientHandle}
                        price = {this.state.totalPrice}
                        toggleModal = {this.toggleModal}
                        purchable = {this.state.purchable}
                    />
                </div>
                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader>Our order Summary</ModalHeader>
                    <ModalBody>
                        <h5>Total Price: {this.state.totalPrice.toFixed(0)} BDT </h5>
                    <Summary ingredients ={this.state.ingredients} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color='success' onClick={this.handleCheckout}>Continue to checkout</Button>
                        <Button color='secondary' onClick={this.toggleModal} >Cancle</Button>
                    </ModalFooter>
                    {this.state.onClickCheckout && <Navigate to ="/checkout" replace={true} />}
                </Modal>
            </div>
        )
    }
} 