import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Games from "./pages/Games";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/games" element={<Games />} />

      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}