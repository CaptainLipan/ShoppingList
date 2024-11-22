import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function CreateListModal({ show, onClose, onAddList }) {
    const [listName, setListName] = useState("");

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (listName.trim() === "") {
            alert("List name is required!");
            return;
        }
        onAddList({ name: listName }); // Pass the new list data to the parent
        setListName(""); // Clear the input field
        onClose(); // Close the modal
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>List Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={listName}
                            onChange={(e) => setListName(e.target.value)}
                            placeholder="Enter list name"
                            required
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Create
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default CreateListModal;
