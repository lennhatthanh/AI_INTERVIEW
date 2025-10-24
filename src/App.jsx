import { BrowserRouter, Routes, Route } from "react-router-dom";
import GeneratePage from "./page/GeneratePage";
import Layout from "./layouts";
import HistoryPage from "./page/HistoryPage";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<GeneratePage />} />
                    <Route path="history" element={<HistoryPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
