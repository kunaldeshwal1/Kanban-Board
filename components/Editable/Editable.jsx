import React, { useState } from "react";
import { Plus, X } from "react-feather"; // Importing icons from react-feather library
import "./Editable.css"; // Importing CSS styles for Editable component

const Editable = (props) => {
  const [show, setShow] = useState(props?.handler || false); // State to manage whether the input/editable area is shown
  const [text, setText] = useState(props.defaultValue || ""); // State to manage the text/value of the editable area

  // Function to handle form submission
  const handleOnSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (text && props.onSubmit) { // Check if there is text and onSubmit prop is defined
      setText(""); // Clear the text value
      props.onSubmit(text); // Call the onSubmit function passed via props
    }
    setShow(false); // Hide the editable area after submission
  };

  return (
    <div className={`editable ${props.parentClass}`}> {/* Container div with dynamic classes */}
      {show ? ( // Conditionally render based on 'show' state
        <form onSubmit={handleOnSubmit}> {/* Form for editing */}
          <div className={`editable__input ${props.class}`}> {/* Container for input area */}
            <textarea
              placeholder={props.placeholder} // Placeholder text for textarea
              autoFocus // Autofocus on textarea when shown
              id={"edit-input"} // Unique id for textarea
              type={"text"} // Type of textarea (text)
              onChange={(e) => setText(e.target.value)} // Handle input change
            />
            <div className="btn__control"> {/* Container for buttons */}
              <button className="add__btn" type="submit">
                {`${props.btnName}` || "Add"} {/* Submit button text, defaulting to 'Add' */}
              </button>
              <X
                className="close" // Close button styling
                onClick={() => {
                  setShow(false); // Hide the editable area
                  props?.setHandler(false); // Call setHandler function if provided via props
                }}
              />
            </div>
          </div>
        </form>
      ) : (
        <p
          onClick={() => {
            setShow(true); // Show the editable area on click
          }}
        >
          {props.defaultValue === undefined ? <Plus /> : <></>} {/* Conditional rendering of Plus icon */}
          {props?.name || "Add"} {/* Display name, defaulting to 'Add' */}
        </p>
      )}
    </div>
  );
};

export default Editable; // Export Editable component
