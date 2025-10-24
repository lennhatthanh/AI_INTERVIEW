import React from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import QuestionList from "../QuestionList";
export default function DialogHistory({ open, setOpen, session }) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form>
                <DialogContent className="sm:max-w-[425px] max-h-[500px] overflow-auto p-0">
                    <DialogHeader className="border-b border-border">
                        <div className="p-4">
                            <h2 class="text-xl font-bold text-foreground">{session.jobTitle}</h2>
                            <p class="text-sm text-muted-foreground">
                                {session.level} • {session.language}
                            </p>
                        </div>
                    </DialogHeader>
                    <div className="px-4">
                        <QuestionList session={session?.question} />
                    </div>
                </DialogContent>
            </form>
        </Dialog>
    );
}
