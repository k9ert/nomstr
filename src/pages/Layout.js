import { Outlet } from "react-router-dom";
import { Alert } from "../Lib.js"
import { TopNavBar } from "../components/TopNavBar.js"
import { AddBookmarkOverlay } from "../components/AddBookmark.js"

const Layout = () => {
    return (
    <>
        <div className="App bg-blue-700">

            <TopNavBar/>
            <AddBookmarkOverlay/>
            <Alert text="alert Text!!"/>
            <div className='grid grid-cols-6'>
                <Outlet/>
            </div>
            
        </div>

    </>
    );
}

export {Layout}