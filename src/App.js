import React, { useState, useEffect } from "react";
import soap from "jquery.soap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import XMLViewer from "react-xml-viewer";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/service" element={<Service />} />
      </Routes>
    </Router>
  );
}

function Service() {
  const [response, setResponse] = useState(null);
  const [xml, setXML] = useState(null);

  useEffect(() => {
    soap({
      url: "http://localhost/servicios_web/pub_plan_estudio.php?wsdl",
      method: "swTitulos",
      headers: { "Content-Type": "application/xml" },
      data: {},

      success: function (soapResponse) {
        setResponse(soapResponse.toXML());
        setXML(soapResponse.toString());
      },
      error: function (SOAPResponse) {
        console.log("ERROR: ", SOAPResponse);
      },
    });
  }, []);

  /* const xml = `<note>
  <to>Tove</to>
  <from>Jani</from>
  <heading>Reminder</heading>
  <body>Don't forget me this weekend!</body>
  </note>`; */

  if (xml) {
    return <XMLViewer xml={xml} collapsible />;
  }

  return <div className="App"></div>;
}
