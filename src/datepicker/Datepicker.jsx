import React from 'react';
import { useEffect, useState, useRef } from 'react';

import 'bootstrap-icons/font/bootstrap-icons.css';
import {getmonthnumber, getmonthname, daysinmonth2, getdayofweek, getdayname, getWeeksInMonth, makearrayofdatesfromWeek} from './daypickerjs';


//; ----------------------------------------------------------------------
//.DATE RELATED FUNCTIONS
    const Datepicker = React.forwardRef((props,ref) => {
        
      const[selectedateArray, setSelecteddateArray] = useState([]);
        const dayPickerRef = useRef();

        const {dateprop, onDateChange, closedialogCallback, multiple} = props;
       
        const [isOpen, setIsOpen] = useState(false);
        const[datepropDatepicker, setDatepropDatepicker] = useState('');
     
        const dateinputref = useRef(); 
        const dialogref = useRef();

        
        const testFunction = (e) => {
            console.log('testFunction');
            console.log(e.target.value);
        // setSelecteddate(e.target.value);
        }
       
    const[selecteddate2, setSelecteddate2] = useState('');
    //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    const[datepropstate, setDatepropState] = useState(dateprop);
    //STATES RELATED TO DATE PROP
    const[monthfromdate, setMonthfromdate] = useState('');
    const[yearfromdate, setYearfromdate] = useState(0);
    //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

    //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    //STATES WE SET FROM DATE / MONTH / YEAR
    const[monthnumber, setMonthnumber] = useState('');
    //TO DO 
    const[monthname, setMonthname] = useState('');
    const[daysinmonth, setDaysinmonth] = useState('');
    const[dayofweek, setDayofweek] = useState('');
    const[dayname, setDayname] = useState('');
    const [allweeksdates, setAllweeksdates] = useState([]);

    const[monthfordisplay, setMonthfordisplay] = useState(0);
    const[yearfordisplay, setYearfordisplay] = useState(0); //not sure about this

    const[multipleprop,setMultipleprop] = useState(multiple);
    const[multipledatearray, setMultipledatearray] = useState([]);
    const[datepropPassed, setDatepropPassed] = useState(false);
    
    // FOR THE MONTHS CHANGE
    const[showmonth, setShowmonth] = useState(false);
    const[showyear, setShowyear] = useState(false);
    
    
    //; =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    //. ON TODAYS DATE CHANGE -> 
    //; ===========================================================
    useEffect(() => {
        let monthfromdate1;
        let yearfromdate1;
        let getmonthnumberV;
        let getdayofweekV;
        let getdaynameV;
        let dateprop;
        let datetouse;
      if(datepropstate) {
        console.log('datepropstate', datepropstate)
        datetouse = datepropstate;
        console.warn('dateprop yes', )
        if(typeof datepropstate == 'object') {
          console.log('datepropstate is AN OBJECT')
          console.log(datepropstate.length, 'datepropstate.length')
          console.log(datepropstate,'datepropstate')
          if(datepropstate.length == 0) {
            console.log('object no length PROP DATES MULTIPLE ^&&&')
            let todaydate1 = new Date(); //example: 2021-05-05T10:00:00.000Z
       let todaydateforsure = todaydate1.toISOString().slice(0, 10); // example: 2021-05-05
    
        console.log(todaydateforsure, 'todaydateforsurexx');
        datetouse = todaydateforsure; 
          }
          
        }
        else if(typeof datepropstate == 'string') {
          console.log('datepropstate is A STRING')
          datetouse = datepropstate;
          setDatepropPassed(true);
        }
     
      }
      else if(!datepropstate) {
       console.warn('no datepropstate')
       if (selecteddate2) {
        console.log('selecteddate2HEREHERE', selecteddate2)
        datetouse = selecteddate2;
      }
        else if (!selecteddate2) {
       let todaydate1 = new Date(); //example: 2021-05-05T10:00:00.000Z
       let todaydateforsure = todaydate1.toISOString().slice(0, 10); // example: 2021-05-05
    
        console.log(todaydateforsure, 'todaydateforsurexx');
        datetouse = todaydateforsure;
        }
       // changeDateCallback(todaydateforsure)
      }
        //-= Related to DATE prop  -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
        console.log('initial date', datetouse)
        //|get month and year from date
        monthfromdate1 = datetouse.slice(5, 7); //e.g. 07d
        yearfromdate1 = datetouse.slice(0, 4); // e.g. 2024

        let monthtonumber = parseInt(monthfromdate1);
        console.log(monthtonumber, 'monthtonumber')
        let yeartonumber = parseInt(yearfromdate1);
        console.log(yeartonumber, 'yeartonumber')

        setMonthfordisplay(monthtonumber);
        setYearfordisplay(yeartonumber);
        getmonthnumberV = getmonthnumber(datetouse); //  e.g. 12
        getdayofweekV = getdayofweek(datetouse); //e.g. 1
        getdaynameV = getdayname(getdayofweekV); //e.g. monday
        console.log(getdaynameV, 'getdayname');
        setDayname(getdaynameV);
      //  setMonthfromdate(monthfromdate1); 
        setYearfromdate(yearfromdate1);
        setMonthnumber(getmonthnumberV);
        setDayofweek(getdayofweekV);
    }, [selecteddate2, datepropstate])

    useEffect(() => {

      if(datepropPassed) {
        setSelecteddate2(datepropstate)

      }
     
    }, [datepropPassed])
    //; ===========================================================
    useEffect(() => {
        console.log('month OR YEAR for display CHANGED', monthfordisplay, yearfordisplay)
        //MAYBE ISSUE BECAUSE NOW WE HAVE JS MONTH -> AND MAYBE THE REST IS IN NORMAL MONTHS
        let getmonthnameV = getmonthname(monthfordisplay, yearfordisplay);
        setMonthname(getmonthnameV);
        console.log(getmonthnameV, 'getmonthnamev');
              
        let daysinmonth1V = daysinmonth2(monthfordisplay, yearfordisplay);
        console.log(daysinmonth1V, 'daysinmonth');
        setDaysinmonth(daysinmonth1V);      
      
        
        //. BUILD WEEKS AND DATES ETC FOR DISPLAY
            //first get array of weeks in month
            let testweeks = getWeeksInMonth(monthfordisplay, yearfordisplay);
            console.log(testweeks, 'testweeks') //  [48, 49, 50, 51, 52]
              
            let mergedArray = [];
    
            let looptestweeks = testweeks.map((week, index) => {
                let weeknumberhere = week.weeknumber;
                let weekyearhere =  week.year;
                //get array of dates from week (array of 7 date objects)
                //TODO mAYBE TURN THIS INTO STRINGS
                let arrayofdates = makearrayofdatesfromWeek(weeknumberhere, weekyearhere, monthfordisplay, monthname);
                mergedArray = [...mergedArray, ...arrayofdates];
                console.log(arrayofdates, 'arrayofdates')
                return arrayofdates;
            })
            console.log(mergedArray, 'mergedArray')
            setAllweeksdates(mergedArray);
    
          //  let testthis = makearrayofdatesfromWeek(testweeks[1], yearfromdate);
          //  console.log(testthis, 'testthis')
       
    }, [monthfordisplay, yearfordisplay])
   
    //; ===========================================================
    useEffect(() => {
        
        console.log('selecteddate2 changed', selecteddate2)

    }, [selecteddate2])
    //; ===========================================================
    //. CHEVRONS CHANGE MONTH
    const changemonth = (currentmonthnum, previousnext, yearfordisplay22) => {
        console.log('changing month')
        console.log(typeof yearfordisplay22,'yearfordisplay22 typeof')
        //IN NORMAL MONTHS e.g 12 -> december, not js yet
        let cmonth = currentmonthnum;
        console.log(cmonth, 'cmonth')
        //convert to number
       // let cmonthnumber = parseInt(cmonth);
       let cmonthnumber = cmonth;
        //we get a number of the month A STRING - not js based (12 is december)
        
        //SO FIRST WE SHOULD SHIFT IT BACK TO JS MONTH 
        //so now jan is 0
      //  let cmonthnumberinjs = cmonthnumber - 1;
      let cmonthnumberinjs = cmonthnumber;
        console.log(cmonthnumberinjs, 'cmonthnumberinjsFORNOWNOTTRUE')
        let newmonth; 
      
        //WRONG 
        //ADD A MONTH WITH JS 
        //MAKE A DATE FROM THAT MONTH
        if(previousnext === 'previous') {
            console.log('going to previous month')
            if(cmonthnumberinjs === 1) {
                newmonth = 12; 
                let newyear1 = yearfordisplay22 - 1;
                setMonthfordisplay(newmonth);
                setYearfordisplay(newyear1);
                console.log(newyear1, 'newyear1')
                console.log(typeof newyear1, 'newyear1 typeof')
            }
            else {
                 newmonth  = cmonthnumberinjs - 1;
                 setMonthfordisplay(newmonth);
            }
          
        }
        else if (previousnext === 'next') {
            console.log('going to next month')
            if(cmonthnumberinjs === 12) {
                newmonth = 1;
                let newyear1 = yearfordisplay22 + 1;
                console.log(newyear1, 'newyear1')
                console.log(typeof newyear1, 'newyear1 typeof')
                setYearfordisplay(newyear1);
                setMonthfordisplay(newmonth); 

            }
            else {
                console.log('next, not 12')
                 newmonth = cmonthnumberinjs + 1;
                 console.log(newmonth,'newmonth')
                 setMonthfordisplay(newmonth);
            }
          
        }  

    }
    const changedateLocal = (newdate) => {

    //if prop multiiple..
    if(multipleprop === 'yes') {
      //if it exists remove it 
     /*  if(selectedateArray.find(item => item == newdate)) {
        let newarray = selectedateArray.filter(item => item !== newdate);
        setSelecteddateArray(newarray);

      } */
      if(selectedateArray.find(item => item == newdate)) {
                        //remove it
        console.log('exists')
        let newarray = selectedateArray.filter(item => item !== newdate);
        setSelecteddateArray(newarray);
                      }
      else {
        setSelecteddateArray([...selectedateArray, newdate]);
      }
    }
    else {
        console.log(newdate, 'newdate in changedateLocal')
        console.log(typeof newdate, 'newdate in changedateLocal')
        let dateparam = new Date(newdate);
        console.log(dateparam, 'dateparam')
        setSelecteddate2(newdate);
    }
    
      
        
    }
   
    //; ===========================================================
    //. CHANGE DATE ON CLICK CALLBACK
    const changeDateCallback = (newdate) => {
        onDateChange(newdate);
      
        console.log(newdate, 'newdate in changeDateCallback')
    }   

    const closedialog = (newstate) => {
        setIsOpen(newstate);
      
    }
    //; ===========================================================
    //; OUTSIDE CLICK DETECTION - CLOSE DIALOG
      useEffect(() => {
        
      const handleClickOutside = (event) => {
          console.log(event.target, 'event.target')
          console.log(event.target.id, 'event.target.id')
          let targetid = event.target.id;
          //first see if i
          if (dateinputref.current && !dateinputref.current.contains(event.target)) {
            //setIsOpen(false);
            console.log('clickd outside datepicker input field')
            if (dialogref.current && !dialogref.current.contains(event.target)) {
              console.log('clicked outside dialogaaaa')
              //setIsOpen(false);
              if(isOpen === true) {
                setIsOpen(false);
              console.log('isopen')
              }
              else {
                console.log('isnotopen')
              }
              console.log('clicked outside')
              if(targetid === 'calendaricon') {
                console.log('clicked on calendar icon')
                setIsOpen(true);  
              }
              else {
                setIsOpen(false);
              }
            
              
            }
            else {
              console.log('clicked inside')
            } 
          
          }
      
          
          else if (dateinputref.current && dateinputref.current.contains(event.target)) {
            console.log('clicked inside datepicker input field') 
          }
      
        }
          
  window.addEventListener('click', handleClickOutside);
    
        // Clean up the event listener
        return () => {
          window.removeEventListener('click', handleClickOutside);
        };
        //console.log('daypickerref useEffect called')
        
      /*    document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };  */
      }, [dayPickerRef]); 

      const  changesetshowmonth = () => {
        if(showmonth === false) {
          setShowmonth(true);
        }
        else {
          setShowmonth(false);
        }
      }
    // dispatch(setDateFordaypicker(todaydate));

  
    //| -----------------------------------------------------------
    return (
            <>
             <p className="read-the-docs">
            Click on the Vite and React logos to learn more
            </p>
            {/*  value={datepropDatepicker}  */}
            <div className="datepickerformgroupdiv"  onClick={() => setIsOpen(true)}>
            <input ref={dateinputref} className="form-control datepinput" type="text" name="datepicker" id="datepickerinput" 
            value={
            selectedateArray && selectedateArray.length > 0 ? selectedateArray : selecteddate2
            } 
            aria-label="Datepicker"   onClick={() => setIsOpen(true)} 
            /* onChange={{testFunction} */
             onChange={e => {
                if (selectedateArray && selectedateArray.length > 0) {
                  //TODO THIS IS WHAT WE'RE WORKING ON HERE 
                  // If selectedateArray is not empty, update it
                  let valueinput = dateinputref.current.value;
                  let valueinputarray = valueinput.split(',');
                  console.log(valueinputarray, 'valueinputarray')
                  //back to string with the comma 
               
                  console.log(valueinput, 'valueinput')
                setSelecteddateArray([valueinput]);
                setMultipledatearray(valueinputarray);
               //   changeDateCallback(day.datetxt);
                } else {
                  // Otherwise, update selecteddate2
                  setSelecteddate2(e.target.value);
                }
              }
            }
            />
            <i id="calendaricon" className="bi bi-calendar4-week inputicon" ></i>

        {/* onClick={() => clickopen} */}

             </div>
            
            
            {isOpen && (
            <dialog open ref={dialogref}  >   {/*  ref={ref} */}
                <button onClick={() => setIsOpen(false)} autoFocus>Close</button>
            
            {/*  dateprop={datepropDatepicker} */}
            <div className="mydaypickerwrapper"   >
                <div className="topdivdp">
              
                    <div className="chevronsdp chevrondpleft" onClick={() => changemonth(monthfordisplay, 'previous', yearfordisplay)}>
                        <i className="bi bi-chevron-left"></i>
                    </div>
                    <div className="monthnamedp" >
                        <span onClick={() => changesetshowmonth()}>{ monthname } </span>
                        <span>  </span>  {  yearfordisplay } 
                    </div>
                    
                    <div className="chevronsdp chevrondpright" onClick={() => changemonth(monthfordisplay, 'next', yearfordisplay)}>
                    <i className="bi bi-chevron-right"></i>
                </div>

            </div>
            {!showmonth && (  
            <div className="mydatepickergrid">
                <div className="dayofweek">Mon</div>
                <div className="dayofweek">Tue</div>
                <div className="dayofweek">Wed</div>
                <div className="dayofweek">Thu</div>
                <div className="dayofweek">Fr</div>
                <div className="dayofweek">Sat</div>
                <div className="dayofweek">Sun</div>

            { allweeksdates && allweeksdates.map((day, index) => (
                <div 
                key={day.datetxt}
                onClick={() => {

                    if(multipleprop === 'yes') {
                      //first check if it exists in the array already
                      if(multipledatearray.find(item => item == day.datetxt)) {
                        //remove it
                        console.log('exists')
                        let newarray = multipledatearray.filter(item => item !== day.datetxt);
                        setMultipledatearray(newarray);
                        setSelecteddateArray(newarray);
                      }
                      else {
                      //ADD IT 
                      console.log('multiple')
                      console.log(typeof day.datetxt, 'day.datetxt typeof')
                      setMultipledatearray([...multipledatearray, day.datetxt]);
                      // changeDateCallback(multipledatearray);
                      changeDateCallback(day.datetxt);
                      changedateLocal(day.datetxt); 

                      }
                    }
                    else {
                      changeDateCallback(day.datetxt);
                      closedialog(false);
                      changedateLocal(day.datetxt); 
                    }

                  
                } }
                    
                    
                className={`dpdatebox ${day.monthname !== monthname ? 'grey' : ''} ${selecteddate2 === day.datetxt ? 'activedatebadge' : ''} ${multipledatearray &&
                   multipledatearray.find(item => item == day.datetxt) ? 'activedatebadge' : ''} `}
                
                data-date={day.datetxt} data-monthname={day.monthname} data-monthnumber={day.monthnumber} /* data-dayname={day.dayname} data-dayofweek={day.dayofweek} data-dayofweeknumber={day.dayofweeknumber} data-year={day.year} data-day={day.day} data-month={day.month} */
                >
                    {day.datetxt.split('-')[2]}
                  
                    </div>
                ))}
        
            </div>
             )}
              {showmonth && (
              <div className="monthsdiv"> 
              <div className="monthdiv">January</div>
              <div className="monthdiv">February</div>
              <div className="monthdiv">March</div>
              <div className="monthdiv">April</div>
              <div className="monthdiv">May</div>
              <div className="monthdiv">June</div>
              <div className="monthdiv">July</div>
              <div className="monthdiv">August</div>
              <div className="monthdiv">September</div>
              <div className="monthdiv">October</div>
              <div className="monthdiv">November</div>
              <div className="monthdiv">December</div>
          </div>) 
            }
            </div>
           
           
            
            <span> multiple: {multipleprop}</span>
            { multipledatearray && multipledatearray.map((date, index) => (
              
              <div key={index}>{date}a</div>
            
    ))}
    { selectedateArray}
            </dialog>
      )}
          

            </>
        
    )
                
    
    })

    Datepicker.displayName = 'Mydaypicker2';
export default Datepicker;
/*   onClick={() => dispatch(setDateFordaypicker(day.datetxt))} */
