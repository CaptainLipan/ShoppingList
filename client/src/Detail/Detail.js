import React, { useState, useEffect } from "react";
import Header from "./Header";
import Toolbar from "./Toolbar";
import MemberList from "./MemberList";
import ItemList from "./ItemList";
import DetailProvider from "./DetailProvider";
import CreateListModal from "../Overview/CreateList";
import "../Styles/Detail.css";

function Detail() {
    const [showModal, setShowModal] = useState(false);
    const [lists, setLists] = useState(() => {
        // Load saved lists from local storage on initial render
        const savedLists = localStorage.getItem("shoppingLists");
        return savedLists ? JSON.parse(savedLists) : [];
    });

    useEffect(() => {
        // Save lists to local storage whenever they change
        localStorage.setItem("shoppingLists", JSON.stringify(lists));
    }, [lists]);

    const handleAddList = (newList) => {
        setLists((prevLists) => [...prevLists, newList]);
    };

    return (
        <div>
            <DetailProvider>
                <div className="container">
                    <div className="left-section">
                        <div className="navbar-left d-flex">
                        </div>
                        <Toolbar />
                        <MemberList />
                    </div>
                    <div className="right-section">
                        <Header />
                        <ItemList />
                    </div>
                </div>

                {/* CreateListModal */}
                <CreateListModal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    onAddList={handleAddList}
                />
            </DetailProvider>
        </div>
    );
}

export default Detail;
