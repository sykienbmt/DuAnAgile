import React, { Component } from 'react';

class Latest_Products extends Component {
    render() {
        return (
            <div className="col-4">
                <img src={this.props.image} alt='' />
                <h4>{this.props.title}</h4>
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

export default Latest_Products;