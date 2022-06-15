// Your code here
const createEmployeeRecord = (employeeArray = []) => {
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = (employeesArray = []) => {
    const employees = []
    employeesArray.forEach(employee => {
        employees.push(createEmployeeRecord (employee));
    })
    return employees;
}

const createTimeInEvent = (employee = {}, time) => {
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time.substring(11)),
        date: time.substring(0, 10)
    })
    return employee;
}

const createTimeOutEvent = (employee = {}, time) => {
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time.substring(11)),
        date: time.substring(0, 10)
    })
    return employee;
}

const hoursWorkedOnDate = (employee = {}, date) => {
    let start, end, index;
    for (let i = 0; i < employee.timeInEvents.length; i++) {
        if (employee.timeInEvents[i].date === date) {
            start = employee.timeInEvents[i].hour;
            index = i;
            break;
        }
    }
    end = employee.timeOutEvents[index].hour;
    return (end - start) / 100;
}

const wagesEarnedOnDate = (employee ={}, date) => {
    return employee.payPerHour * hoursWorkedOnDate(employee, date);
}

const allWagesFor = (employee = {}) => {
    // let total = 0;
    // employee.timeInEvents.forEach(timeIn => {
    //     total += wagesEarnedOnDate(employee, timeIn.date);
    // })
    // return total;
    return employee.timeInEvents.reduce((total, timeIn) => total + wagesEarnedOnDate(employee, timeIn.date), 0);
}

const calculatePayroll = (employees = {}) => {
    // let total = 0;
    // employees.forEach(employee => {
    //     total += allWagesFor(employee)
    // })
    // return total;
    return employees.reduce((total, employee) => total + allWagesFor(employee), 0);
}