import React, { useState, useEffect } from "react";
import soap from "jquery.soap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import XMLViewer from "react-xml-viewer";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route path="/service" element={<Service />} />
      </Routes>
    </Router>
  );
}

function Service() {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    soap({
      url: "http://192.168.1.6:80/test/index.php?wsdl",
      method: "saludar",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },

      data: {
        name: "Remy Blom",
      },

      success: function (soapResponse) {
        console.log("RES: ", soapResponse.toXML());
        setResponse(soapResponse.toXML());
      },
      error: function (SOAPResponse) {
        console.log("ERROR: ", SOAPResponse);
      },
    });
  }, []);

  return <div className="App"></div>;
}

function Test() {
  const xml = `<note>
  <to>Tove</to>
  <from>Jani</from>
  <heading>Reminder</heading>
  <body>Don't forget me this weekend!</body>
  </note>`;
  return <XMLViewer xml={xml} collapsible />;
}
