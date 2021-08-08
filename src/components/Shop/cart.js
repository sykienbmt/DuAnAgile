import React, { Component } from 'react';
import ItemCart from './itemCart';
import { Link } from 'react-router-dom'
import { FaStore } from "react-icons/fa";

class cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listFull: [],
            total: '',
            userName: '',
            isShowItemCart: false,
            isShowForm: false,
            name: '',
            phone: '',
            address: '',
            timePassed: false,
            mess: ''
        }
    }

    //Gộp và lấy thông tin sản phẩm
    componentDidMount = () => {
        let show = true;
        let list = [];
        if (localStorage["cart"]) {
            list = JSON.parse(localStorage.getItem("cart"))
        }

        let list2 = [];
        if (localStorage.hasOwnProperty("listProduct")) {
            list2 = JSON.parse(localStorage.getItem("listProduct"))
        }

        var listFull1 = []
        var total1 = null
        for (var i = 0; i < list2.length; i++) {
            for (var j = 0; j < list.length; j++) {
                if (list2[i].id === parseInt(list[j].id)) {
                    listFull1.push({
                        id: list2[i].id,
                        amount: list[j].amount,
                        name: list2[i].name,
                        image: list2[i].image,
                        price: list2[i].price
                    })
                    total1 += list[j].amount * list2[i].price
                }
            }
        }

        if (listFull1.length === 0) show = false
        var user = localStorage.getItem("userName");
        this.setState({
            listFull: listFull1,
            total: total1,
            userName: user,
            isShowItemCart: show
        });
    };


    format_curency = (price) => {
        return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    }


    //Từ id lấy ra thông tin sản phẩm
    getProductFromId = (id) => {
        var list = localStorage.getItem(JSON.parse("listProduct"));
        for (var i = 0; i < list.length; i++) {
            if (list.id === id) {
                return list[i]
            }
        }
    }

    //set lại state và lưu vào local
    setStateSaveCartToLocal(list) {
        this.setState({
            listFull: list
        });
        localStorage.setItem("cart", JSON.stringify(list))
    }

    //xóa sp từ cart
    removeFromCart = (id) => {
        var list = this.state.listFull;
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === id) {
                list.splice(i, 1)
            }
        }
        this.setState({ mess: "Remove Successful!" });
        this.setStateSaveCartToLocal(list)
        this.isShowPopup()
        if (!list.length) this.changeStatusRenderCart()
        // window.location.reload();
    }

    //onchange thay đổi giá khi set lại giá trị số lượng
    onChangeQuantity = (id, quan) => {
        var list = this.state.listFull;
        var totalMoney = 0;
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === id) {
                list[i].amount = quan
            }
            totalMoney += list[i].price * list[i].amount
        }
        this.setState({
            total: totalMoney
        });
        this.setStateSaveCartToLocal(list)
    }


    //hiển thị form thông tin khách hàng nếu đã đăng nhập
    showFormInfo = () => {
        if (this.state.userName !== '') {
            console.log("Đăng nhập thành công");
            return this.changeStatus()
        } else {
            alert("Vui lòng đăng nhập để thực hiện chức năng này !")
        }
    }

    // hiển thị form đặthàng
    changeStatus = () => {
        this.setState({
            isShowForm: !this.state.isShowForm
        })
    }

    changeInput = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        });
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

    //
    changeStatusRenderCart = () => {
        this.setState({
            isShowItemCart: !this.state.isShowItemCart
        })
    }


    //
    submitForm = (event) => {
        event.preventDefault();
        const { txtName, txtPhone, txtAddress } = this.state;

        const item = {};
        item.userId = this.state.userName
        item.name = txtName;
        item.Phone = txtPhone;
        item.address = txtAddress;
        item.list = this.state.listFull
        console.log(item);

        let listOrder = [];
        let string = localStorage.getItem("listOrder");
        if (string === null || JSON.parse(string).length === 0) {
            listOrder.push(item)
            localStorage.setItem("listOrder", JSON.stringify(listOrder))
        } else {
            listOrder = JSON.parse(string)
            listOrder.push(item)
            localStorage.setItem("listOrder", JSON.stringify(listOrder))
            localStorage.removeItem("cart")
        }
        this.setState({
            listFull: [],
            total: 0
        });
        alert("Đặt hàng thành công !")
        this.changeStatus()
        this.changeStatusRenderCart()
    }



    //hiển thị form thông tin đặt hàng
    displayFormOder = () => {
        if (this.state.isShowForm === true) {
            return <div className="formAdd order-form">
                <form className='form-add formCss' onSubmit={(e) => this.submitForm(e)} >
                    <h2>Order Infomation</h2>
                    <label>Name: </label>
                    <input className="inputAll" name="txtName" onChange={(e) => this.changeInput(e)} ></input>

                    <label>Your phone:</label>
                    <input className="inputAll" name="txtPhone" onChange={(e) => this.changeInput(e)}></input>

                    <label>Your address: </label>
                    <input className="inputAll" name="txtAddress" onChange={(e) => this.changeInput(e)}></input>

                    <label>Total price: {this.state.total} $</label>
                    <div className="buttonSave" >
                        <button className="btn btn-admin">Order</button>
                        <button className="btn btn-admin" onClick={this.changeStatus}>Cancel</button>
                    </div>
                </form>
            </div>
        }
    }


    itemCartRender = () => {
        if (this.state.isShowItemCart) {
            return <div>
                <table>
                    <tbody>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                        </tr>
                        {
                            this.state.listFull.map((val, key) => {
                                return <ItemCart
                                    price={val.price} pid={val.id} name={val.name} image={val.image}
                                    idProduct={val.id}
                                    key={key}
                                    quan={val.amount}
                                    onClickRemove={this.removeFromCart}
                                    onChangeQuan={this.onChangeQuantity}
                                >
                                    {val.name}
                                </ItemCart>
                            })
                        }

                    </tbody>
                </table>
                <div className="total-price">
                    <table>
                        <tbody>
                            <tr>
                                <td>Total:</td>
                                <td>{this.state.total} $</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="button-buy-css">
                    <button className="btn btn-buy-cart" onClick={this.showFormInfo}>Buy</button>
                </div>
            </div>
        } else {
            return <div className="emptyCart">
                <h3>Your cart is empty</h3>
                <h3>Please go back and choose your favorite product</h3>
                <Link to="/products" className="back-to-shop"><FaStore /></Link>
            </div>
        }
    }


    render() {
        return (
            <div className="small-container cart-page">
                {this.showPopup("Xóa thành công")}
                {this.displayFormOder()}
                <p className="welcomeTitle">Xin Chào...{this.state.userName} !</p>
                <h1 className="cart-title">Welcome to your cart</h1>
                {this.itemCartRender()}
            </div>
        );
    }
}

export default cart;
