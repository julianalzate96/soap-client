import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import _soap from "jquery.soap";
import soap from "soap-everywhere";
import XMLViewer from "react-xml-viewer";
import { parseString } from "xml2js";

import ClickHandler from "../../hooks/clickHandler";
import Layout from "./layout";
import Form from "../Form";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentXml } from "../../redux/actions/services.action";

const customTheme = {
  overflowBreak: true,
  tagColor: "#2815B2",
};

export default function Modal({ selectedService, setShowModal }) {
  const [response, setResponse] = useState(null);
  const [inputs, setInputs] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
  const { token } = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    setBusy(true);
    let data = {};

    if (inputs) {
      for (let i = 0; i < e.target.elements.length; i++) {
        if (e.target.elements[i].nodeName !== "BUTTON") {
          data = {
            ...data,
            [e.target.elements[i].name]: e.target.elements[i].value,
          };
        }
      }
    }

    _soap({
      url: selectedService.wsdl,
      method: selectedService.nombre,
      headers: { "Content-Type": "application/xml" },
      data,
      HTTPHeaders: {
        Authorization: token,
      },
      success: function (soapResponse) {
        dispatch(setCurrentXml(soapResponse.toString()));

        let _xml =
          soapResponse.content.documentElement.firstChild.firstChild.innerHTML;

        parseString(_xml, function (err, result) {
          setResponse(result.return);
        });
        setBusy(false);
      },
      error: function (SOAPResponse) {
        console.log("ERROR: ", SOAPResponse);
        setError(true);
        setBusy(false);
      },
    });
  };

  const renderInputs = () => {
    if (inputs) {
      return Object.keys(inputs).map((input, i) => {
        return (
          <Form.Input
            key={i}
            type={inputs[input].replace("xsd:", "")}
            label={input}
          />
        );
      });
    } else {
      return <span>Este servicio no requiere parametros de entrada.</span>;
    }
  };

  const renderJsonResponse = useCallback(() => {
    let type = Object.keys(response).find((key) => key === "item");

    return Object.keys(response).map((key, i) => {
      if (key !== "$") {
        if (type) {
          return response.item.map((item) => {
            return Object.keys(item).map((key, i) => {
              if (key !== "$") {
                return (
                  <span key={`${i}${key}${item[key][0]._}`}>
                    <strong>{key}</strong>
                    {`: ${item[key][0]._}`}
                  </span>
                );
              } else {
                return <div key={`line${i}`} className="line" />;
              }
            });
          });
        } else {
          return (
            <span key={i}>
              <strong>{key}</strong>
              {`: ${response[key][0]._}`}
            </span>
          );
        }
      } else {
        return null;
      }
    });
  }, [response]);

  useEffect(() => {
    soap.createClient(selectedService.wsdl, (err, client) => {
      let response = null;
      if (err) {
        console.log("ERROR: ", err);
        setError(true);
      }
      response = client.describe();

      if (response) {
        setInputs(
          response[selectedService.nombre][`${selectedService.nombre}Port`][
            selectedService.nombre
          ].input
        );
      }
    });
  }, []);

  return (
    <Layout>
      <ClickHandler action={setShowModal}>
        <div className="body">
          <span className="close" onClick={setShowModal}>
            Cerrar
          </span>
          <h2>{selectedService.nombre}</h2>
          <p>{selectedService.descripcion}</p>
          <Form
            onSubmit={onSubmit}
            busy={busy}
            buttonLabel="PROBAR"
            buttonTitle="Ejecuta la peticion al servicio web"
          >
            {renderInputs()}
          </Form>
          {response && (
            <section className="response-container">
              <div className="json-container">{renderJsonResponse()}</div>
              <div className="line" />
              <div>
                <span>
                  Si desea acceder a la respuesta en XML puede consultar en el
                  siguiente enlace:{" "}
                </span>
                <Link to="/xml">Ver Respuesta en XML</Link>
              </div>
            </section>
          )}
          {error && <span>Error al probar el servicio.</span>}
          <div className="xml-container">
            <p className="text">
              A continuaci??n se muestra la estrutura de la solicitud en XML
            </p>
            {selectedService.xml_entradas && (
              <XMLViewer
                className="xml"
                xml={selectedService.xml_entradas}
                theme={customTheme}
                collapsible
                indentSize={1}
              />
            )}
          </div>
          <div className="xml-container">
            <p className="text">
              A continuaci??n se muestra la estructura de la respuesta en XML
            </p>
            {selectedService.xml_respuestas && (
              <XMLViewer
                className="xml"
                xml={selectedService.xml_respuestas}
                theme={customTheme}
                collapsible
                indentSize={1}
              />
            )}
          </div>
        </div>
      </ClickHandler>
    </Layout>
  );
}
