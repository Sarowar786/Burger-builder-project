import React from 'react';
import Ingredient from '../Ingredient/Ingredient';
import './Burger.css';

const Burger = props => {
    let ingredientArr = props.ingredients.map(item =>{
        let anountArr = [...Array(item.amount).keys()]
        return anountArr.map(_ =>{
            return<Ingredient type={item.type} kyes={Math.random()} />
        }) 
    })
    .reduce((arr,element) =>{
        return arr.concat(element);
    }, []);
        if(ingredientArr.length ===0){
            ingredientArr = <p>Please add some ingredients</p>
        }

    // console.log(ingredientArr);
    return (
        <div className='Burger'>
            <Ingredient type='bread-top' />
            {ingredientArr}
            <Ingredient type='bread-bottom' />
        </div>
    );
};

export default Burger;