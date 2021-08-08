import React, { Component } from 'react';

class orderForm extends Component {
    render() {
        return (
            <div className="formAdd order-form">
                    <form className='form-add formCss' onSubmit={(e)=>this.submitForm(e)} >
                        <h2>Order Infomation</h2>
                        <label>Name: </label>
                        <input className="inputAll" name="txtName" onChange={(e)=>this.changeInput(e)} ></input>

                        <label>Price: </label>
                        <input className="inputAll" name="txtPrice" onChange={(e)=>this.changeInput(e)} ></input>

                        <label>Image: </label>
                        <input className="inputAll" name="txtImage" onChange={(e)=>this.changeInput(e)}></input>
                        <div className="buttonSave" >
                            <button className="btn btn-admin">Order</button>
                            <button className="btn btn-admin" onClick={this.changeStatus}>Cancel</button>
                        </div>
                    </form>
                </div>
        );
    }
}

export default orderForm;