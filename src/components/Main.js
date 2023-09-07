
import React from 'react';
import Header from './Header/Header';
import BurgerBuilder from './Burger builder/BurgerBuilder';
import { Route,Routes } from 'react-router-dom';
import Orders from './Orders/Orders';
import Checkout from './Orders/Checkout/Checkout';


const Main = props => {
    return (
        <div>
            <Header />
            <div className='container' >
                <Routes> 
                    <Route path='/orders' element={<Orders/>}/>
                    <Route path='/checkout' element={<Checkout/>} />
                    <Route path='/' exact element={<BurgerBuilder/>} />
                </Routes>
                
            </div>
        </div>
    );
};

export default Main;