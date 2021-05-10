import React, { useState } from "react";
import Swal from "sweetalert2";
import Loading from "../assets/images/loading.gif";

function Login() {
  const [inputsData, setInputsData] = useState({});

  const handleChange = (event) => {
    setInputsData({ ...inputsData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    Swal.fire({
      title: "Validando datos...",
      imageUrl: Loading,
      imageWidth: 100,
      imageHeight: 100,
      imageAlt: "Custom image",
      showConfirmButton: false,
    });
    event.preventDefault();
    fetch(
      `https://my.api.mockaroo.com/users/${inputsData.identification}.json?key=dd53cfd0`
    )
      .then((res) => res.json())
      .then((data) => {
        if (inputsData.password === data.password) {
          Swal.fire({
            icon: "success",
            title: "Has iniciado sesión correctamente",
            showConfirmButton: false,
            timer: 2000,
          });

          localStorage.setItem("token", true);
          localStorage.setItem("id", data.id);

          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        } else {
          Swal.fire({
            icon: "error",
            title: "Contraseña invalida",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Ha ocurrido un error inesperado, intentalo de nuevo.",
          showConfirmButton: false,
          timer: 2000,
        });
      });
  };

  return (
    <div className="login">
      <div className="login__container">
        <h3 className="login__title">INICIAR SESION</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="login__label" htmlFor="identification">
              Identificación
            </label>
            <input
              id="identification"
              className="login__input"
              onChange={handleChange}
              placeholder="Ingresa una identificación"
              type="number"
              name="identification"
              required
            />
          </div>
          <div>
            <label className="login__label" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              className="login__input"
              onChange={handleChange}
              placeholder="Ingresa la contraseña"
              type="password"
              name="password"
              minLength="8"
              required
            />
          </div>
          <button className="login__button">INGRESAR</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
