import React from "react";
import Login from "./components/login";
import Landing from "./components/landing";
import "./App.css";

const classes = {
  formStyle: {
    backgroundColor: "rgba(0, 51, 102, .55)",
    padding: "10px 35px 60px 35px",
    color: "#BEBEBE",
    marginTop: 10,
    width: "65%",
    fontSize: 16
  },
  hrStyle: {
    borderTop: "1px solid #fff",
    color: "#fff"
  },
  liStyle: {
    listStyleType: "none",
    color: "red"
  },
  centered: {
    display: "block",
    textAlign: "center",
    padding: "55px 0px 0px 0px"
  }
};

function App() {
  return (
    <Landing />

    /*<Login formStyle={classes.formStyle} hrStyle={classes.hrStyle}> */
  );
}

export default App;
