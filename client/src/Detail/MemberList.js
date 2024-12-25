import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Icon from "@mdi/react";
import { mdiAccountPlusOutline } from "@mdi/js";
import Avatar from "react-avatar";

import { DetailContext } from "./DetailProvider";
import { UserContext } from "../Users/UserProvider";
import AddMemberForm from "./AddMemberForm";

function Member({ data, isOwner, showRemoveButton, handleRemove }) {
    return (
        <div
            className="d-flex align-items-center gap-3 p-2"
            style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                backgroundColor: isOwner ? "#e8f4e5" : "#f9f9f9",
                width: "100%",
            }}
        >
            <Avatar name={data?.name || "User"} size="40" round={true} />
            <div style={{ flexGrow: 1 }}>
                <strong>{data?.name || "Unknown User"}</strong>
                {isOwner && (
                    <span style={{ fontSize: "0.8em", color: "#28a745" }}>
            {" "}
                        (Owner)
          </span>
                )}
            </div>
            {showRemoveButton && (
                <Button
                    variant="danger"
                    size="sm"
                    onClick={handleRemove}
                    style={{ fontSize: "0.8em" }}
                >
                    Remove
                </Button>
            )}
        </div>
    );
}

function MemberList() {
    // DetailContext contains the "data" for the specific shopping list
    const { data, handlerMap } = useContext(DetailContext);
    // UserContext provides "loggedInUser" and "userList" (all users from /users)
    const { loggedInUser, userList = [] } = useContext(UserContext);

    const [show, setShow] = useState(false);

    // If your list data has "members" array
    const members = data?.members || [];

    // Check if the current user is the list's creator
    const isCreator = loggedInUser?.id === data?.creator?.id;

    return (
        <div
            style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
                maxWidth: "600px",
                margin: "0 auto",
                backgroundColor: "#fff",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
        >
            <h4 style={{ textAlign: "center", marginBottom: "16px" }}>Members</h4>

            {/* Display Members */}
            {members.length > 0 && (
                <Row className="gap-3">
                    {members.map((member) => (
                        <Col key={member.id || member._id} xs={12}>
                            <Member
                                data={member}
                                // Check if "member.id" is the same as the "creator.id"
                                isOwner={member.id === data.creator.id}
                                // Show "Remove" only if you're the creator and not removing yourself
                                showRemoveButton={isCreator && member.id !== data.creator.id}
                                handleRemove={() => {
                                    // Use your existing remove logic from handlerMap
                                    // or console.log it for now
                                    handlerMap.removeMember?.({ memberId: member.id });
                                }}
                            />
                        </Col>
                    ))}
                </Row>
            )}

            {/* Add Member Button (only if creator) */}
            {isCreator && (
                <div style={{ textAlign: "center", marginTop: "16px" }}>
                    <Button
                        onClick={() => setShow(true)}
                        variant="success"
                        size="sm"
                    >
                        <Icon path={mdiAccountPlusOutline} size={1} /> Add Member
                    </Button>
                </div>
            )}

            {/* Add Member Modal */}
            {isCreator && (
                <AddMemberForm
                    show={show}
                    handleClose={() => setShow(false)}
                    // Pass ALL users in the system from userList
                    userList={userList}
                    // Pass the IDs of current members to exclude them from the dropdown
                    memberList={members.map((m) => m.id)}
                    handlerMap={handlerMap}
                />
            )}
        </div>
    );
}

export default MemberList;
