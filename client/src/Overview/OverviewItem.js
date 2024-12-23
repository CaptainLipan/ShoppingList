import { Link } from "react-router-dom";

function OverviewItem({ list, handleArchive, handleDelete, loggedInUser }) {
    return (
        <div className="overview-item card">
            <div className="card-body">
                <h5 className="card-title">
                    <Link to={`/detail/${list._id}`}>{list.name}</Link>
                </h5>

                {/* Show Archive button only if the logged-in user is the creator */}
                {list.creator === loggedInUser._id && (
                    <button
                        className="btn btn-secondary"
                        onClick={() => handleArchive(list._id, list.isArchived)}
                    >
                        {list.isArchived ? "Unarchive" : "Archive"}
                    </button>
                )}

                {/* Show Delete button only if the logged-in user is the creator */}
                {list.creator === loggedInUser._id && (
                    <button
                        className="btn btn-danger"
                        onClick={() => {
                            if (window.confirm("Are you sure you want to delete this list?")) {
                                handleDelete(list._id); // Call handleDelete only if confirmed
                            }
                        }}
                    >
                        Delete
                    </button>
                )}
            </div>
        </div>
    );
}

export default OverviewItem;
