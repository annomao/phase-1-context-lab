/* Your Code Here */
let createEmployeeRecord = function (record){
  return {
    firstName :record[0],
    familyName:record[1],
    title:record[2],
    payPerHour:record[3],
    timeInEvents:[],
    timeOutEvents:[]
  }
}
let createEmployeeRecords = function(records){
  return records.map(record =>{
    return createEmployeeRecord(record)
  })
}
let createTimeInEvent = function(time){
  const [date,hour] = time.split(" ")
  const timeInObject = {
    type : "TimeIn",
    hour : Number(hour),
    date: date
  }
  this.timeInEvents.push(timeInObject)
  return this
}
let createTimeOutEvent = function(time){
  const [date,hour] = time.split(" ")
  const timeOutObject = {
    type : "TimeOut",
    hour : Number(hour),
    date: date
  }
  this.timeOutEvents.push(timeOutObject)
  return this
}
let hoursWorkedOnDate = function(time){

  let hourInObj = this.timeInEvents.find(obj =>{
    return obj.date===time
  })
  let hourOutObj = this.timeOutEvents.find(obj =>{
    return obj.date===time
  })
  return (hourOutObj.hour - hourInObj.hour)/100
}
let wagesEarnedOnDate = function(time){
  const hoursWorked = hoursWorkedOnDate.call(this,time)
  const rate = this.payPerHour
  return hoursWorked * rate
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let findEmployeeByFirstName = function (srcArray,firstname){
  return srcArray.find(record =>{
    return record.firstName === firstname
  })
}

let calculatePayroll = function(employeeArray){
  let employeeWages = employeeArray.map(record =>{
    return allWagesFor.call(record)
  })
  
  const totalEmployeeWages = employeeWages.reduce((previousValue,currentValue)=>{
    return previousValue + currentValue
  })
  return totalEmployeeWages
}