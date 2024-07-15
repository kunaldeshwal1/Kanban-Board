import React, { useEffect, useState } from "react";
import Card from "../Card/Card"; // Assuming Card component is defined in Card.js
import "./Board.css"; // CSS file for styling specific to Board component
import { MoreHorizontal } from "react-feather"; // Icon component for more options
import Editable from "../Editable/Editable"; // Custom editable text component
import Dropdown from "../Dropdown/Dropdown"; // Dropdown menu component
import { Droppable } from "react-beautiful-dnd"; // Droppable area for drag-and-drop functionality

export default function Board(props) {
  // State variables
  const [show, setShow] = useState(false); // Toggle for showing input field for board title edit
  const [dropdown, setDropdown] = useState(false); // Toggle for showing dropdown menu
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Effect to handle Enter keypress to close edit mode
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === "Enter") setShow(false);
    };
    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  // Filtering cards based on search query
  const filteredCards = props.card?.filter((items) =>
    items.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="board">
      {/* Board title section */}
      <div className="board__top">
        {show ? (
          // Editable title input field
          <div>
            <input
              className="title__input"
              type="text"
              defaultValue={props.name}
              onChange={(e) => {
                props.setName(e.target.value, props.id);
              }}
            />
          </div>
        ) : (
          // Displaying board title and card count
          <div>
            <p
              onClick={() => {
                setShow(true);
              }}
              className="board__title"
            >
              {props?.name || "Name of Board"}
              <span className="total__cards">{props.card?.length}</span>
            </p>
          </div>
        )}
        {/* More options dropdown */}
        <div
          onClick={() => {
            setDropdown(true);
          }}
        >
          <MoreHorizontal />
          {/* Dropdown menu for board options */}
          {dropdown && (
            <Dropdown
              class="board__dropdown"
              onClose={() => {
                setDropdown(false);
              }}
            >
              <p onClick={() => props.removeBoard(props.id)}>Delete Board</p>
            </Dropdown>
          )}
        </div>
      </div>
      
      {/* Conditional rendering of search input */}
      {props.card?.length > 0 && (
        <input
          type="text"
          className="search__input"
          placeholder="Search Task..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      )}
      
      {/* Droppable area for cards using react-beautiful-dnd */}
      <Droppable droppableId={props.id.toString()}>
        {(provided) => (
          <div
            className="board__cards"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {/* Mapping and rendering filtered cards */}
            {filteredCards?.map((items, index) => (
              <Card
                bid={props.id}
                id={items.id}
                index={index}
                key={items.id}
                title={items.title}
                tags={items.tags}
                updateCard={props.updateCard}
                removeCard={props.removeCard}
                card={items}
              />
            ))}
            {provided.placeholder} {/* Placeholder for dragging effect */}
          </div>
        )}
      </Droppable>
      
      {/* Footer section for adding new tasks */}
      {props.name === "To do" && (
        <div className="board__footer">
          <Editable
            name={"Add Task"}
            btnName={"Add Task"}
            placeholder={"Enter Task"}
            onSubmit={(value) => props.addCard(value, props.id)}
          />
        </div>
      )}
    </div>
  );
}
