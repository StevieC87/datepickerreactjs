
export function getmonthnumber(date: string): string {
    console.log(date, 'date in getmonthnumber')
    console.log(typeof date, 'typeof date in getmonthnumber')
    let month = date.slice(5, 7);
    return month;
}

export function getmonthname(month: number, year: number): string {
  //  console.log(date, 'date in getmonthname')
 //   let month = date.slice(5, 7);
  //  let year = date.slice(0, 4);
    if(month && year){
  console.log(month, 'month in getmonthname111')
    console.log(typeof month, 'typeof month in getmonthname')
    let monthinno = parseInt(month);
    console.log(monthinno, 'monthinno in getmonthname')
    console.log(year, 'year in getmonthname')
    console.log(typeof year, 'typeof year in getmonthname')
    let yearinno = parseInt(year);
   
    console.log(yearinno, 'yearinno in getmonthname')
    let monthname = new Date(yearinno, monthinno -1).toLocaleString('default', { month: 'long' });
    console.log(monthname, 'monthname in getmonthname3333')
    return monthname;
}   else {
    return;
}
}
export function daysinmonth2(month: string, year: string): number {
  /*   console.log(date, 'date in daysinmonth1')
    console.log(typeof date, 'typeof date in daysinmonth1')
    let month = date.slice(5, 7); */
    let monthinno = parseInt(month);
   // let year = date.slice(0, 4);
    let yearinno = parseInt(year);

    let daysinmonth1 = new Date(yearinno, monthinno, 0).getDate();
    console.log(daysinmonth1, 'daysinmonth1 in daysinmonth1')
    console.log(typeof daysinmonth1, 'typeof daysinmonth1 in daysinmonth1')
    return daysinmonth1;
}
export function getdayofweek(date: string): number {
    //console.log(date, 'date in getdayofweek')
    let day = date.slice(8, 10);
    let month = date.slice(5, 7);
    let year = date.slice(0, 4);
    let dayinno = parseInt(day);
    let monthinno = parseInt(month);
    let yearinno = parseInt(year);
    let dayofweek = new Date(yearinno, monthinno - 1, dayinno).getDay();
   // console.log(dayofweek, 'dayofweek in getdayofweek')
    return dayofweek;
}

export function getdayname(dayofweek: number): string {
    console.log(dayofweek, 'dayofweek in getdayname')
    console.log(typeof dayofweek, 'typeof dayofweek in getdayname')
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let dayname = days[dayofweek];
    return dayname;
}

