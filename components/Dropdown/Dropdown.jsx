import React, { useRef, useEffect } from 'react';
import './Dropdown.css'; // CSS file for styling the dropdown

const Dropdown = (props) => {
    const dropRef = useRef(); // Ref for the dropdown element

    // Function to handle clicks outside the dropdown
    const handleClick = (event) => {
        // Check if click is outside dropdown and onClose prop is defined
        if (dropRef && !dropRef.current.contains(event.target) && props.onClose) {
            props.onClose(); // Call onClose function provided by parent
        }
    };

    // Effect hook to add and remove event listener on component mount/unmount
    useEffect(() => {
        document.addEventListener("click", handleClick, { capture: true }); // Add click event listener on document

        return () => {
            document.removeEventListener("click", handleClick, { capture: true }); // Remove event listener on cleanup
        };
    }, []); // Empty dependency array ensures effect runs only once on mount

    return (
        <div
            ref={dropRef} // Assign ref to the div element
            className={`dropdown ${props.class ? props.class : ""}`} // Conditional class assignment based on props
        >
            {props.children} {/* Render children components inside the dropdown */}
        </div>
    );
};

export default Dropdown;
