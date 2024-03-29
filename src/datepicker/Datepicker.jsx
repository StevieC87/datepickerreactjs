import React from 'react';
import { useEffect, useState, useRef } from 'react';

import 'bootstrap-icons/font/bootstrap-icons.css';
import {getmonthnumber, getmonthname, daysinmonth2, getdayofweek, getdayname, getWeeksInMonth, makearrayofdatesfromWeek, 
  convertYMD2DMY, convertDMY2YMD, convertMDY2YMD,
  convertDMY2YMDarray, convertMDY2YMDarray,
  convertFormat


} from './daypickerjs';


//; ----------------------------------------------------------------------
//.DATE RELATED FUNCTIONS
    const Datepicker = React.forwardRef((props,ref) => {
        
      const[selectedateArray, setSelecteddateArray] = useState([]);
        const dayPickerRef = useRef();

        const {dateprop, onDateChange, closedialogCallback, multiple, format, displaya} = props;
       
        const [isOpen, setIsOpen] = useState(false);
        const[datepropDatepicker, setDatepropDatepicker] = useState('');
     
        const dateinputref = useRef(); 
        const dialogref = useRef();

        
        const testFunction = (e) => {
            console.log('testFunction');
            console.log(e.target.value);
        // setSelecteddate(e.target.value);
        }
    const[displayprop, setDisplayprop] = useState(displaya);
    const[selecteddate2, setSelecteddate2] = useState('');
    //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    const[datepropstate, setDatepropState] = useState(dateprop);
    //STATES RELATED TO DATE PROP
    const[monthfromdate, setMonthfromdate] = useState('');
    const[yearfromdate, setYearfromdate] = useState(0);
    //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    const[formata, setFormat] = useState(format);
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
   // const[multipledatearray, setMultipledatearray] = useState([]);
    const[datepropPassed, setDatepropPassed] = useState(false);
    
    // FOR THE MONTHS CHANGE
    const[showmonth, setShowmonth] = useState(false);
  
    const[actuallytoday, setActuallytoday] = useState('');
   
   
    //; =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    //. ON TODAYS DATE CHANGE -> 
    //; ===========================================================
    useEffect(() => {
      let todaydatex = new Date(); //example: 2021-05-05T10:00:00.000Z
      let todayx = todaydatex.toISOString().slice(0, 10); 
      setActuallytoday(todayx);
     
    }, [])

   useEffect(() => {
    console.log('displayprop changed', displayprop)
      
   }, [displayprop])
    
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
        let unformatdate = '';
        if (format === 'DDMMYYYY') {
          console.log('HEREYO')
           unformatdate =  convertDMY2YMD(selecteddate2)
          console.log(unformatdate, 'unformatdate')
        }
        else if(format === 'YYYYMMDD') {
           unformatdate = selecteddate2;
        
        }
        else if(format === 'MMDDYYYY') {
          alert('here')
           unformatdate = convertMDY2YMD(selecteddate2);
           console.log(unformatdate, 'unformatdate2')
        }   

        datetouse = unformatdate;
      }
        else  if (!selecteddate2) {
       let todaydate1 = new Date(); //example: 2021-05-05T10:00:00.000Z
       let todaydateforsure = todaydate1.toISOString().slice(0, 10); // example: 2021-05-05

    
        console.log(todaydateforsure, 'todaydateforsurexx');
        datetouse = todaydateforsure;
        }
       // changeDateCallback(todaydateforsure)
      }
     
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
        //set date TO FORMAT WE WANT
        let converteddatenow = convertFormat(format,newdate);
          console.log(converteddatenow, 'converteddatenow1111111')
  // setSelecteddate2(newdate);
       setSelecteddate2(converteddatenow);
    }        
    }
   
    //; ===========================================================
    //. CHANGE DATE ON CLICK CALLBACK
    const changeDateCallback = (newdate) => {
      
      console.log(newdate,'newdate4444444444')
        console.log(typeof newdate,'newdate4444444444 typeof')
        onDateChange(newdate);
      
        console.log(newdate, 'newdate in changeDateCallback')
    }   

    const closedialog = (newstate) => {
        setIsOpen(newstate);``
      
    }
    //; ===========================================================
    //; CHANGE MONTH AND YEAR IN DIALOG
      const  changesetshowmonth = () => {
        if(showmonth === false) {
          setShowmonth(true);
          setShowYears(false);
        }
        else {
          setShowmonth(false);
        }
      }
    // dispatch(setDateFordaypicker(todaydate));
      const changemonthclick = (monthnumber) => {
        console.log(monthnumber, 'monthnumber')
        setMonthfordisplay(monthnumber);
        setShowmonth(false);
      }
      //; GET YEARS 
      const[yearsArray, setYearsArray] = useState([]);
      const[showyears, setShowYears] = useState(false);
      useEffect(() => { 
        //get current year 
        let selectedyear = yearfordisplay;
        //get 10 years before and after 
        let yearsbefore = selectedyear - 10;
        let yearsafter = selectedyear + 10;
        let yearsarray = [];
        for(let i = yearsbefore; i <= yearsafter; i++) {
          yearsarray.push(i);
        }
        console.log(yearsarray, 'yearsarray')
        setYearsArray(yearsarray);
      }, [yearfordisplay])

      //WHEN CLICK ON YEAR - shows years div
      const showyearsfunction = () => {
        if(showyears === false) {
          setShowYears(true);
          setShowmonth(false);
        }
        else {
          setShowYears(false);
        }

      }
      const changeyearfunction = (plusorminus) => {
        let currentselectyear = yearfordisplay;
        if(plusorminus === 'plus') {
          let newyear = currentselectyear + 10;
          setYearfordisplay(newyear);
        }
        else if(plusorminus === 'minus') {
          let newyear = currentselectyear - 10;
          setYearfordisplay(newyear);
        }
      } 
      const selectnewyearfunction = (selectedyear) => {
        setYearfordisplay(selectedyear);
        setShowYears(false);
      }
        
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
                if(displayprop === 'modal') {
             
                  if(dialogtag && dialogtag.open === true){
                    dialogtag.close();
                  }
                }
                else {
                  if(isOpen === true) {
                    setIsOpen(false);
                  console.log('isopen')
                  }
                  else {
                    console.log('isnotopen')
                  } 
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
      }, [dayPickerRef]); 

    //; ===========================================================
      const dialogtag = document.getElementById('dialogtag');
    
      
    //| -----------------------------------------------------------
    return (
            <>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus officiis soluta eos libero, deserunt dolor! Porro esse in voluptatum obcaecati consectetur. Exercitationem eaque sequi inventore hic perspiciatis quas, tempore, ipsum, consequuntur sint nobis quis? Officia minima, voluptatem nam accusamus numquam sit blanditiis dolorum, quasi assumenda, corrupti inventore? Ad laborum id accusamus est quisquam cum, tenetur perspiciatis illo adipisci maiores, dolores dolorum sit similique assumenda tempora distinctio. Laboriosam eveniet iusto atque optio sit quidem eligendi esse vitae veniam, impedit culpa quae, error, nisi saepe! Possimus laudantium quos deserunt cumque sapiente voluptas libero a. Voluptates aut in corporis tempora blanditiis, ipsa quaerat?
             <p className="read-the-docs">
            Bootstrap React Multiple Datepicker
            </p>
            {/*  value={datepropDatepicker}  */}
            <div className="datepickerwrapper">
            <div className="datepickerformgroupdiv"  onClick={() => setIsOpen(true)}>
              <input
              //placehodler maybe convert today's date 
              
                ref={dateinputref}
                className="datepickerinput datepinput" 
                type="text" 
                name="datepicker"
                id="datepickerinput" 
                value={
                 selectedateArray && selectedateArray.length > 0 ? selectedateArray : selecteddate2 
                /* convertYMD2DMY(selecteddate2) convertYMD2DMYarray(selectedateArray)   */
                }   
                aria-label="Datepicker"   onClick={() => onclickinput() } 
                /* onChange={{testFunction} */
                onChange={e => {
                 let proceed = false;
                if (selectedateArray && selectedateArray.length > 0) {
                      //validate dates before setting them - OTHERWISE BUGGY if date not finished
                  //alert('arry changed')
                      proceed = true;
                      // MAYBE HAVE TO CONVERT DATE HERE DUNNO TEST
                      let valueinput = dateinputref.current.value;
                      let valueinputarray = valueinput.split(',');
                      console.log(valueinputarray, 'valueinputarray')
                      //back to string with the comma 
                  
                      console.log(valueinput, 'valueinput')
                     // setSelecteddateArray([valueinput]);
                     setSelecteddateArray(valueinputarray);
                  //  setMultipledatearray(valueinputarray);

                
                }
                else {
               // alert('changed')
                  // Otherwise, update selecteddate2
                  //convert date to yyymmdd from ddmmyyyy 
                  // let converteddate = convertDMY2YMD(e.target.value);
               
               //   if(validdateis) {
               //     alert('valid')
                    proceed = true;
                    setSelecteddate2(e.target.value);
               //   }
               //   else if (!validdateis) {
                //    alert('not valid')
             //     }
                  //PUT THSI STUFF IN A USE EFFECT MAYBE - INSTEAD OF A CHANGE. WHEN I CLICK AND THE DATE CHANGES, IT DOESNT TRIGGER AN ONCHANGE ON THE INPUT APPARENTLY
            }
          } 

                }
            />
            <i id="calendaricon" className="bi bi-calendar4-week inputicon" ></i>

        {/* onClick={() => clickopen} */}

                       
             
          {/*   {isOpen &&  ( */}
{/*                <div className="dialog" open ref={dialogref}  >  */}
            
      {/* )} */}
       </div> 
       </div>
        <p></p>
        <p></p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, pariatur mollitia? Officiis optio quisquam voluptatem unde accusantium aperiam nostrum quas fuga, rerum qui itaque perspiciatis error excepturi saepe rem illum maiores veniam quos consequatur expedita commodi? Sit, laboriosam? Laborum corporis nobis dicta nesciunt numquam facilis laudantium tenetur atque molestias eius ipsa, sit nisi voluptatem voluptate architecto modi veritatis earum. Pariatur, quo exercitationem numquam enim, magnam provident mollitia veritatis odit iste nemo dolore? Magnam impedit sit velit necessitatibus excepturi error, quia veritatis, ipsum incidunt sunt, vero molestiae iste perferendis ipsam! Nostrum modi non quidem adipisci dolores facere, a eos laborum debitis!l
        <dialog id="dialogtag" 
        /* className="dialogtag"  */
        className={displayprop === 'modal' ? 'dialogtag' : 'dialogtagpopup'}
        open ref={dialogref}  >
            { /*  ref={ref} */}
            <button onClick={() => dialogtag.close()} autoFocus>Close</button> 
            
            {/*  dateprop={datepropDatepicker} */}
            <div className="mydaypickerwrapper"   >
                <div className="topdivdp">
              
                   {!showyears && ( <div className="chevronsdp chevrondpleft" onClick={() => changemonth(monthfordisplay, 'previous', yearfordisplay)}>
                        <i className="bi bi-chevron-left"></i>
                    </div>
                    )}
                     {showyears && ( <div className="chevronsdp chevrondpleft" onClick={() => changeyearfunction('minus')}>
                        <i className="bi bi-chevron-left"></i>
                    </div>
                    )}
                    <div className="monthnamedp" >
                        <span className="curserpointer" onClick={() => changesetshowmonth()}>{ monthname } </span>
                        <span  className="curserpointer" onClick={() => showyearsfunction()}>  {  yearfordisplay }  </span> 
                    </div>
                    
                    {!showyears && (
                        <div className="chevronsdp chevrondpright" onClick={() => changemonth(monthfordisplay, 'next',  yearfordisplay)}>
                          <i className="bi bi-chevron-right"></i>
                        </div>
                    )}
                     {showyears && ( <div className="chevronsdp chevrondpleft" onClick={() => changeyearfunction('plus', yearfordisplay)}>
                        <i className="bi bi-chevron-right"></i>
                      </div>
                      )}


            </div>
            {!showmonth && !showyears && (  
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
                  console.log(allweeksdates,'allweeksdates123123')
                    if(multipleprop === 'yes') {
                      //alert('clicked')
                      //first check if it exists in the array already
                      if(selectedateArray.find(item => item == day.datetxt)) {
                     //   alert('exists')
                        //remove it
                        console.log('exists')
                        let newarray = multipledatearray.filter(item => item !== day.datetxt);
                    //    setMultipledatearray(newarray);
                        setSelecteddateArray(newarray);
                        changeDateCallback(newarray);
                      }
                      else {
                  
                      console.log('multiple')
                      console.log(typeof day.datetxt, 'day.datetxt typeof')
                      console.log(day.datetxt, 'day.datetxtsssssss')
                      
                      //convert array 
                     // let convertedArrayformat = convertFormatArray(multipledatearray);
                    //  console.log(convertedArrayformat, 'convertedArrayformat')

                    //  setMultipledatearray([...multipledatearray, convertFormat(day.datetxt)]);
                      setSelecteddateArray([...selectedateArray, convertFormat(format, day.datetxt)]);
                      changeDateCallback([...selectedateArray, convertFormat(format,day.datetxt)]);
                      changedateLocal(convertFormat(format, day.datetxt)); 

                      }
                    }
                    else {
                      changeDateCallback(day.datetxt);
                      closedialog(false);
                      changedateLocal(day.datetxt); 
                    }
                } }
                    
                    
                className={`dpdatebox ${day.monthname !== monthname ? 'grey' : ''} ${selecteddate2 === convertFormat(format, day.datetxt) ? 'activedatebadge' : ''} ${day.datetxt ===  actuallytoday ? 'todaycss' : ''} ${selectedateArray &&
                  selectedateArray.find(item => item == convertFormat(format, day.datetxt)) ? 'activedatebadge' : ''} `}
                
                data-date={convertFormat(format, day.datetxt)} data-monthname={day.monthname} data-monthnumber={day.monthnumber} /* data-dayname={day.dayname} data-dayofweek={day.dayofweek} data-dayofweeknumber={day.dayofweeknumber} data-year={day.year} data-day={day.day} data-month={day.month} */
              /*   tabIndex={0} */
               /*   onKeyDown={(event) => handleKeyDown(event, index)}
  */
               >
                 {day.datetxt.split('-')[2]}
                   
                    </div>
                ))}
        
            </div>
             )}
              {showmonth && !showyears && (
              <div className="monthsdiv"> 
                <div className="monthdiv curserpointer" id="1" onClick={(event) => { event.stopPropagation();  changemonthclick(1)}}>January</div>
                <div className="monthdiv curserpointer" id="2" onClick={(event) => { event.stopPropagation();  changemonthclick(2)}}>February</div>
                <div className="monthdiv curserpointer" id="3"  onClick={(event) => { event.stopPropagation();  changemonthclick(3)}}>March</div>
                <div className="monthdiv curserpointer" id="4"  onClick={(event) => { event.stopPropagation();  changemonthclick(4)}}>April</div>
                <div className="monthdiv curserpointer" id="5"  onClick={(event) => { event.stopPropagation();  changemonthclick(5)}}>May</div>
                <div className="monthdiv curserpointer" id="6"  onClick={(event) => { event.stopPropagation();  changemonthclick(6)}}>June</div>
                <div className="monthdiv curserpointer" id="7"  onClick={(event) => { event.stopPropagation();  changemonthclick(7)}}>July</div>
                <div className="monthdiv curserpointer" id="8"  onClick={(event) => { event.stopPropagation();  changemonthclick(8)}}>August</div>
                <div className="monthdiv curserpointer" id="9"  onClick={(event) => { event.stopPropagation();  changemonthclick(9)}}>September</div>
                <div className="monthdiv curserpointer" id="10"  onClick={(event) => { event.stopPropagation();  changemonthclick(10)}}>October</div>
                <div className="monthdiv curserpointer" id="11"  onClick={(event) => { event.stopPropagation();  changemonthclick(11)}}>November</div>
                <div className="monthdiv curserpointer" id="12"  onClick={(event) => { event.stopPropagation();  changemonthclick(12)}}>December</div>
                
               </div>
            ) 
            }
            {showyears && !showmonth &&(
           
            <div className='yeardiv'>
              {yearsArray && yearsArray.map((year, index) => (
                
                <div key={index} className={`yeardivitem ${year === yearfordisplay ? 'activeyear' : ''}`} 
               /*   onClick={() => selectnewyearfunction(year)} */
                 onClick={(event) => { event.stopPropagation();  selectnewyearfunction(year)}}
                 > <span className="curserpointer"> {year} </span></div>
              ))}
           
            </div>
               )   }
            </div>
            </dialog>
            </>
        

    )
})
                

                
    
  

    Datepicker.displayName = 'Mydaypicker2';
    export default Datepicker;
/*   onClick={() => dispatch(setDateFordaypicker(day.datetxt))} */
