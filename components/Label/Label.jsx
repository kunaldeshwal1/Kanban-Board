import React, { useRef, useState } from "react";
import { Check, X } from "react-feather";
import "./Label.css";

export default function Label(props) {
  const input = useRef(); // Ref for the input field
  const [selectedColor, setSelectedColor] = useState(""); // State to track selected color
  const [label, setLabel] = useState(""); // State to hold label name

  // Function to check if a color is already used by existing tags
  const isColorUsed = (color) => {
    const isFound = props.tags.find((item) => item.color === color);
    return isFound ? true : false;
  };

  return (
    <div className="local__bootstrap">
      <div className="popover__wrapper">
        <div className="popover__content mb-2">
          <div className="label__heading d-flex justify-content-between my-2">
            <p style={{ fontSize: "15px" }} className="text-center">
              <b>Label</b>
            </p>
            <X
              onClick={() => props.onClose(false)}
              style={{ cursor: "pointer", width: "15px", height: "15px" }}
            />
          </div>
          <div className="row">
            {/* Label Name Input */}
            <p className="my-1 label__label">Name</p>
            <div className="col-12 label__input">
              <input
                type="text"
                ref={input}
                defaultValue={label}
                placeholder="Name of label"
                onChange={(e) => setLabel(e.target.value)}
              />
            </div>
            {/* Color Selection */}
            <p className="my-2 label__label">Select color</p>
            <div className="d-flex justify-content-between color__palette flex-wrap mb-2">
              {props.color.map((item, index) => (
                <span
                  key={index}
                  onClick={() => setSelectedColor(item)}
                  className={isColorUsed(item) ? "disabled__color" : ""}
                  style={{ backgroundColor: item, cursor: "pointer" }}
                >
                  {/* Render checkmark if color is selected */}
                  {selectedColor === item && <Check className="icon__sm" />}
                </span>
              ))}
            </div>
            {/* Create Button */}
            <div>
              <button
                className="create__btn my-2"
                onClick={() => {
                  if (label.trim() === "") {
                    alert("Please enter a label name.");
                  } else if (selectedColor === "") {
                    alert("Please select a color for the label.");
                  } else {
                    props.addTag(label, selectedColor); // Call addTag function from props
                    setSelectedColor(""); // Reset selected color
                    setLabel(""); // Reset label text
                    input.current.value = ""; // Clear input field
                  }
                }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
