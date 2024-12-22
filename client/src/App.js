import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OverviewProvider from "./Overview/OverviewProvider";
import Detail from "./Detail/Detail";
import UserProvider from "./Users/UserProvider";

function App() {
    return (
        <div className="App">
            <UserProvider>

                <Router>
                    <Routes>
                        {/* Overview page */}
                        <Route path="/" element={<OverviewProvider />} />

                        {/* Detail page */}
                        <Route path="/detail/:id" element={<Detail />} />
                    </Routes>
                </Router>
            </UserProvider>
        </div>
    );
}

export default App;
