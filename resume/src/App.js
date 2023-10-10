import React from 'react'
import './App.css';
import { BrowserRouter, Route, Routes }
  from "react-router-dom";
import Resume from './Resum/Personaldetail';
import Acadamy from './Resum/Acadamy';
import WorkExpertion from './Resum/WorkExpertion';
import Printdata from './Resum/Printdata';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Resume />} />
          <Route path='/Acadamy' element={<Acadamy />} />
          <Route path='/WorkExpertion' element={<WorkExpertion/>}/>
          <Route path='/Printdata' element={<Printdata/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}


export default App;
