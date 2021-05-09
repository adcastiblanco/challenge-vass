import React from "react";
import ColpatriaLogo from "../assets/images/colpatria-logo.png";

function Header() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };
  return (
    <header className="header">
      <img src={ColpatriaLogo} />
      {localStorage.token && (
        <p className="header_logout" onClick={handleLogout}>
          Cerrar sesión
        </p>
      )}
    </header>
  );
}

export default Header;
