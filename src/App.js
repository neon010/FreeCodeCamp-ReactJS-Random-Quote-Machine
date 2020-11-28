import React from 'react';
import './App.css';

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      apiResult:"",
      quoteText: "Quote Text",
      quthorAuthor: "Quote Author",
      quoteArrayLength : "",
      color: '#16a085'
    }
    this.handlenewQuote = this.handlenewQuote.bind(this);
  }
  componentDidMount(){
    const API = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    fetch(API).then(response => response.json()).then(data =>{
      this.setState({
        apiResult: data.quotes,
        quoteText: data.quotes[0].quote,
        quoteAuthor: data.quotes[0].author,
        quoteArrayLength: data.quotes.length
      })
    })
    console.log("component Mounted");
  }
  handlenewQuote(){
    const color = ['#16a085','#27ae60','red','#f39c12','#e74c3c','#9b59b6','#FB6964',
                    'brown','green','yellow','blue','#73A857'];
    let randomNumber = Math.floor(Math.random()*(this.state.quoteArrayLength));
    let randomColorNumber = Math.floor(Math.random()*(this.state.color.length));
    this.setState({
      quoteText: this.state.apiResult[randomNumber].quote,
      quoteAuthor: this.state.apiResult[randomNumber].author,
      color: color[randomColorNumber]
    })
  }

  render(){
    let twitterUrl = `https://twitter.com/intent/tweet?text=${this.state.quoteText}- ${this.state.quoteAuthor}`;
    return (<div id="quote-box">
                <div id="app-title">
                  <h1>Random Quote Machine</h1>
                </div>
                <div id="quote-text">
                    <i class="fa fa-quote-left quote-tag" style={{color:this.state.color}}></i>
                    <h2 id="text" style={{color:this.state.color}}>{this.state.quoteText}</h2>
                </div>
                <div id="quote-author">
                    <cite id="author" style={{color:this.state.color}}>-{this.state.quoteAuthor}</cite>
                </div>
                <div id="tweet-newQuote">
                    <a id="tweet-quote" href={twitterUrl}  target="_blank" rel="noreferrer">
                      <i class="fa fa-twitter"></i>
                    </a>
                    <button id="new-quote" onClick={this.handlenewQuote}>New Quote</button>
                </div>
            </div>)
  }
  
}

export default App;
