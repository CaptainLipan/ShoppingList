import { useContext, useState } from "react";
import { UserContext } from "../Users/UserProvider";
import { DetailContext } from "./DetailProvider";
import AddMemberForm from "./AddMemberForm";

function MemberList() {
    const { data, handlerMap } = useContext(DetailContext);
    const { userList, loggedInUser } = useContext(UserContext); // Get userList and loggedInUser
    const [show, setShow] = useState(false);

    if (!data) return <p>Loading members...</p>;

    const isCreator = loggedInUser?.id === data.owner; // Check if logged-in user is the creator

    return (
        <div>
            {/* Add Member Form */}
            {isCreator && (
                <AddMemberForm
                    show={show}
                    handleClose={() => setShow(false)}
                    userList={userList} // Pass all users
                    memberList={data.memberList || []} // Pass current members to exclude
                    handlerMap={handlerMap}
                />
            )}

            {/* Display Members */}
            <div>

                {data.memberList.map((memberId) => (
                    <p key={memberId}>{userList.find((user) => user.id === memberId)?.name || "Unknown User"}</p>
                ))}
            </div>

            {/* Add Member Button (Visible to Creator Only) */}
            {isCreator && (
                <button onClick={() => setShow(true)}>Add Member</button>
            )}
        </div>
    );
}

export default MemberList;
