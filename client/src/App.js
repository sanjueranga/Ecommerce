import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Products from "./components/Products";
import ProtectedRoute from "./components/route/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin/products" element={<ProtectedRoute />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
