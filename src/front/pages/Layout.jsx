import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"


export const Layout = () => {

    return (
        <div className="d-flex flex-column min-vh-100">
            <ScrollToTop>
                <Navbar />
                <Outlet />
                <Footer />
            </ScrollToTop>
        </div>
    )
} 