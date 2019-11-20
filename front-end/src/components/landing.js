import "../App.css";
import React, { Component } from "react";
import PropTypes from "prop-types";

const textArray = [
  "A Merchant",
  "A Bandit",
  "An Assasin",
  "A King ",
  "An Empress",
  "A Priest",
  "A god"
];

class Landing extends Component {
  constructor() {
    super();
    this.state = { textIdx: 0 };
  }

  componentDidMount() {
    this.timeout = setInterval(() => {
      let currentIdx = this.state.textIdx;
      this.setState({ textIdx: currentIdx + 1 });
    }, 2500);
  }

  componentWillUnmount() {
    clearInterval(this.timeout);
  }

  render() {
    let textThatChanges = textArray[this.state.textIdx % textArray.length];

    return (
      <div style={classes.summaryStyle}>
        <h1 style={classes.labelStyle}>IMPERIAL DREAMS</h1>
        <div style={classes.centered}>
          <div style={classes.box}>
            <p style={classes.paragraph}>{summary}</p>
            <p style={classes.paragraph}>
              You will start as nothing, but what will you become?
            </p>
            <p style={classes.role}>{textThatChanges} ?</p>
          </div>
        </div>
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
    fontSize: "33px"
  }
};

const summary =
  "The continent of Acar is in tatters. A multi-generational war to exterminate the gods broke the world asunder. Society, Culture and Knowledge faded in the centuries following the apocalypse, with the world reverting back to its primeval origins.The land of Acar is a blank slate. Its history, culture, religion and institutions will be formed at the hands of the characters that inhabit it.";
export default Landing;
