import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Form from "../Form";

import APIT from "../../images/APIT-logo.jpeg";
import "../../styles/_header.scss";
import { getServicesToken } from "../../api";

export default function Header() {
  const [isAuth, setIsAuth] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setBusy(true);

    var data = new FormData();

    setEmail(e.target.elements["Correo institucional"].value);

    data.append("email", e.target.elements["Correo institucional"].value);

    getServicesToken(data).then((res) => {
      if (res) {
        localStorage.setItem("token", res);
        localStorage.setItem(
          "email",
          e.target.elements["Correo institucional"].value
        );
        setIsAuth(true);
      } else {
        setError(true);
      }
      setBusy(false);
    });
  };

  const handleShowForm = () => {
    setShowForm((prev) => !prev);
  };

  useEffect(() => {
    setIsAuth(localStorage.getItem("token"));
    setEmail(localStorage.getItem("email"));
  }, [localStorage]);

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
        {isAuth ? (
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
      {showForm && !isAuth && (
        <div className="auth-form">
          <Form
            onSubmit={onSubmit}
            busy={busy}
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
