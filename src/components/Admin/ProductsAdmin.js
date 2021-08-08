import React, { Component } from 'react';
import ItemProducts from './ProductsItem';
import ListProduct from '../Json/ListProduct.json'
import { FaSave } from 'react-icons/fa'
const { v4: uuidv4 } = require('uuid');

class form extends Component {
    constructor(props) {
        super(props);
        this.componentDidMount()
        this.state = {
            txtImage: '',
            txtName: '',
            txtPrice: '',
            userData: [],
            // isShowPopup: false,
            timePassed: false,
            mess: ''
        }
    }

    //Load sản phẩm từ local
    componentDidMount = () => {
        let list = [];
        let string = localStorage.getItem("listProduct");
        if (string === null || JSON.parse(string).length === 0) {
            list = ListProduct
            localStorage.setItem("listProduct", JSON.stringify(ListProduct))
        } else { list = JSON.parse(string) }
        this.setState({ userData: list });
    };

    //lấy giá trị từ ô input khi thay đổi giá trị
    changeInput = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({ [name]: value });
    }

    //Xóa sản phẩm 
    deleteProduct = (id) => {
        var list = JSON.parse(localStorage.getItem("listProduct"));
        for (let i = 0; i < list.length; i++) {
            if (list[i].id === id) {
                list.splice(i, 1)
            }
        }
        this.setState({ mess: "Delete Successful !" });
        this.isShowPopup()
        this.saveListToLocal(list);
    }

    //Sửa sản phẩm
    editProduct = (id, name, image, price) => {
        var list = JSON.parse(localStorage.getItem("listProduct"));
        list.forEach(item => {
            if (item.id === id) {
                item.image = image;
                item.name = name;
                item.price = price;
            }
        });
        this.setState({ mess: "Update Successful !" });
        this.isShowPopup()
        this.saveListToLocal(list);
    }

    //lấy giá trị input
    submitForm = (event) => {
        event.preventDefault();
        const { txtName, txtPrice, txtImage } = this.state;

        const item = {};
        item.id = uuidv4();;
        item.image = txtImage;
        item.name = txtName;
        item.price = txtPrice;

        this.addAction(item)
        console.log(item);
    }

    addAction = (item) => {
        var list = JSON.parse(localStorage.getItem("listProduct"));
        list.push(item)
        this.setState({ mess: "Add Successful !" });
        this.isShowPopup()
        this.saveListToLocal(list);
    }

    //format định dạng giá cho dễ nhìn
    format_curency = (price) => {
        return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    }

    //lấy list sp từ local
    getListFromLocal = () => {
        var List = localStorage.getItem(JSON.parse("listProduct"))
        return List;
    }

    //lưu list vào local
    saveListToLocal = (list) => {
        this.setState({ userData: list });
        localStorage.setItem("listProduct", JSON.stringify(list))
    }


    //popup thông báo
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


    displayProductsDetail = () => {
        return (
            <div className="row1">
                {this.state.userData.map((value, key) => {
                    return <ItemProducts price={this.format_curency(value.price)} pid={value.id} key={key} name={value.name} image={value.image} dataList={this.state.userData}
                        onClickDelete={this.deleteProduct}
                        onClickEdit={this.editProduct}
                    >
                        {value.name}
                    </ItemProducts>
                })}
            </div>
        )
    }

    changeStatus = () => {
        this.setState({ EditStatus: !this.state.EditStatus })
    }

    displayFormAdd = () => {
        if (this.state.EditStatus === false) {
            return (
                <div className="formAdd">
                    <form className='form-add formCss' onSubmit={(e) => this.submitForm(e)} >
                        <h2>Add product</h2>
                        <label>Name: </label>
                        <input className="inputAll" name="txtName" onChange={(e) => this.changeInput(e)} ></input>

                        <label>Price: </label>
                        <input className="inputAll" name="txtPrice" onChange={(e) => this.changeInput(e)} ></input>

                        <label>Image: </label>
                        <input className="inputAll" name="txtImage" onChange={(e) => this.changeInput(e)}></input>
                        <div className="buttonSave" >
                            <button className="btn btn-admin"><FaSave /></button>
                            <button className="btn btn-admin" onClick={this.changeStatus}>Cancel</button>
                        </div>
                    </form>
                </div>
            )
        }
    }




    render() {
        return (
            <div className="small-container">
                {this.showPopup()}
                <div className="titleProductsAdmin">
                    <h1>Products In Stock</h1>
                    <div className="group-button-admin">
                        <button className="buttonSpecial" onClick={() => this.changeStatus()} >Add product</button>
                    </div>
                    {this.displayFormAdd()}
                </div>
                {this.displayProductsDetail()}
            </div>
        );
    }
}


export default form;


