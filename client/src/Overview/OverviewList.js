import OverviewItem from "./OverviewItem";
import "../Styles/OverviewList.css";

function OverviewList({ OverviewList = [], handleArchive, handleDelete }) {
    console.log("OverviewList data received:", OverviewList); // Debugging

    if (OverviewList.length === 0) {
        return <p>No items to display</p>;
    }

    return (
        <div className="overview-list">
            {OverviewList.map((toDoList) => (
                <OverviewItem
                    key={toDoList._id}
                    toDoList={toDoList}
                    handleArchive={handleArchive}
                    handleDelete={handleDelete}
                />
            ))}
        </div>
    );
}

export default OverviewList;
