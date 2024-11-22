import OverviewItem from "./OverviewItem";

function OverviewList({ OverviewList = [], handleArchive, handleDelete }) {
    if (OverviewList.length === 0) {
        return <p>No items to display</p>; // Handle empty data gracefully
    }

    return (
        <div>
            {OverviewList.map((toDoList) => (
                <OverviewItem
                    key={toDoList.id}
                    toDoList={toDoList}
                    handleArchive={handleArchive}
                    handleDelete={handleDelete}
                />
            ))}
        </div>
    );
}

export default OverviewList;
