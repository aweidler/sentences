import React, { Component } from 'react';
import './App.css';
import POSTagger from './POSTagger';
import Overlay from './Overlay';

import Navigation from "./Navigation";

require('normalize.css');

class App extends Component {

    constructor(){
        super();

        this.PAGES = Navigation.GetPages();

        let hash = window.location.hash.substr(1);
        let hashes = hash.split('/');
        let params = [];
        for(let i=1; i < hashes.length; i++){
            params.push(hashes[i]);
        }

        this.state = {
            page: hashes[0] ? hashes[0] : this.PAGES.front,
            params: params,
        };

        this.title = "Sentence POS Tagger";
        this.author = "Austin Weidler";
        this.description = "This software will tag all of the parts of speech for each word in an English sentence.";

        let self = this;
        window.onhashchange = function(){
            let hash = window.location.hash.substr(1);
            self.sendTo(hash);
        };
    }

    static info(){
        return "Enter a sentence in the space provided below then click \"Evaluate!\" to tag the words in the sentence. " +
            "There may be some errors but the tagger will do the best job it can to place each word into the proper part-of-speech category.";
    }

    sendTo(page){
        let pages = page.split('/');

        if(this.PAGES.hasOwnProperty(pages[0])) {

            let pageinfo = { page: pages[0], params:[] };
            for(let i=1; i<pages.length; i++){
                pageinfo.params.push(pages[i]);
            }
            this.setState(pageinfo);

            if(history.pushState) {
                history.pushState(null, null, '#'+page);
            }
            else {
                location.hash = '#'+page;
            }
        }
        else{
            this.setState({
                page: this.PAGES.front,
            });
        }
    }

    render() {
        return (<div className='App'>
            <Navigation title={this.title}
                        author={this.author}
                        sendTo={this.sendTo.bind(this)}
                        page={this.state.page}
                        martini={this.state.martini} />
            { this.state.page === this.PAGES.front &&
                <Overlay title={this.title}
                     subtitle={"By " + this.author}
                     description={this.description}
                     sendTo={this.sendTo.bind(this)}
                />
            }

            { this.state.page === this.PAGES.overview &&
                <POSTagger info={App.info()}
                               data={this.state.data}
                               sendTo={this.sendTo.bind(this)}
                />
            }

        </div>);
    }
}

export default App;
