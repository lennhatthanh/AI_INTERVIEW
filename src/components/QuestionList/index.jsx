import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
export default function QuestionList({ session }) {
    return (
        <div className="space-y-4">
            {session.length > 0 ? (
                <Accordion type="single" collapsible className="w-full border border-border p-3 rounded-2xl">
                    {session.map((item, index) => (
                        <AccordionItem key={item.index} value={`item-${index}`}>
                            <AccordionTrigger>{item.title}</AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>{item.content}</ReactMarkdown>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            ) : (
                <></>
            )}
        </div>
    );
}
