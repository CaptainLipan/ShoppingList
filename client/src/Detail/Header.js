import { useContext, useState } from "react";
import { UserContext } from "../Users/UserProvider.js";
import { FaUserCircle } from "react-icons/fa";
import  "../Styles/Header.css"

function Header() {
    const { userList, loggedInUser, setLoggedInUser } = useContext(UserContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    return (
        <nav className="navbar d-flex justify-content-between align-items-center px-3">


            <div className="navbar-brand">AppName</div>

            <div className="navbar-right position-relative">
                <button
                    className="profile-icon btn"
                    onClick={toggleDropdown}
                >
                    <FaUserCircle size={24} />
                </button>

                {dropdownOpen && (
                    <div className="dropdown-menu show">
                        {userList.map((user) => (
                            <button
                                key={user.id}
                                className={`dropdown-item ${user.id === loggedInUser ? 'active' : ''}`}
                                onClick={() => {
                                    setLoggedInUser(user.id);
                                    setDropdownOpen(false);
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
