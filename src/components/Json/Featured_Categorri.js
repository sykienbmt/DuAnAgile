import React, { Component } from 'react';

class Featured_Categorri extends Component {
    render() {
        return (
            <div className="col-3">
                <img src={this.props.image} alt='' />
            </div>
        );
    }
}

export default Featured_Categorri;