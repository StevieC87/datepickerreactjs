import { useState, useEffect, useRef } from 'react';
import './App.css'
import Datepicker from './datepicker/Datepicker.jsx';
//import * as bootstrap from 'bootstrap';
import './datepicker/Datepicker.css'
import './scss/styles.scss';
function App() {

  const dayPickerRef = useRef();

  const[selecteddate, setSelecteddate] = useState('');

  //; CALLBACK FUNCTI
  const handleDateChange = (newdate,setisopen2) => {
    console.log(newdate, 'newdate in handleDateChange');
    //setDatepropDatepicker(newdate);
    setSelecteddate(newdate);
  }
 /*  const closedialogCallback = (closeyesno) => { 
    setIsOpen(closeyesno);
  } */
  // closedialogCallback={closedialogCallback}
  //const [isOpen, setIsOpen] = useState(false);

  
  return (
    <>
  <Datepicker ref={dayPickerRef} onDateChange={handleDateChange} dateprop={selecteddate}
       
        />
     </>
  )
}

export default App
