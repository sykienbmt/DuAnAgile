import React, { Component } from 'react';
import { FaSave } from 'react-icons/fa'
// const { v4: uuidv4 } = require('uuid');

class itemproduct extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            EditStatus: true,
            txtId:this.props.pid,
            txtImage:this.props.image,
            txtName:this.props.name,
            txtPrice:this.props.price,
        }
    }

    changeStatus = () => {
        this.setState({
            EditStatus: !this.state.EditStatus
        })
    }

    deleteProduct = () =>{
        this.props.onClickDelete(this.props.pid);
    }


    displayProducts = () => {
        if (this.state.EditStatus === true) {
            return (
                <>
                    <img src={this.props.image} alt={this.props.name} />
                    <p>{this.props.name}</p>
                    <p>Price: {this.props.price} $</p>
                </>
            )
        } else {
            return (
                <form className='form-edit' onSubmit={(e)=>this.editForm(e)} >
                    <label>Name: </label>
                    <input className="inputAll" name="txtName"  defaultValue={this.props.name} onChange={(e)=>this.changeInput(e)} ></input>
                   
                    <label>Price: </label>
                    <input className="inputAll" name="txtPrice" defaultValue={this.props.price} onChange={(e)=>this.changeInput(e)} ></input>
                   
                    <label>Image: </label>
                    <input className="inputAll" name="txtImage" defaultValue={this.props.image} onChange={(e)=>this.changeInput(e)} ></input>
                    <div className="buttonSave" >
                    <button className="btn"><FaSave /></button>
                    </div>
                </form>
            )
        }
    }

    saveButton = () => {

    }

    displayIcons = () => {
        if (this.state.EditStatus === true) {
            return <div className="group-button">
                        <button className="btn btn-edit" onClick={() => this.changeStatus()} >Edit</button>
                        <button className="btn btn-delete" onClick={() => this.deleteProduct(this.props.pid)} >Delele</button>
                    </div>
                    
        } else {
            return <button className="btn" onClick={() => this.changeStatus()} >CANCEL</button>
        }
    }


    changeInput = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name] : value
        });
    }

    editForm = (event) => {
        event.preventDefault();
        const{txtName,txtPrice,txtImage} = this.state;
        this.props.onClickEdit(this.props.pid,txtName,txtImage,txtPrice);
        this.changeStatus()
    }


    render() {
        return (
            <div className="col-4" >
                {this.displayProducts()}
                <div className="buttonEdit" >{this.displayIcons()}</div>
            </div>
        );
    }
}

export default itemproduct;