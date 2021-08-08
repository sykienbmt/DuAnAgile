import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Featured_Products extends Component {
    render() {
        return (
            <div className="col-4">
                <NavLink to="/products_detal.html"><img src={this.props.image} alt='' /></NavLink>
                <NavLink to="/products_detal.html"><h4>{this.props.title}</h4></NavLink>
                <div className="rating">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star-o" />
                </div>
                <p>{this.props.price}</p>
            </div>
        );
    }
}

export default Featured_Products;