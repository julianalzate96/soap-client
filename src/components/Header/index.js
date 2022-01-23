import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getServicesToken } from "../../api";
import { fetchToken } from "../../redux/actions/token.action";

import Form from "../Form";

import APIT from "../../images/APIT-logo.jpeg";
import "../../styles/_header.scss";

export default function Header() {
  const { token, loading, error, email } = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    var data = new FormData();
    data.append("email", e.target.elements["Correo institucional"].value);

    dispatch(fetchToken(data, e.target.elements["Correo institucional"].value));
  };

  const handleShowForm = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/">
          <img
            src="https://www.politecnicojic.edu.co/images/logo/logo.png"
            alt="Logo PCJIC"
          />
        </Link>
      </div>
      <div className="logo-apit-container">
        {token ? (
          <span>{email}</span>
        ) : (
          <button
            title="Solicita un token para poder consultar los servicios privados."
            onClick={handleShowForm}
          >
            SOLICITAR TOKEN
          </button>
        )}
        <a
          href="https://web.facebook.com/apitpolijic/?_rdc=1&_rdr"
          target="_blank"
          rel="noreferrer"
        >
          <img src={APIT} alt="Logo APIT" />
        </a>
      </div>
      {showForm && !token && (
        <div className="auth-form">
          <Form
            onSubmit={onSubmit}
            busy={loading}
            buttonLabel="SOLICITAR TOKEN"
            buttonTitle="Solicita un token para poder consultar los servicios privados."
          >
            <Form.Input label="Correo institucional" type="email" />
          </Form>
        </div>
      )}
    </header>
  );
}
