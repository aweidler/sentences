/**
 * Created by aweidler on 7/17/17.
 */

import React, {Component} from 'react';
import './App.css';
import Info from "./Info";
import pos from 'pos';
import codes from './pos.json';

class POSTagger extends Component {
    constructor(props) {
        super(props);
        this.state = { input: '', results: []};
    }

    static getWidth(){
        return 800;
    }

    calculateChange(e){
        this.setState({ input: e.target.value });
    }

    calculateError(){
        if(!this.state.input){
            this.setState({results: []});
        }
        else{
            let results = [];

            let value = this.state.input;
            let words = new pos.Lexer().lex(value);
            let tagger = new pos.Tagger();
            let taggedWords = tagger.tag(words);

            for(var i in taggedWords){
                let taggedWord = taggedWords[i];
                let word = taggedWord[0];
                let tag = taggedWord[1];
                if(codes[tag]){
                    tag = codes[tag];
                }
                else{
                    tag = "Unknown Tag";
                }

                results.push({tag:tag, word:word});
            }

            this.setState({results: results});
        }
    }r

    render() {
        let info = null;
        if(this.props.info){
            info = <Info info={this.props.info} />
        }
        return(
            <div>
                {info}
                <div className="error-chart chart">
                    <div className="wrapper" style={{ width: POSTagger.getWidth()+'px' }}>
                        <div>
                            <input onChange={this.calculateChange.bind(this)} maxLength="200" placeholder="Enter a sentence to evaluate&hellip;" type="text" />
                        </div>
                        <div className="eval-wrapper">
                            <button onClick={this.calculateError.bind(this)} className="eval-button">Evaluate!</button>
                        </div>
                    </div>
                    <div className="chart">
                        <div className="wrapper" style={{ width: POSTagger.getWidth()+'px' }}>
                            <h1 style={{ margin: 0, marginBottom: '15px' }}>Results</h1>
                            <div className="Results">
                                <ul>
                                {this.state.results.map(function(obj, i){
                                    return <li key={i}>
                                        <div className="word">{obj.word}</div>
                                        <div className="tag">{obj.tag}</div>
                                    </li>;
                                })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default POSTagger;