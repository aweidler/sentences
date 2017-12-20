/**
 * Created by aweidler on 7/19/17.
 */
import React, { Component } from 'react';
import "./Overlay.css";


class Overlay extends Component{

    constructor(props){
        super(props);

        this.about = "For CS410: Text Information Systems";

        this.state = {
            showAbout: false,
        };
    }



    render(){
        return (
            <div className="overlay">
                <div>
                    <div className="titles">
                        <h1>{this.props.title}</h1>
                        <h2>
                            {this.props.subtitle}
                        </h2>
                    </div>
                    <blockquote>
                        {this.state.showAbout ? this.about : this.props.description}
                    </blockquote>
                    <div className="buttons">
                        <button onClick={() => this.setState({showAbout: !this.state.showAbout}) } >
                            <i className="fa fa-info-circle" aria-hidden="true"></i> {!this.state.showAbout ? "About the Software" : "Introduction" }
                        </button>
                        <button onClick={() => this.props.sendTo('overview')}>Click to Start <i className="fa fa-arrow-right" aria-hidden="true"></i> </button>
                    </div>
                </div>
            </div>
        );
    }

}

export default Overlay;