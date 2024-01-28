import { useState, useRef } from 'react';
import './App.css'
import Datepicker from './datepicker/Datepicker.jsx';
//import * as bootstrap from 'bootstrap';
import './datepicker/Datepicker.css'
import './scss/styles.scss';
function App() {

  const dayPickerRef = useRef();

  const [singlemultiple, setSinglemultiple] = useState('yes'); //or empty string for single date selection
  const[selecteddate, setSelecteddate] = useState('');
  const[selecteddatesMulti, setSelecteddatesMulti] = useState([]);

  //; CALLBACK FUNCTI
  const handleDateChange = (newdate) => {
    
    if(typeof newdate === 'object'){
      console.log('newdate is object');
      //setSelecteddate(newdate);
      setSelecteddatesMulti(prevState => [...prevState, newdate]);
  }
  else {
    console.log(newdate, 'newdate in handleDateChange');
    //setDatepropDatepicker(newdate);
    setSelecteddate(newdate);
  }
}

  
  return (
    <>
  <Datepicker  ref={dayPickerRef} onDateChange={handleDateChange} 
    dateprop={
      singlemultiple == 'multiple' ? selecteddatesMulti : selecteddate
    }
     multiple={singlemultiple}
       
        />
     </>
  )
}

export default App
