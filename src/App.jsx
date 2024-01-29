import { useState, useRef } from 'react';
import './App.css'
import Datepicker from './datepicker/Datepicker.jsx';
//import * as bootstrap from 'bootstrap';
import './datepicker/Datepicker.css'
import './scss/styles.scss';
function App() {


  const [singlemultiple, setSinglemultiple] = useState('yes'); //or empty string for single date selection
  const[selecteddate, setSelecteddate] = useState('');
  const[selecteddatesMulti, setSelecteddatesMulti] = useState([]);

  //; CALLBACK FUNCTI
  const handleDateChange = (newdate) => {
    console.log('newdate in handleDateChange', newdate)
    console.log(typeof newdate, 'typeof newdate')
    if(typeof newdate === 'object'){
      console.log('newdate is object');
    //  alert('newdate is object')
      //setSelecteddate(newdate);
      //setSelecteddatesMulti(prevState => [...prevState, newdate]);
      setSelecteddatesMulti(newdate);
  }
  else {
  //  alert('newdate is string');
    console.log(newdate, 'newdate in handleDateChange');
    //setDatepropDatepicker(newdate);
    setSelecteddate(newdate);
  }
}


  return (
    <>{/*  ref={dayPickerRef}  */}
  <Datepicker onDateChange={handleDateChange} 
    dateprop={singlemultiple == 'yes' ? selecteddatesMulti : selecteddate}
     multiple={'yes'}
    
       />
     </>
  )
}

export default App
