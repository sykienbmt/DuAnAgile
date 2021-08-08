import React, { Component } from 'react';
import Comment from './comment';
class productDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timePassed: false,
            mess: "Add to cart successful!"
        }
    }



    format_curency = (price) => {
        return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    }

    //Thêm vào giỏ hàng
    addProductToCart = () => {
        var idAdd = this.props.match.params.id;
        var list = this.getListFromCart();

        if (list.length === 0 || this.isExistOnCart(idAdd) === -1) {
            list.push({
                id: idAdd,
                amount: 1
            })

        } else {
            list[this.isExistOnCart(idAdd)].amount += 1
        }
        this.isShowPopup()
        this.setListToCart(list)
    }


    //Kiểm tra xem đã có sản phẩm trong giỏ chưa trả về vị trí
    isExistOnCart = (id) => {
        var list = this.getListFromCart();
        var myIndex = list.findIndex(function (user) {
            return user.id === id;
        });
        return myIndex
    }

    //Lấy ds sp từ cart
    getListFromCart = () => {
        let list = [];
        if (localStorage["cart"]) {
            list = JSON.parse(localStorage.getItem("cart"))
        }
        return list;
    }

    //đưa ds vào list cart
    setListToCart = (list) => {
        localStorage.setItem("cart", JSON.stringify(list))
    }

    //hiển thị popup
    isShowPopup = () => {
        this.setState({ timePassed: !this.state.timePassed })
        setTimeout(() => { this.setState({ timePassed: false }) }, 3000);
    }

    showPopup = () => {
        if (this.state.timePassed) {
            return (
                <div className="popup-mess">
                    {this.state.mess}
                </div>
            );
        }
    }


    render() {
        var pid = parseInt(this.props.match.params.id);
        var list = JSON.parse(localStorage.getItem("listProduct"));
        return (
            <div>
                {this.showPopup()}
                {
                    list.map((value, index) => {
                        if (value.id === pid) {
                            return <div className="small-container single-product" key={index}>
                                <div className="row">
                                    <div className="col-2">
                                        <img src={value.image} width="100%" id="productImg" alt="" />
                                    </div>
                                    <div className="col-2">
                                        <p>Home / T-Shirt</p>
                                        <h1>{value.name}</h1>
                                        <h4>{this.format_curency(value.price)} $</h4>
                                        <select>
                                            <option>Select Size</option>
                                            <option>XXL</option>
                                            <option>XL</option>
                                            <option>Large</option>
                                            <option>Medium</option>
                                            <option>Small</option>
                                        </select><input type="number" defaultValue="1" />
                                        <button to="/" className="btn" onClick={this.addProductToCart}>Add To Card</button>
                                        <h3>Product Detail
                                            <i className="fa fa-indent" />
                                        </h3>
                                        <br />
                                        <p>Surrounded affronting favourable no mr. Lain knew like half she yet joy. Be than dull as seen
                                            very shot. Attachment ye so am travelling estimating projecting is. Off fat address attacks his
                                            besides. Suitable settling mr attended no doubtful feelings. Any over for say bore such sold
                                            five but hung</p>
                                    </div>
                                </div>
                                <Comment urlWeb={this.props.match.url} />
                            </div>
                        }
                        return "";
                    })
                }
            </div>

        );
    }
}

export default productDetail;