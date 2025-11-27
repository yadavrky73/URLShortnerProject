import React from "react";
import Navbar from "./Navbar";
import MobileNavbar from "./MobileNavbar";
export default function Header() {
    return (
        <header className="sticky top-0 bg-white shadow-md z-50">
            <div className="container flex items-center gap-4 h-16">
                <MobileNavbar />
                <Navbar />
            </div>
        </header>
    );
}
