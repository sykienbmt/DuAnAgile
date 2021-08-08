import React, { Component } from 'react';

class itemCart extends Component {
    format_curency = (price) => {
        return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    }

    //truyền id sp cần xóa về component cha
    removeFromCart =()=>{
        this.props.onClickRemove(this.props.pid)
    }

    //truyền id và giá trị sửa đổi về component cha
    changeInput = (event) => {
        this.props.onChangeQuan(this.props.pid,event.target.value)
    }

    render() {
        return (
            <tr>
                <td>
                    <div className="cart-info">
                        <img src={this.props.image} alt=''/>
                        <div>
                            <p>Name : {this.props.name}</p>
                            <small>Price: ${this.props.price}</small>
                            <br />
                            <p className="removeItemCart" onClick={this.removeFromCart}>Remove</p>
                        </div>
                    </div>
                </td>
                <td><input type="number" 
                        defaultValue={this.props.quan} 
                        onChange={(event)=>this.changeInput(event)}
                        name="input"
                        min={1}
                    /></td>
                <td>${this.format_curency(this.props.quan*this.props.price)}</td>
            </tr>
        );
    }
}

export default itemCart;