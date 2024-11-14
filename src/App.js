import "../src/dist/styles.css";
import Home from "./Pages/Home";
import Navbar from "../src/components/Navbar";
import { Route, Routes } from "react-router-dom";
import AdminPage from "./Pages/Admin";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPage />} />

      </Routes>
    </>
  );
}

export default App;
