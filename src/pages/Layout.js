import { Outlet } from "react-router-dom";
import { TopNavBar, Alert } from "../Lib.js"

const Layout = () => {
    return (
        <div className="App bg-blue-700">
            <TopNavBar/>
            <Alert text="alert Text!!"/>
            <Outlet/>
        </div>
    );
}

export {Layout}