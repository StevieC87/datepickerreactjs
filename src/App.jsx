import { useState, useEffect, useRef } from 'react';
import './App.css'
import Datepicker from './datepicker/Datepicker.jsx';
//import * as bootstrap from 'bootstrap';
import './datepicker/Datepicker.css'
import './scss/styles.scss';
function App() {

  const dayPickerRef = useRef();
  const dateinputref = useRef(); 
  const dialogref = useRef();

  const[datepropDatepicker, setDatepropDatepicker] = useState('');
  const[selecteddate, setSelecteddate] = useState('');

  //; CALLBACK FUNCTI
  const handleDateChange = (newdate,setisopen2) => {
    console.log(newdate, 'newdate in handleDateChange');
    //setDatepropDatepicker(newdate);
    setSelecteddate(newdate);
  }
  const closedialogCallback = (closeyesno) => { 
    setIsOpen(closeyesno);
  }
  const [isOpen, setIsOpen] = useState(false);
  
  
  return (
    <>
 
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      
      <input ref={dateinputref}className="form-control datepinput" type="text" name="datepicker" id="datepickerinput" value={datepropDatepicker}  value={selecteddate} aria-label="Datepicker" onClick={() => setIsOpen(true)} />
     
      {isOpen && (
      <dialog open ref={dialogref}>  
        <button onClick={() => setIsOpen(false)} autoFocus>Close</button>
      
        <Datepicker ref={dayPickerRef} onDateChange={handleDateChange}
        closedialogCallback={closedialogCallback}
        />{/*  dateprop={datepropDatepicker} */}
      </dialog>
      )}
  a</>
  )
}

export default App
