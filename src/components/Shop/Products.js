import React, { Component } from 'react';
import SanPham from '../Json/ListProducts';
import ListProduct from '../Json/ListProduct.json'


class products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txtSearch: '',
            userData: []
        }
    }

    //format định dạng tiền
    format_curency = (price) => {
        return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    }

    //load danh sách sản phẩm trước
    componentDidMount = () => {
        let list = ListProduct;
        if (localStorage["listProduct"]) {
            list = JSON.parse(localStorage.getItem("listProduct"))
        }
        this.setState({ userData: list });
    };

    //lấy giá trị thay đổi từ ô input
    changeInput = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({ [name]: value });
        console.log(name);
        if (value.length === 0) { this.refreshProduct() }
    }

    //map sản phẩm
    displayProductsDetail = () => {
        return (
            <div className="row">
                {
                    this.state.userData.map((val, key) => {
                        return <SanPham price={this.format_curency(val.price)} pid={val.id} key={key} name={val.name} image={val.image}  >
                            {val.name}
                        </SanPham>
                    }
                    )}
            </div>
        )
    }

    //tìm kiếm sản phẩm theo tên
    searchProduct = () => {
        var string = this.state.txtSearch.toLowerCase();
        var list = this.state.userData;
        var listSearch = [];
        console.log();
        for (var i = 0; i < list.length; i++) {
            if (list[i].name.toLowerCase().includes(string)) {
                listSearch.push(list[i])
            }
        }
        this.setState({ userData: listSearch });
    }

    //làm mới lại list
    refreshProduct = () => {
        var list = JSON.parse(localStorage.getItem("listProduct"))
        this.setState({ userData: list });
    }

    setValueSort = (e) => {
        var sort = e.target.value
        var list = this.state.userData
        if (sort === "AZ") {
            list.sort(function (sp1, sp2) {
                let a = sp1.name.toLowerCase();
                let b = sp2.name.toLowerCase();
                return a === b ? 0 : a > b ? 1 : -1;
            });
        } else if (sort === "ZA") {
            list.sort(function (sp1, sp2) {
                let a = sp1.name.toLowerCase();
                let b = sp2.name.toLowerCase();
                return a === b ? 0 : b > a ? 1 : -1;
            });
        } else if (sort === "giaTang") {
            list.sort(function (sv1, sv2) {
                return sv1.price - sv2.price;
            });
        } else if (sort === "giaGiam") {
            list.sort(function (sv1, sv2) {
                return sv2.price - sv1.price;
            });
        } else if (sort === "N/A") {
            this.refreshProduct()
        }
        this.setState({ userData: list });
    }

    render() {
        return (
            <div>
                <div className="small-container">
                    <div className="small-container-title">
                        <div className="row1 row-2">
                            <div className="group-search">
                                <input className="inputAll" onChange={(event) => this.changeInput(event)}
                                    type="text" placeholder="Search..."
                                    name="txtSearch"
                                />
                                <button className="btn btn-search" onClick={this.searchProduct} >Search</button>
                                <button className="btn btn-search" onClick={this.refreshProduct} >refresh</button>
                            </div>
                            {/* <h2>All Products</h2> */}
                            <select id="dropdown" onChange={this.setValueSort} >
                                <option value="N/A" name="txtSort">Sort</option>
                                <option value="AZ">Name: A-Z</option>
                                <option value="ZA">Name: Z-A</option>
                                <option value="giaTang">Price: Ascending</option>
                                <option value="giaGiam">Price: Descending</option>
                            </select>
                        </div>
                    </div>
                    {this.displayProductsDetail()}
                    <div className="page-btn">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>→</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default products;