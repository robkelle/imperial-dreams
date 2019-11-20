import "../App.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import Box from "./box";
import Login from "./login";

const textArray = [
  "A Merchant",
  "A Bandit",
  "An Assasin",
  "A King ",
  "An Empress",
  "A Priest",
  "A Tailor",
  "A Pirate",
  "A Captain",
  "A Mayor",
  "A Duchess",
  "A god"
];

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      textIdx: 0,
      buttonCss: classes.playNowWhite
    };
  }

  hoverOn = buttonCss => {
    this.setState(buttonCss);
  };

  hoverOff = buttonCss => {
    this.setState(buttonCss);
  };

  componentDidMount() {
    this.timeout = setInterval(() => {
      let currentIdx = this.state.textIdx;
      this.setState({ textIdx: currentIdx + 1 });
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.timeout);
  }

  render() {
    let roles = textArray[this.state.textIdx % textArray.length];

    return (
      <div>
        <p style={classes.paragraph}>{summary}</p>
        <p style={classes.paragraph}>
          You will start as nothing, but what will you become?
        </p>
        <p style={classes.role}>{roles} ?</p>
        <button
          style={this.state.buttonCss}
          onMouseEnter={e => this.hoverOn({ buttonCss: classes.playNowBlack })}
          onMouseLeave={e => this.hoverOff({ buttonCss: classes.playNowWhite })}
        >
          Join Acar!
        </button>
      </div>
    );
  }
}
const classes = {
  summaryStyle: {
    display: "inline-block",
    borderRadius: "25px",
    backgroundColor: "rgb(229, 229, 229, .75)",
    padding: "25px 35px 60px 35px",
    color: "#BEBEBE",
    marginTop: 10,
    width: "800px",
    height: "800px"
  },
  labelStyle: {
    fontFamily: "Trade Winds",
    color: "black",
    fontSize: "44px"
  },

  box: {
    backgroundColor: "lightgrey",
    width: "650px",
    border: "15px solid black",
    height: "640px",
    borderRadius: "25px"
  },

  centered: {
    display: "inline-block",
    textAlign: "center",
    padding: "0px 0px 0px 0px"
  },
  paragraph: {
    color: "black",
    fontFamily: "'Alatsi', sans-serif",
    fontSize: "20px",
    padding: "40px 7px 7px 7px"
  },
  role: {
    fontFamily: "Trade Winds",
    color: "black",
    fontSize: "33px",
    padding: "20px 0px 30px 0px"
  },
  playNowBlack: {
    outline: "none",
    display: "inline-block",
    textDecoration: "none",
    backgroundColor: "black",
    border: "0.1em solid #FFFFFF",
    borderRadius: "0.4em",
    fontWeight: "500",
    color: "white",
    fontSize: "28px",
    padding: "0px 5px 0px 5px"
  },

  playNowWhite: {
    outline: "none",
    display: "inline-block",
    textDecoration: "none",
    backgroundColor: "white",
    border: "0.1em solid black",
    borderRadius: "0.4em",
    fontWeight: "500",
    color: "black",
    fontSize: "28px",
    padding: "0px 5px 0px 5px"
  }
};

const summary =
  "The continent of Acar is in tatters. A multi-generational war to exterminate the gods broke the world asunder. Society, culture and knowledge faded in the centuries following the apocalypse, with the world reverting back to its primeval origins. The land of Acar is a blank slate. Its history, culture, religion and institutions will be formed by the hands of the characters that inhabit it.";
export default Landing;
