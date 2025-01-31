import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "../components/Navbar/Navbar";
import Board from "../components/Board/Board";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import Editable from "../components/Editable/Editable";
import useLocalStorage from "use-local-storage";
import "../bootstrap.css";

function App() {
  // Load initial data from local storage if it exists, otherwise use default
  const initialData = JSON.parse(localStorage.getItem("kanban-board")) || [
    { id: "todo", boardName: "To do", card: [] },
    { id: "inprogress", boardName: "In Progress", card: [] },
    { id: "peerreview", boardName: "Peer Review", card: [] },
    { id: "done", boardName: "Done", card: [] },
  ];

  // State to manage boards and cards
  const [data, setData] = useState(initialData);

  // State for managing theme (light/dark mode) using local storage
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );

  // Function to toggle theme
  const switchTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Function to update board name
  const setName = (title, bid) => {
    const index = data.findIndex((item) => item.id === bid);
    const tempData = [...data];
    tempData[index].boardName = title;
    setData(tempData);
  };

  // Function to move cards between boards
  const dragCardInBoard = (source, destination) => {
    let tempData = [...data];
    const destinationBoardIdx = tempData.findIndex(
      (item) => item.id.toString() === destination.droppableId
    );
    const sourceBoardIdx = tempData.findIndex(
      (item) => item.id.toString() === source.droppableId
    );
    tempData[destinationBoardIdx].card.splice(
      destination.index,
      0,
      tempData[sourceBoardIdx].card[source.index]
    );
    tempData[sourceBoardIdx].card.splice(source.index, 1);
    return tempData;
  };

  // Function to add a new card to a board
  const addCard = (title, bid) => {
    const index = data.findIndex((item) => item.id === bid);
    const tempData = [...data];
    tempData[index].card.push({
      id: uuidv4(),
      title: title,
      tags: [],
      task: [],
    });
    setData(tempData);
  };

  // Function to remove a card from a board
  const removeCard = (boardId, cardId) => {
    const index = data.findIndex((item) => item.id === boardId);
    const tempData = [...data];
    const cardIndex = data[index].card.findIndex((item) => item.id === cardId);
    tempData[index].card.splice(cardIndex, 1);
    setData(tempData);
  };

  // Function to add a new board
  const addBoard = (title) => {
    const tempData = [...data];
    tempData.push({
      id: uuidv4(),
      boardName: title,
      card: [],
    });
    setData(tempData);
  };

  // Function to remove a board
  const removeBoard = (bid) => {
    const tempData = [...data];
    const index = data.findIndex((item) => item.id === bid);
    tempData.splice(index, 1);
    setData(tempData);
  };

  // Function to handle card drag and drop within boards
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return; // If dropped outside any droppable area, return

    if (source.droppableId === destination.droppableId) return; // If dropped within the same board, return

    setData(dragCardInBoard(source, destination)); // Update state to reflect the dragged card moved to the destination board
  };

  // Function to update a card's details
  const updateCard = (bid, cid, card) => {
    const index = data.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...data];
    const cards = tempBoards[index].card;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    tempBoards[index].card[cardIndex] = card;
    setData(tempBoards);
  };

  // Effect to update local storage when data changes
  useEffect(() => {
    localStorage.setItem("kanban-board", JSON.stringify(data));
  }, [data]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App" data-theme={theme}>
        <Navbar switchTheme={switchTheme} theme={theme} />
        <div className="app_outer">
          <div className="app_boards">
            {/* Rendering each board component */}
            {data.map((item) => (
              <Board
                key={item.id}
                id={item.id}
                name={item.boardName}
                card={item.card}
                setName={setName}
                addCard={addCard}
                removeCard={removeCard}
                removeBoard={removeBoard}
                updateCard={updateCard}
              />
            ))}
       
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
