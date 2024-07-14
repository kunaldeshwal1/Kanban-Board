import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd"; // Draggable component for drag-and-drop functionality
import { Calendar, CheckSquare, Clock, MoreHorizontal } from "react-feather"; // Icons for card features
import Dropdown from "../Dropdown/Dropdown"; // Dropdown component for additional options
import Modal from "../Modal/Modal"; // Modal component for detailed card view
import Tag from "../Tags/Tag"; // Tag component for displaying tags
import "./Card.css"; // CSS file for styling the Card component
import CardDetails from "./CardDetails/CardDetails"; // Detailed view of the card

const Card = (props) => {
  // State variables
  const [dropdown, setDropdown] = useState(false); // Toggle for showing dropdown menu
  const [modalShow, setModalShow] = useState(false); // Toggle for showing detailed card view modal

  return (
    <Draggable
      key={props.id.toString()} // Unique key for React reconciliation
      draggableId={props.id.toString()} // Unique identifier for the draggable item
      index={props.index} // Index of the item in the list
    >
      {(provided) => ( // Render props pattern to access provided props by react-beautiful-dnd
        <>
          {/* Modal for detailed card view */}
          {modalShow && (
            <CardDetails
              updateCard={props.updateCard}
              onClose={setModalShow}
              card={props.card}
              bid={props.bid}
              removeCard={props.removeCard}
            />
          )}

          {/* Main card container */}
          <div
            className="custom__card"
            onClick={() => {
              setModalShow(true); // Show detailed card view modal on click
            }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {/* Card title and more options icon */}
            <div className="card__text">
              <p>{props.title}</p>
              <MoreHorizontal
                className="car__more"
                onClick={() => {
                  setDropdown(true); // Show dropdown menu on click
                }}
              />
            </div>

            {/* Tags associated with the card */}
            <div className="card__tags">
              {props.tags?.map((item, index) => (
                <Tag key={index} tagName={item.tagName} color={item.color} />
              ))}
            </div>

            {/* Card footer section */}
            <div className="card__footer">
              {/* Task completion status */}
              {props.card.task.length !== 0 && (
                <div className="task">
                  <CheckSquare />
                  <span>
                    {props.card.task.length !== 0
                      ? `${
                          props.card.task?.filter(
                            (item) => item.completed === true
                          ).length
                        } / ${props.card.task.length}`
                      : `${"0/0"}`}
                  </span>
                </div>
              )}
            </div>

            {provided.placeholder} {/* Placeholder for drag-and-drop effect */}
          </div>
        </>
      )}
    </Draggable>
  );
};

export default Card;
