import React, { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";
import { Link, Navigate, useNavigate, useNavigationType } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./cadastro.css";
import Navbar from "../../components/navbar";

function Cadastro() {
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [msgTipo, setMsgTipo] = useState();
  const [msg, setMsg] = useState();
  const [carregando, setCarregando] = useState(0);

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const usuarioRedux = useSelector((state) => state.usuarioEmail);

  function cadastrar(e) {
    setCarregando(1);
    setMsgTipo(null);

    if (!email || !senha) {
      setMsgTipo("erro");
      setMsg("Você precisa informar o email e senha para fazer o cadastro!");
      return;
    }

    e.preventDefault();
    createUserWithEmailAndPassword(email, senha).then((resultado) => {
      setCarregando(0);
      console.log(resultado);
        redirectLogin("/login")
    });
  }

  React.useEffect(() => {
    if (error) {
      if (error.message == "Firebase: Error (auth/email-already-in-use).") {
        setCarregando(0);
        setMsgTipo("erro");
        setMsg("O Email já está Cadastrado!");
      } else {
        if (
          error.message ==
          "Firebase: Password should be at least 6 characters (auth/weak-password)."
        ) {
          setCarregando(0);
          setMsgTipo("erro");
          setMsg("A senha não pode conter menos que 6 Caracteres!");
        } else {
          if (error.message == "Firebase: Error (auth/invalid-email).") {
            setCarregando(0);
            setMsgTipo("erro");
            setMsg("Este e-mail não é um e-mail valido!");
          } else {
            setCarregando(0);
            setMsgTipo("erro");
            setMsg("Tente novamente mais tarde!");
          }
        }
      }
      console.log(error.message);
    }
  }, [error]);

  // Decide quando renderizar o componente Navigate
  const renderNavigate = usuarioRedux ? <Navigate to="/" /> : null;

  const redirectLogin = useNavigate()

  return (
    <>
      {usuarioRedux ? (
        <>{renderNavigate}</>
      ) : (
        <>
          {/* <Navbar></Navbar> */}
          <div className="form-cadastro">
            <form className="text-center form-login mx-auto mt-5">
              <h1 className="h3 mb-3 text-black font-weight-bold">Cadastro</h1>

              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="form-control my-2"
                placeholder="Email"
              ></input>
              <input
                onChange={(e) => setSenha(e.target.value)}
                type="password"
                className="form-control my-2"
                placeholder="Senha"
              ></input>

              {carregando ? (
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              ) : (
                <button
                  onClick={cadastrar}
                  type="button"
                  className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro"
                >
                  Cadastro
                </button>
              )}

              <div className="msg-login text-black my-5">
                {msgTipo === "sucesso" && (
                  <span>
                    <strong>WoW! </strong>Usuario Cadastrado com sucesso!
                    &#128526;
                  </span>
                )}
                {msgTipo === "erro" && (
                  <span>
                    <strong>Ops! </strong> {msg} &#128549;
                  </span>
                )}
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
}

export default Cadastro;
