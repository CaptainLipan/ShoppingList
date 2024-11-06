import Header from "./Header";
import Toolbar from "./Toolbar";
import MemberList from "./MemberList";
import ItemList from "./ItemList";
import DetailProvider from "./DetailProvider";
import '../Styles/Detail.css'; // Import your CSS file

function Detail() {
    return (
        <div>
            <DetailProvider>


                <div className="container">
                    <div className="left-section">
                        <div className="navbar-left d-flex">
                            <button className="btn btn-danger mx-2">New List</button>
                            <button className="btn btn-danger mx-2">Button 2</button>
                        </div>
                        <Toolbar />
                        <MemberList />
                    </div>
                    <div className="right-section">
                        <Header />
                        <ItemList />
                    </div>
                </div>
            </DetailProvider>
        </div>
    );
}

export default Detail;