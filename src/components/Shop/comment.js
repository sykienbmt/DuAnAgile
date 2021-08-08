import React, { Component } from 'react';

class comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: this.props.urlWeb
        }
        console.log("http://localhost:3000" + this.state.url);
    }

    render() {
        return (
            <div className="comment-facebook">
                <div className="fb-comments" data-href={"http://localhost:3000" + this.state.url} data-width="700" data-numposts="5"></div>
            </div>
        );
    }
}

export default comment;