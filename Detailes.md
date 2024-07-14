# Kanban Board Project

This project is a web-based Kanban board application built using React.js and `react-beautiful-dnd` for drag-and-drop functionality. It allows users to manage tasks across different boards, supporting features like adding/removing boards and cards, updating card details, and switching between light and dark themes.

## Files Overview

### `App.js`

The main entry point of the application. It manages the state of boards and cards using React hooks (`useState` and `useEffect`). The application's state is persisted in local storage to maintain data across sessions. Key functionalities include:

- **State Management**: Manages boards and cards using `useState` with initial data fetched from local storage.
- **Theme Switching**: Allows users to switch between light and dark themes.
- **Board Management Functions**: Functions for adding/removing boards and cards, updating card details, and handling drag-and-drop functionality between boards using `react-beautiful-dnd`.
- **Data Persistence**: Uses `useEffect` to store data in local storage whenever changes occur.

### `Navbar.js`

Component responsible for displaying the application title and theme switcher.

- **Title**: Displays "Kanban Board".
- **Theme Switcher**: Checkbox styled as a toggle switch to switch between light and dark themes.

### `Board.js`

Component for rendering individual boards with their respective cards.

- **Props**:
  - `id`: Unique identifier for the board.
  - `name`: Name/title of the board.
  - `card`: Array of cards within the board.
  - `setName`: Function to update the board's name.
  - `addCard`: Function to add a new card to the board.
  - `removeCard`: Function to remove a card from the board.
  - `removeBoard`: Function to remove the entire board.
  - `updateCard`: Function to update a card's details.

### `Editable.js`

Component for adding new boards with a form input.

- **Props**:
  - `class`: CSS class for styling purposes.
  - `name`: Default text displayed when no board is added.
  - `btnName`: Text displayed on the add board button.
  - `onSubmit`: Function triggered on form submission to add a new board.
  - `placeholder`: Placeholder text for the board name input field.

### `Modal.js`

Component for creating modal dialogs.

- **Props**:
  - `onClose`: Function to close the modal dialog.
  - `children`: Content to display within the modal.

### `Label.js`

Component for creating labels with specific colors.

- **Props**:
  - `tags`: Array of tags with colors.
  - `addTag`: Function to add a new tag with a specified color.
  - `onClose`: Function to close the label component.

### `Navbar.css`, `Board.css`, `Editable.css`, `Modal.css`, `Label.css`

CSS files providing styles for respective components to achieve desired visual presentation and user experience.

### `App.css`, `bootstrap.css`

Global CSS files providing additional styles and layout adjustments for the entire application.

