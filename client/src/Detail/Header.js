import { useContext, useState, useEffect } from "react";
import { UserContext } from "../Users/UserProvider.js";
import { getAllUsers } from "../api/userApi"; // API to fetch users
import { FaUserCircle } from "react-icons/fa";
import "../Styles/Header.css";

function Header() {
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);
    const [userList, setUserList] = useState([]); // Dynamically fetched users
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    useEffect(() => {
        if (dropdownOpen) {
            // Fetch users only when the dropdown is opened
            const fetchUsers = async () => {
                try {
                    const users = await getAllUsers(); // Fetch users from the backend
                    setUserList(users);
                } catch (err) {
                    console.error("Error fetching users:", err);
                }
            };
            fetchUsers();
        }
    }, [dropdownOpen]);

    return (
        <nav className="navbar d-flex justify-content-between align-items-center px-3">
            {/* Brand Name */}
            <div className="navbar-brand">Shopping list</div>

            {/* User Dropdown */}
            <div className="navbar-right position-relative">
                <button
                    className="profile-icon btn"
                    onClick={toggleDropdown}
                    aria-expanded={dropdownOpen}
                >
                    <FaUserCircle size={24} />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                    <div className="dropdown-menu show">
                        {(userList || []).map((user) => (
                            <button
                                key={user.id}
                                className={`dropdown-item ${
                                    user.id === loggedInUser?.id ? "active" : ""
                                }`}
                                onClick={() => {
                                    setLoggedInUser(user); // Switch the logged-in user
                                    setDropdownOpen(false); // Close dropdown
                                }}
                            >
                                {user.name}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Header;
