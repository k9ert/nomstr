import { Outlet } from "react-router-dom";
import { TopNavBar, Alert } from "../Lib.js"
import { AddBookmarkOverlay } from "../components/AddBookmark.js"

const Layout = () => {
    return (
    <>
        <div className="App bg-blue-700">

            <TopNavBar/>
            <AddBookmarkOverlay/>
            <Alert text="alert Text!!"/>
            <Outlet/>
        </div>

    </>
    );
}

export {Layout}