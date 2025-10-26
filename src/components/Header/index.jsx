import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import NavBar from "../NavBar";

export default function Header() {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const location = useLocation();
    const pathname = location.pathname;
    const handleTheme = () => {
        theme === "light" ? setTheme("dark") : setTheme("light");
    };
    useEffect(() => {
        theme === "dark" ? document.body.classList.add("dark") : document.body.classList.remove("dark");
        localStorage.setItem("theme", theme);
    }, [theme]);
    return (
        <header className="border-b border-border bg-card">
            <div className="container mx-auto p-4">
                <div className="flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2">
                        <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                            <span class="text-primary-foreground font-bold text-sm">AI</span>
                        </div>
                        <h1 class="text-xl font-bold text-foreground hidden sm:block">Interview Generator</h1>
                    </Link>
                    <span class="flex items-center gap-6">
                        <Link
                            to={"/"}
                            className={`transition ${
                                pathname === "/"
                                    ? "text-primary font-semibold"
                                    : "text-muted-foreground hover:text-foreground"
                            } `}
                        >
                            Generate
                        </Link>
                        <Link
                            to={"/history"}
                            className={`transition ${
                                pathname === "/history"
                                    ? "text-primary font-semibold"
                                    : "text-muted-foreground hover:text-foreground"
                            } `}
                        >
                            History
                        </Link>
                        <button
                            onClick={handleTheme}
                            class="p-2 rounded-lg hover:bg-muted transition"
                            aria-label="Toggle theme"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="lucide lucide-moon w-5 h-5"
                            >
                                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                            </svg>
                        </button>
                    </span>
                </div>
            </div>
        </header>
    );
}
