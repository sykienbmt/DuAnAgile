import React, { Component } from 'react';
import {Route, Switch} from "react-router-dom";
import home from './../Home/Home'
import account from './../Contact/account'
import Products from './../Shop/Products'
import cart from './../Shop/cart'
import Error from './../Error/Error';
import productDetail from '../Shop/ProductDetailItem';
import productsAdmin from '../Admin/ProductsAdmin'

class Url extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={home} />
                <Route path="/products" component={Products} />
                <Route path="/account" component={account} />
                <Route path="/productDetail/:id/:slug.html" component={productDetail} />
                <Route path="/cart" component={cart} />
                <Route path="/productsAdmin" component={productsAdmin} />
                <Route component={Error} />
            </Switch>
        );
    }
}

export default Url;