export function getWeeksInMonth(month: string, year: string): number[] {
    // Create a date object for the first and last day of the month
    console.log(month, 'month in getWeeksInMonth')
    console.log(typeof month, 'typeof month in getWeeksInMonth')
    console.log(year, 'year in getWeeksInMonth')
    let monthinno = parseInt(month);
    let yearinno = parseInt(year);
    let firstDay = new Date(yearinno, monthinno -1, 1);
    console.log(firstDay, 'firstDay in getWeeksInMonth')
    let lastDay = new Date(yearinno, monthinno, 0);
    console.log(lastDay, 'lastDay in getWeeksInMonth')

    // Function to calculate the week number of a date
    function getWeekNumber(d) {
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        let yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        let weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
        
        //if less than 10 i want to add 0 before
/*         if (weekNo < 10) {
            weekNo = '0' + weekNo;
        } */
       return weekNo;
    }

    // Get the week number for the first and last day of the month
    let firstWeek = getWeekNumber(firstDay);
    console.log(firstWeek, 'firstWeek in getWdeeksInMonth')
    let lastWeek = getWeekNumber(lastDay);
    console.log(lastWeek, 'lastWeek in getWeeksInMonth')

    // Return an array of the weeks
    let weeks = [];
    let weekobject = {
        weeknumber: 0,
        year: 0
    }
    let lastweektoloop;

    //WAIT I WAS THINKING ABOUT FOR GOING BACK, DUNNO FI TAHT WILL AFFECT GOING FORWARD LOGIC
    if(lastWeek < firstWeek) {
        let lastpossibleweek = 52;
        let difference = lastpossibleweek - firstWeek; //e.g. 4

  
      //push first week first
        let firstweekobject = {
            weeknumber: firstWeek, 
            year: yearinno
        }
        weeks.push(firstweekobject);
        for (let i = 1; i <= difference; i++) {
            weekobject = {
                weeknumber: firstWeek + i, 
                year: yearinno
            }
            weeks.push(weekobject);
        }
        //and for the weeks in the new year

        for (let i = 1; i <= lastWeek; i++) {
            weekobject = {
                weeknumber: i, 
                year: yearinno + 1
            }
            weeks.push(weekobject);
        }



        //so if e.g. first week is 52, difference will be 0. 
        //if first week is 51, difference will be 1
        //last week could be e.g. week 5. 
        //first we add the last one or two weeks to the array  e.g. 51 and 52, 
        //then we add the ones from 1 to to the last week 

        //first loop through weeks, add them if below last possible week
        
       
        let beforelastweek = 52; //last week to loop - for the loop - last week of year
        lastweektoloop = beforelastweek;
        
        
      /*   weekobject = {
            weeknumber: lastWeek, //.toString()
            year: yearinno + 1
        }
        weeks.push(weekobject); */
        console.log(lastweektoloop, 'lastweektoloop in getWeeksInMonth')
    }
    else {
        lastweektoloop = lastWeek;
        
        if(lastWeek)
        for (let i = firstWeek; i <= lastweektoloop; i++) {
            let i2 = i; // / .toString()
            if(i < 10) {
                i2 = 0 + i;
            }
            weekobject = {
                weeknumber: i2,
                year: yearinno
            }
          //  weeks.push(i2);
          weeks.push(weekobject);
          if (lastWeek < firstWeek) {
            const indexOfWeek1 = weeks.findIndex(element => element.weeknumber === 1);
    
        // If found, move this element to the end of the array
        if (indexOfWeek1 !== -1) {
            const [week1] = weeks.splice(indexOfWeek1, 1);
            weeks.push(week1);
        }
          }
    
        }
        console.log(weeks, 'weeks in getWeeksInMonth')
      
    }
    return weeks;
}
export function makearrayofdatesfromWeek(weeknumber: string, year: string, monthnumber: string, monthname: string): any[] {
        console.log(weeknumber, 'weeknumber333');
        console.log(year, 'year333');
        console.log(monthnumber, 'monthnumber333'); //monthnumber here is not js so jan is 01,
        //TODO monthnumer maybe make it js so -1 so e.g. 0 for jan, but may be relied on somehwere else - and change it 
        console.log(monthname, 'monthname333');

      let yearinno = parseInt(year);
      let weeknumber1 = parseInt(weeknumber);
      let monthinno = parseInt(monthnumber);
        console.log(monthinno, 'monthinnomonthinno')
        console.log(yearinno, 'yearinnoyearinno')
        console.log(weeknumber1, 'weeknumber1weeknumber1')

        let weekdays = [];

        //get first day of weeknumber
      //  let firstdayofweek = new Date(year, 0, 1 + (weeknumber1 - 1) * 7);
     
        // Example Usage:
        const firstdayofweek = getDateFromWeekNumber(yearinno, weeknumber1);
      
        console.log(firstdayofweek.toDateString()); // Outputs the date of the first day of the given week number


        //for loop
        for (let i = 1; i < 8; i++) {
            let currentday1 =  new Date(firstdayofweek);
           //add days to firstdayofweek
            let currentday = currentday1.setDate(firstdayofweek.getDate() + i);
           let currentdayclean = new Date(currentday);
           
           //to yyyy-mm-dd
           let cleanyes  = currentdayclean.toISOString().slice(0, 10);
           let monthclean = cleanyes.slice(5, 7);
           let yearclean = cleanyes.slice(0, 4);

              console.log(cleanyes, 'cleanyes');
              
            let dateobj = {
                datetxt: cleanyes,
                dateobj: currentdayclean,
                monthname: getmonthname(monthclean, yearclean),
                monthnumber: getmonthnumber(cleanyes)
            }
              
              weekdays.push(dateobj);

        }
        console.log(weekdays,'weekdays6666')
        return weekdays;
      
}

//HERE U GIVE YEAR, WEEK NUMBER AND RETURNS 'date object' - works'
function getDateFromWeekNumber(year: number, weekNumber: number): Date {
    // Create a new date object representing January 1st of the given year
    const januaryFirst = new Date(year, 0, 1);

    // Calculate the number of days to add to January 1st
    // Get the day of the week for January 1st (0-6, where 0 is Sunday and 6 is Saturday)
    let dayOfWeek = januaryFirst.getDay();
    // Adjust to make Monday the first day of the week
    dayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    // Calculate the offset to the first Monday of the year
    const firstMondayOfYear = dayOfWeek > 4 ? 8 - dayOfWeek : 1 - dayOfWeek;
    // Calculate the number of days from the first Monday to the specified week
    // Subtract 1 from weekNumber because we start counting weeks from 1
    const daysToAdd = (weekNumber - 1) * 7 + firstMondayOfYear;

    // Add the calculated number of days to January 1st
    januaryFirst.setDate(januaryFirst.getDate() + daysToAdd);

    return januaryFirst;
}


//OLD STUFF CRAP

/* export function loopmonthdays(daysinmonth2: number, date2) {
    console.log(date2, 'date2 in loopmonthdays')
    console.log(typeof date2, 'typeof date2 in loopmonthdays')
    //CREATE OBJECT FOR EACH DATE OF MONTH
    let array = [];
    for (let i = 1; i <= daysinmonth2; i++) {
        let monthfromdate2 = date2.slice(5, 7);
        let year = date2.slice(0, 4);
        let daynumber = i;
        let datefull = `${year}-${monthfromdate2}-${daynumber}`;

        let dayofweek = getdayofweek(datefull);
      //  console.log(dayofweek, 'dayofweek in loopmonthdays2')
      //  console.log(datefull, 'datefull in loopmonthdays2')
        let dayofweektxt = getdayname(dayofweek);
        let month2 = getmonthnumber(datefull);
        
        let dateobject = {
            daynumber: daynumber,
            dayofweek: dayofweek,
            dayofweektxt: dayofweektxt,
            month2: month2,
            datefull: datefull,
        }
        array.push(dateobject);
    }
    return array;

} */
