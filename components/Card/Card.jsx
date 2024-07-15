import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { MoreHorizontal } from "react-feather";
import CardDetails from "./CardDetails/CardDetails";
import "./Card.css";

const Card = (props) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <Draggable
      key={props.id.toString()}
      draggableId={props.id.toString()}
      index={props.index}
    >
      {(provided) => (
        <>
          {modalShow && (
            <CardDetails
              updateCard={props.updateCard}
              onClose={setModalShow}
              card={props.card}
              bid={props.bid}
              removeCard={props.removeCard}
            />
          )}

          <div
            className="custom__card"
            onClick={() => setModalShow(true)}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className="card__text">
              <p>{props.title}</p>
              <MoreHorizontal
                className="car__more"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent modal from opening
                  // Implement dropdown functionality here if needed
                }}
              />
            </div>
            {provided.placeholder}
          </div>
        </>
      )}
    </Draggable>
  );
};

export default Card;
