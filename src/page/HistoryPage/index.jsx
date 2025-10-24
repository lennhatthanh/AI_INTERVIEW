import SessionList from "@/components/SessionList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

export default function HistoryPage() {
    const [listSession, setListSession] = useState(JSON.parse(localStorage.getItem("listSession")) || []);
    const [search, setSearch] = useState("");
    const newSearchList = listSession.filter(
        (item) =>
            item.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
            item.level.toLowerCase().includes(search.toLowerCase())
    );
    function handleDeleteAll() {
        const confirmDelete = window.confirm("Are you sure you want to delete all history?");
        if (confirmDelete) {
            localStorage.setItem("listSession", "[]")
            setListSession([])
        } else {
            console.log("Hủy xóa");
        }
    }
    return (
        <div>
            <div className="mb-6">
                <h2 class="text-2xl font-bold mb-4">Interview History</h2>
                <div className="flex gap-4">
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by job title or level..."
                    />
                    <Button onClick={handleDeleteAll}>DeleteAll</Button>
                </div>
            </div>
            <SessionList listSession={newSearchList} />
        </div>
    );
}
