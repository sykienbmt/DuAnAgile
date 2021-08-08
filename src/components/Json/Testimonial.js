import React, { Component } from 'react';

class Testimonial extends Component {
    render() {
        return (
            <div className="col-3">
                <i className="fa fa-qoute-lef" />
                <p>{this.props.content}</p>
                <div className="rating">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star-o" />
                </div>
                <img src={this.props.image} alt='' />
                <h3>{this.props.name}</h3>
            </div>
        );
    }
}

export default Testimonial;