import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function AddMemberForm({
                           show,
                           handleClose,
                           // All users from the system
                           userList = [],
                           // IDs of the current members
                           memberList = [],
                           // For adding/removing members, etc.
                           handlerMap = {},
                       }) {
    const [selectedUser, setSelectedUser] = useState("");

    const handleAddMember = () => {
        if (selectedUser && handlerMap.addMember) {
            // Pass the selected ID to addMember
            handlerMap.addMember({ memberId: selectedUser });
        }
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add a Member</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div style={{ marginBottom: "1rem" }}>
                    <select
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                        style={{ width: "100%" }}
                    >
                        <option value="">-- Select a User --</option>
                        {userList
                            // Show only users *not* in the memberList
                            .filter((user) => !memberList.includes(user.id))
                            .map((user) => (
                                <option key={user.id || user._id} value={user.id}>
                                    {user.name || "Unknown User"}
                                </option>
                            ))}
                    </select>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    disabled={!selectedUser}
                    onClick={handleAddMember}
                >
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddMemberForm;
