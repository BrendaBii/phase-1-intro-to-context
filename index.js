// Your code here
let createEmployeeRecord = function (array) {
    return {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: [],
    };
  };
  
  let createEmployeeRecords = function (employeeData) {
    return employeeData.map(function (array) {
      return createEmployeeRecord(array);
    });
  };
  
  let createTimeInEvent = function (employee, dateStamp) {
    let [date, hour] = dateStamp.split(" ");
  
    employee.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date,
    });
  
    return employee;
  };
  
  let createTimeOutEvent = function (employee, dateStamp) {
    let [date, hour] = dateStamp.split(" ");
  
    employee.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date,
    });
  
    return employee;
  };
  
  let hoursWorkedOnDate = function (employee, soughtDate) {
    let TimeIn = employee.timeInEvents.find(function (e) {
      return e.date === soughtDate;
    });
  
    let TimeOut = employee.timeOutEvents.find(function (e) {
      return e.date === soughtDate;
    });
  
    return (TimeOut.hour - TimeIn.hour) / 100;
  };
  
  let wagesEarnedOnDate = function (employee, dateSought) {
    let Wages = hoursWorkedOnDate(employee, dateSought) * employee.payPerHour;
    return parseFloat(Wages.toString());
  };
  
  let allWagesFor = function (employee) {
    let eligibleDates = employee.timeInEvents.map(function (e) {
      return e.date;
    });
  
    let payable = eligibleDates.reduce(function (total, dateSought) {
      return total + wagesEarnedOnDate(employee, dateSought);
    }, 0);
  
    return payable;
  };
  
  let calculatePayroll = function (arrayOfEmployeeRecords) {
    return arrayOfEmployeeRecords.reduce(function (total, record) {
      return total + allWagesFor(record);
    }, 0);
  };
  