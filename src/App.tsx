import React from 'react';
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<RecordList />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
 };
  
 export default App;
