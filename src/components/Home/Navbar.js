import React, { Component } from 'react';
import { Link } from "react-router-dom";

class navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    componentDidMount = () => {
        var list = JSON.parse(localStorage.getItem("cart"))
        this.setState({ count: list.length });
    }

    render() {
        return (
            <div className="header">
                <div className="container">
                    <div className="navbar">
                        <div className="logo">
                            <img src="/images/logo.png" width="125px" alt='' />
                        </div>
                        <nav>
                            <ul id="MenuItems">
                                <li><Link to="/" alt=''>Home</Link></li>
                                <li><Link to="/products">Products</Link></li>
                                <li>About</li>
                                <li>Contact</li>
                                <li><Link to="/account">Account</Link></li>
                            </ul>
                        </nav>
                        <Link to="/productsadmin"><img src="/images/admin2.png" width="30px" alt='' height="30px" className="icon-admin" /></Link>
                        <Link to="/cart" className="icon-cart"><img src="/images/cart.png" width="30px" alt='' height="30px" />
                            <div className='cart-count'>{this.state.count}</div>
                        </Link>
                        <img src="/images/menu.png" className="menu-icon" alt='' />
                    </div>
                </div>
            </div>
        );
    }
}

export default navbar;