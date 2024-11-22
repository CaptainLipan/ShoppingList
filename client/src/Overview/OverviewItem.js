import { Link } from "react-router-dom";

function OverviewItem({ toDoList, handleArchive, handleDelete }) {
    return (
        <div className="overview-item">
            <h3>
                <Link to={`/detail/${toDoList.id}`}>{toDoList.name}</Link>
            </h3>
            <p>Owner: {toDoList.owner}</p>
            <button onClick={() => handleArchive({ id: toDoList.id })}>
                Archive
            </button>
            <button onClick={() => handleDelete({ id: toDoList.id })}>
                Delete
            </button>
        </div>
    );
}

export default OverviewItem;
