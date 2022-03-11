import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import PatientList from "./pages/PatientList";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <div className="container mt-2" style={{ marginTop: 40 }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="patients" element={<PatientList />} />
        
      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;
