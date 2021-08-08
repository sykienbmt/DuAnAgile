import React, { Component } from 'react';

class Brand extends Component {
    render() {
        return (
            <div className="col-5">
                <img src={this.props.image} alt='' />
            </div>
        );
    }
}

export default Brand;