import "../App.css";
import React, { Component } from "react";
import Landing from "./landing";

class Box extends Component {
  state = {
    boxContent: <Landing />
  };

  changeContent(test) {
    this.setState(test);
  }

  render() {
    return (
      <div style={classes.summaryStyle}>
        <h1 style={classes.labelStyle}>IMPERIAL DREAMS</h1>
        <div style={classes.centered}>
          <div style={classes.box}>
            <Landing passFunction={this.changeContent()} />
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
  }
};

export default Box;
