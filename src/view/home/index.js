import React, { useState } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import NavBar from "../../components/navbar";
import { useSelector } from "react-redux";


function Home() {
    return(
        <>
       <NavBar></NavBar>
        <h1>{useSelector((state) => state.usuarioEmail)}</h1>
        <h1>Logado: {useSelector((state) => state.usuarioLogado)}</h1>
        </>
    )
}

export default Home