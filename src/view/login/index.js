import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import React, { useState } from "react";
import "./login.css";
import { auth } from "../../config/firebase";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Login() {
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [msgTipo, setMsgTipo] = useState();

  const dispatch = useDispatch();

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const usuarioRedux = useSelector((state) => state.usuarioEmail);

  function logar(e) {
    e.preventDefault();
    signInWithEmailAndPassword(email, senha).then((response) => {
      console.log(response);
      if (response == undefined) {
        setMsgTipo("erro");
        console.log(msgTipo);
      } else {
        setMsgTipo("sucesso");
        setTimeout(() => {
          dispatch({ type: "LOG_IN", usuarioEmail: email });
        }, 2000);
        console.log("sucesso");
      }
    });
  }

  // Decide quando renderizar o componente Navigate
  const renderNavigate = usuarioRedux ? <Navigate to="/" /> : null;

  return (
    <>
      {usuarioRedux ? (
        <>{renderNavigate}</>
      ) : (
        <div className="login-content d-flex align-items-center justify-content-center">
          {renderNavigate}
          <form className="form-signin text-center">
            <div className="mb-4">
              <h1 className="h3 mb-3 font-weight-normal text-white font-weight-bold">
                Login
              </h1>
            </div>

            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="form-control my-2"
              id="inputEmail"
              placeholder="Email"
            />

            <input
              onChange={(e) => setSenha(e.target.value)}
              type="password"
              className="form-control my-2"
              id="inputPassword"
              placeholder="Senha"
            />

            <button
              onClick={logar}
              className="btn btn-lg btn-block btn-login my-3"
              type="button"
            >
              Logar
            </button>

            <div className="msg-login text-white my-5">
              {msgTipo === "sucesso" && (
                <span>
                  <strong>WoW! </strong>Você está conectado! &#128526;
                </span>
              )}
              {msgTipo === "erro" && (
                <span>
                  <strong>Ops! </strong>Verifique se a senha ou usuário estão
                  corretos! &#128549;
                </span>
              )}
            </div>
            <div className="opcoes-login mt-5">
              {/* <Link to="" className="mx-2">
                Recuperar Senha
              </Link>
              <span className="text-white">&#9733;</span>
              <Link to="cadastro" className="mx-2">
                Quero Cadastrar
              </Link> */}
              <a href="" className="mx-2">
                Recuperar Senha
              </a>
              <span className="text-white">&#9733;</span>
              <a href="/cadastro" className="mx-2">
                Quero Cadastrar
              </a>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default Login;
