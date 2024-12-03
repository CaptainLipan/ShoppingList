import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/CreateList.css';
import { createShoppingList } from '../api/shoppingListApi'; // Import API function

function CreateList() {
    const navigate = useNavigate();

    const [listName, setListName] = useState('');
    const [email, setEmail] = useState('');
    const [members, setMembers] = useState([]);

    const handleAddMember = () => {
        if (email.trim() && !members.includes(email)) {
            setMembers((prev) => [...prev, email]);
            setEmail(''); // Clear input after adding
        }
    };

    const handleRemoveMember = (member) => {
        setMembers((prev) => prev.filter((m) => m !== member));
    };

    const handleCreate = async () => {
        if (listName.trim()) {
            try {
                // Call the API to create the shopping list
                const newList = await createShoppingList({ name: listName, members });
                console.log('List Created:', newList);
                navigate('/'); // Navigate back to the main page
            } catch (error) {
                console.error("Error creating the shopping list:", error);
                alert("An error occurred while creating the list. Please try again.");
            }
        } else {
            alert('List name is required!');
        }
    };

    return (
        <div className="create-list-container">
            <header className="create-list-header">Create New List</header>
            <form
                className="create-list-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleCreate();
                }}
            >
                {/* Input for List Name */}
                <input
                    type="text"
                    placeholder="Enter list name"
                    className="input-field"
                    value={listName}
                    onChange={(e) => setListName(e.target.value)}
                />

                {/* Section to Add Members */}
                <div className="add-people-section">
                    <input
                        type="email"
                        placeholder="Add people by Email"
                        className="input-field"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        type="button"
                        className="add-btn"
                        onClick={handleAddMember}
                    >
                        +
                    </button>
                </div>

                {/* List of Members */}
                <div className="members-list">
                    {members.map((member, index) => (
                        <div key={index} className="member-item">
                            {member}
                            <button
                                type="button"
                                className="remove-btn"
                                onClick={() => handleRemoveMember(member)}
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="button-group">
                    <button
                        type="button"
                        className="btn btn-cancel"
                        onClick={() => navigate('/')}
                    >
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-create">
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateList;
