import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function NavBar({children}) {
    const location = useLocation();
    const pathname = location.pathname;
    return (
        <Link
            to={pathname === "/history" ? "/" : "history"}
            className={`transition ${
                pathname === "/history" ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"
            } `}
        >
            {children}
        </Link>
    );
}
