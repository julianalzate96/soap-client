import { useState, useEffect } from "react";
import soap from "jquery.soap";

import logo from "./logo.svg";
import "./App.css";

function App() {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    soap({
      url: "https://frozen-river-98217.herokuapp.com/index.php?wsdl",
      method: "saludar",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },

      data: {
        name: "Remy Blom",
      },

      success: function (soapResponse) {
        // do stuff with soapResponse
        // if you want to have the response as JSON use soapResponse.toJSON();
        // or soapResponse.toString() to get XML string
        // or soapResponse.toXML() to get XML DOM
        console.log("RES: ", soapResponse.toXML());
        setResponse(soapResponse.toXML());
      },
      error: function (SOAPResponse) {
        // show error
        console.log("ERROR: ", SOAPResponse);
      },
    });
  }, []);

  /*  if (response) {
    return response;
  }
 */
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
