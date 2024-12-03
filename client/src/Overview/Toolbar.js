import { useState } from "react";

function Toolbar({ handleCreate, showArchived, setShowArchived }) {
    const [newListName, setNewListName] = useState("");

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (newListName.trim()) {
            handleCreate(newListName.trim()); // This now calls the create list API
            setNewListName(""); // Clear the input after submission
        }
    };

    return (
        <div className="toolbar">
            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    placeholder="Enter list name"
                    required
                />
                <button type="submit">Create List</button>
            </form>
            <button onClick={() => setShowArchived(!showArchived)}>
                {showArchived ? "Hide Archived" : "Show Archived"}
            </button>
        </div>
    );
}

export default Toolbar;
