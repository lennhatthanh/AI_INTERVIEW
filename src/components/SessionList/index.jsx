import { useState } from "react";
import DialogHistory from "../DialogHistory";

export default function SessionList({ listSession }) {
    const [open, setOpen] = useState(false);
    const [session, setSession] = useState({});

    const handleClickItem = (value) => {
        setSession(value);
        setOpen(true);
    }
    return (
        <div className="space-y-3">
            {listSession.map((item) => (
                <div key={item.id} onClick={() => handleClickItem(item)} class="border border-border rounded-lg p-4 bg-card hover:border-primary/50 transition cursor-pointer group">
                    <div class="flex items-start justify-between gap-4">
                        <button class="flex-1 text-left hover:opacity-80 transition">
                            <div class="flex items-center gap-3 mb-2">
                                <h3 class="font-semibold text-foreground">{item.jobTitle}</h3>
                                <span class="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                                    {item.level}
                                </span>
                                <span class="px-2 py-1 bg-secondary/10 text-secondary-foreground text-xs rounded-full">
                                    {item.language}
                                </span>
                            </div>
                            <p class="text-sm text-muted-foreground">
                                {new Date(item.timespace).toLocaleString("en-US", {
                                    timeZone: "Asia/Ho_Chi_Minh",
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                })}
                            </p>
                            <p class="text-xs text-muted-foreground mt-1">4 questions</p>
                        </button>
                        <button class="p-2 hover:bg-destructive/10 rounded-lg transition opacity-0 group-hover:opacity-100">
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
                                class="lucide lucide-trash2 w-4 h-4 text-destructive"
                            >
                                <path d="M3 6h18"></path>
                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                <line x1="10" x2="10" y1="11" y2="17"></line>
                                <line x1="14" x2="14" y1="11" y2="17"></line>
                            </svg>
                        </button>
                    </div>
                </div>
            ))}
            <DialogHistory open={open} setOpen={setOpen} session={session}/>
        </div>
    );
}
