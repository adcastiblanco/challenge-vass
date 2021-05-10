import React, { useState, useRef } from "react";
import Swal from "sweetalert2";
import Loading from "../assets/images/loading.gif";

function Home() {
  const [userData, setUserData] = useState({});
  const [showUser, setShowUser] = useState(false);
  const inputID = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    let id = inputID.current.value;
    if (id !== localStorage.id) {
      Swal.fire({
        icon: "error",
        title: "El ID digitado no coincide con el tuyo.",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire({
        title: "Obteniendo usuario...",
        imageUrl: Loading,
        imageWidth: 100,
        imageHeight: 100,
        imageAlt: "Custom image",
        showConfirmButton: false,
      });
      fetch(`https://my.api.mockaroo.com/users/${id}.json?key=dd53cfd0`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          Swal.close();
          setUserData(data);
          setShowUser(true);
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Ha ocurrido un error inesperado, intentalo de nuevo.",
            showConfirmButton: false,
            timer: 2000,
          });
        });
    }
  };

  return (
    <>
      <form className="search-user" onSubmit={handleSubmit}>
        <input
          ref={inputID}
          id="identification"
          className="search-user__input"
          type="number"
          placeholder="Ingresa el ID"
          required
        />
        <button type="submit" className="search-user__button">
          ENVIAR
        </button>
      </form>
      {showUser && (
        <div className="info-user">
          <img className="info-user__avatar" src={userData.image} />
          <div className="info-user__item">
            <h4 className="info-user__item-title">Nombre</h4>
            <p className="info-user__item-detail">{userData.first_name}</p>
          </div>
          <div className="info-user__item">
            <h4 className="info-user__item-title">Apellido</h4>
            <p className="info-user__item-detail">{userData.last_name}</p>
          </div>
          <div className="info-user__item">
            <h4 className="info-user__item-title">Identificación</h4>
            <p className="info-user__item-detail">{userData.id}</p>
          </div>
          <div className="info-user__item">
            <h4 className="info-user__item-title">Cargo</h4>
            <p className="info-user__item-detail">{userData.job_title}</p>
          </div>
          <div className="info-user__item">
            <h4 className="info-user__item-title">Correo Electronico</h4>
            <p className="info-user__item-detail">{userData.email}</p>
          </div>
          <div className="info-user__item">
            <h4 className="info-user__item-title">Numero Telefonico</h4>
            <p className="info-user__item-detail">{userData.phone_number}</p>
          </div>
          <div className="info-user__item">
            <h4 className="info-user__item-title">Género</h4>
            <p className="info-user__item-detail">{userData.gender}</p>
          </div>
          <div className="info-user__item">
            <h4 className="info-user__item-title">Nacionalidad</h4>
            <p className="info-user__item-detail">{userData.nationality}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
