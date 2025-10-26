import QuestionList from "@/components/QuestionList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useEffect, useState } from "react";

export default function GeneratePage() {
    const [session, setSession] = useState({});
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [inputLevel, setInputLevel] = useState("Mid");
    const [inputLanguage, setInputLanguage] = useState("English");
    const handleSubmit = async () => {
        const prompt = `
Bạn là một AI chuyên tạo câu hỏi phỏng vấn ${inputValue}.

Hãy tạo và chỉ trả về **một mảng JSON hợp lệ** (có thể parse trực tiếp bằng JSON.parse() trong JavaScript) gồm **chính xác 6 câu hỏi phỏng vấn** về ${inputValue}, phù hợp với trình độ và ngôn ngữ được cung cấp.

Mỗi phần tử trong mảng phải có cấu trúc:
[
  {
    "title": "string",
    "content": "string" // nội dung chi tiết, được viết bằng Markdown thuần, nhưng phải là chuỗi JSON hợp lệ (dùng \\n thay vì xuống dòng thật).
  }
]

Yêu cầu về "content":
- Gồm **5 phần rõ ràng** theo thứ tự, mỗi phần có heading Markdown cỡ lớn:
  1. **# Key Concepts**
  2. **## Explanation**
  3. **## Example**
  4. **## Best Practices**
  5. **## Common Mistakes**
- Giữa các phần nên ngăn cách bằng: \\n\\n---\\n\\n để hiển thị gọn gàng khi render.
- Toàn bộ nội dung phải dùng \\n để xuống dòng (không dùng xuống dòng thật).
- **Không được có dấu \`\`\` hoặc ký tự ngoài JSON.**
- Kết quả phải **parse được bằng JSON.parse() mà không lỗi.**
- Không trả về --- hoặc ngăn cách dòng
Ngôn ngữ & trình độ:
- Trình độ (Level): ${inputLevel}
- Ngôn ngữ (Language): ${inputLanguage}

Ghi chú thêm:
- Nếu ngôn ngữ là English → Viết chuyên nghiệp, rõ ràng, dễ hiểu, giống phong cách câu hỏi phỏng vấn kỹ thuật.
- Nếu ngôn ngữ là Vietnamese → Dịch tự nhiên, gần gũi, rõ ràng, dùng thuật ngữ quen thuộc.
- Văn phong nhất quán, dễ đọc và hiển thị đẹp khi render Markdown.
`;

        setLoading(true);
        const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent(prompt);
        setSession(
            JSON.parse(
                result.response.candidates[0].content.parts[0].text
                    .replace(/```json\s*/g, "")
                    .replace(/```/g, "")
                    .replaceAll('---', '')
                    .trim()
            )
        );
        setLoading(false);
    };
    const handleSave = () => {
        localStorage.setItem(
            "listSession",
            JSON.stringify([
                ...(JSON.parse(localStorage.getItem("listSession")) || []),
                {
                    id: Date.now(),
                    jobTitle: inputValue,
                    language: inputLanguage,
                    level: inputLevel,
                    question: session,
                    timespace: new Date(),
                },
            ])
        );
        alert("Lưu thành công");
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };
    const handleClear = () => {
        setSession({});
        setInputValue("");
    };
    return (
        <div className="max-w-4xl mx-auto">
            <div className="space-y-6 bg-card p-6 rounded-lg border border-border mb-8">
                <div>
                    <label className="block text-sm font-medium mb-2">Job Position</label>
                    {loading ? (
                        <Input className="text-foreground" placeholder="e.g. Frontend Developer" disabled />
                    ) : (
                        <Input
                            onKeyDown={handleKeyDown}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="text-foreground"
                            placeholder="e.g. Frontend Developer"
                        />
                    )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Level</label>
                        <select
                            onChange={(e) => setInputLevel(e.target.value)}
                            value={inputLevel}
                            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                        >
                            <option value="Fresher">Fresher</option>
                            <option value="Junior">Junior</option>
                            <option selected value="Mid">
                                Mid
                            </option>
                            <option value="Senior">Senior</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Language</label>
                        <select
                            onChange={(e) => setInputLanguage(e.target.value)}
                            value={inputLanguage}
                            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                        >
                            <option value="English" selected>
                                English
                            </option>
                            <option value="Vietnamese">Vietnamese</option>
                            <option value="Japanese">Japanese</option>
                        </select>
                    </div>
                </div>
                {inputValue.length === 0 || loading ? (
                    <Button className="w-full" disabled>
                        Generating...
                    </Button>
                ) : (
                    <Button onClick={handleSubmit} className="w-full">
                        Generate Question
                    </Button>
                )}
            </div>
            <QuestionList handleSave={handleSave} session={session} />
            {session.length > 0 ? (
                <div class="flex gap-4 justify-center">
                    <button
                        onClick={handleSave}
                        class="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
                    >
                        Save this session
                    </button>
                    <button
                        onClick={handleClear}
                        class="px-6 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition"
                    >
                        Clear
                    </button>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}
