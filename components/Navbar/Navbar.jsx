import React from "react";
import "./Navbar.css";

export default function Navbar(props) {
  return (
    <div className="navbar">
      <h2>Kanban Board</h2>
      <div>
        {/* Input checkbox for theme switch */}
        <input
          type="checkbox"
          className="checkbox"
          id="checkbox"
          style={{ transition: "all 200ms" }}
          onChange={props.switchTheme} // onChange event handler to switch theme
        />
        {/* Label for checkbox with icons and ball */}
        <label htmlFor="checkbox" className="label">
          <i className="fas fa-moon fa-sm"></i> {/* Moon icon */}
          <i className="fas fa-sun fa-sm"></i> {/* Sun icon */}
          <div className="ball" /> {/* Ball for toggle effect */}
        </label>
      </div>
      {/* <button>Switch theme</button> */}
    </div>
  );
}
