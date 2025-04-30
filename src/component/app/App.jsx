import "./App.css";
import Tabs from "../tabs/Tabs";
import { Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/tabs/*" element={<Tabs />} />
        <Route path="*" element={<Navigate to="/tabs/cambodia" />} />
      </Routes>
    </>
  );
}

export default App;
