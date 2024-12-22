import { Link } from "react-router-dom";

function OverviewItem({ toDoList, handleArchive, handleDelete }) {
    return (
        <div className="overview-item card">
            <div className="card-body">
                <h5 className="card-title">
                    <Link to={`/detail/${toDoList._id}`}>{toDoList.name}</Link>
                </h5>
                <button
                    className="btn btn-secondary"
                    onClick={() => handleArchive(toDoList._id)}
                >
                    Archive
                </button>
                <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(toDoList._id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default OverviewItem;
