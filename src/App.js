import React, { Component } from 'react';
import './App.css';
import MemoryCard from './Components/MemoryCard';

function generateDeck() {
  const symbols = [`∆`, `ß`, `£`, `§`, `•`, `$`, `+`, `ø`];
  const deck = [];
  for (let i = 0; i < 16; i++) {
    const card = {isFlipped: false, symbol: symbols[i % 8]};
    deck.push(card);
  }
  shuffle(deck);
  return deck;
}

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: generateDeck(),
      pickedCards: [],
    }
  };
  
  pickCard = (cardIndex) => {
    if (this.state.deck[cardIndex].isFlipped){
      return;
    }
    const cardToFlip = {...this.state.deck[cardIndex]};
    
    cardToFlip.isFlipped = true;

  const newDeck = this.state.deck.map((card, index) => {
    if (cardIndex === index) {
      return cardToFlip;
    }
    return card;
  });

  let newPickedCards = this.state.pickedCards.concat(cardIndex);

  if (newPickedCards.length === 2) {
    const card1Index = newPickedCards[0];
    const card2Index = newPickedCards[1];
    if (newDeck[card1Index].symbol !== newDeck[card2Index].symbol) {
      setTimeout(() => {
        this.unflipCards(card1Index, card2Index)
      },1000);
    }
    newPickedCards = [];
  }

  this.setState({
    deck: newDeck, 
    pickedCards: newPickedCards
  });
};

  unflipCards = (card1Index, card2Index) => {
    const card1 = {...this.state.deck[card1Index]};
    const card2 = {...this.state.deck[card2Index]};
    card1.isFlipped = false;
    card2.isFlipped = false;

    const newDeck = this.state.deck.map((card, index) => {
      if (card1Index === index) {
        return card1;
      }  
      if (card2Index === index) {
        return card2;
      } 
      return card
    });

    this.setState({
      deck: newDeck
    });
  }



  render() {
    const cardsJSX = this.state.deck.map((card, index) => {
      return (
        <MemoryCard 
          key={index}
          symbol={card.symbol}
          isFlipped={card.isFlipped}
          pickCard={this.pickCard.bind(this, index)}
        />)
      });
    return (
        <div className="App">
          <header className="App-header">
            <h1>
              Memory Game
            </h1>
            <h3>
              Match Cards To Win
            </h3>
          </header>
          <div>
            {cardsJSX.slice(0,4)}
          </div>
          <div>
            {cardsJSX.slice(4,8)}
          </div>
          <div>
            {cardsJSX.slice(8,12)}
          </div>
          <div>
            {cardsJSX.slice(12,16)}
          </div>
        </div>
      );
  }
}

export default App;
