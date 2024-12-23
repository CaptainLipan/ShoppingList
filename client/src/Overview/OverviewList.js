import { useContext } from "react";
import { UserContext } from "../Users/UserProvider";
import OverviewItem from "./OverviewItem";
import "../Styles/OverviewList.css";

function OverviewList({ OverviewList = [], handleArchive, handleDelete }) {
    const { loggedInUser } = useContext(UserContext); // Access loggedInUser from UserContext

    if (OverviewList.length === 0) {
        return <p>No items to display</p>;
    }

    return (
        <div className="overview-list">
            {OverviewList.map((list) => (
                <OverviewItem
                    key={list._id}
                    list={list} // Pass the entire list object
                    handleArchive={handleArchive}
                    handleDelete={handleDelete}
                    loggedInUser={loggedInUser} // Pass loggedInUser to OverviewItem
                />
            ))}
        </div>
    );
}

export default OverviewList;
