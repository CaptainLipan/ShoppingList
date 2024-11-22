import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Icon from "@mdi/react";
import { mdiAccountPlusOutline } from "@mdi/js";
import Avatar from "react-avatar"; // For avatar generation

import { DetailContext } from "./DetailProvider";
import { UserContext } from "../Users/UserProvider";
import AddMemberForm from "./AddMemberForm";

function Member({ memberId, data, isOwner, showRemoveButton, handlerMap }) {
    const handleRemove = () => {
        if (handlerMap?.removeMember) {
            handlerMap.removeMember(memberId); // Ensure removeMember function exists
        } else {
            console.warn("removeMember handler is not defined");
        }
    };

    return (
        <div
            className="d-flex align-items-center gap-2 p-2"
            style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: isOwner ? "#e8f4e5" : "#f9f9f9",
                minWidth: "200px",
            }}
        >
            {/* Avatar */}
            <Avatar name={data?.name || "User"} size="40" round={true} />
            <div className="flex-grow-1">
                <strong>{data?.name}</strong>
                {isOwner && <span style={{ fontSize: "0.8em", color: "#28a745" }}> (Owner)</span>}
            </div>
            {/* Remove button */}
            {showRemoveButton && (
                <Button
                    variant="danger"
                    size="sm"
                    onClick={handleRemove}
                >
                    Remove
                </Button>
            )}
        </div>
    );
}

function MemberList() {
    const { data, handlerMap } = useContext(DetailContext);
    const { userMap, userList, loggedInUser } = useContext(UserContext);
    const [show, setShow] = useState(false);

    return (
        <div
            style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
                maxWidth: "600px",
                margin: "0 auto",
            }}
        >
            {/* Add Member Form */}
            <AddMemberForm
                show={show}
                data={data}
                userList={userList}
                handlerMap={handlerMap}
                handleClose={() => setShow(false)}
            />

            {/* Member List */}
            <Row className="gap-3">
                {/* Owner */}
                <Col xs="auto">
                    <Member
                        key={data.owner} // Ensure unique key for the owner
                        memberId={data.owner}
                        data={userMap[data.owner]}
                        isOwner={true}
                    />
                </Col>
                {/* Members */}
                {data.memberList.map((memberId) => (
                    <Col key={memberId} xs="auto"> {/* Ensure unique key for each member */}
                        <Member
                            memberId={memberId}
                            data={userMap[memberId]}
                            handlerMap={handlerMap}
                            showRemoveButton={
                                loggedInUser === data.owner || memberId === loggedInUser
                            }
                        />
                    </Col>
                ))}
                {/* Add Member Button */}
                {data.owner === loggedInUser && (
                    <Col xs="auto" className="d-flex align-items-center">
                        <Button size="sm" onClick={() => setShow(true)} variant="success">
                            <Icon path={mdiAccountPlusOutline} size={1} />
                            Add Member
                        </Button>
                    </Col>
                )}
            </Row>
        </div>
    );
}

export default MemberList;
