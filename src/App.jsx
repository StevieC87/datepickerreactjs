import { useState, useRef } from 'react';
import './App.css'
import Datepicker from './datepicker/Datepicker.jsx';
//import * as bootstrap from 'bootstrap';
import './datepicker/Datepicker.css'
import './scss/styles.scss';
function App() {

  const dayPickerRef = useRef();

  const[selecteddate, setSelecteddate] = useState('');

  //; CALLBACK FUNCTI
  const handleDateChange = (newdate) => {
    console.log(newdate, 'newdate in handleDateChange');
    //setDatepropDatepicker(newdate);
    setSelecteddate(newdate);
  }

  
  return (
    <>
  <Datepicker  ref={dayPickerRef} onDateChange={handleDateChange} dateprop={selecteddate} multiple="yes"
       
        />
     </>
  )
}

export default App
