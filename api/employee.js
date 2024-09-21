const { UserInputError } = require('apollo-server-express');
const { getDB, getNextCounter } = require('./db');

const validateData = (employee) => {
    const errors = [];
  
    if (employee.age < 20 || employee.age > 70) {
      errors.push("Age should be between 20 to 70 only.");
    }
  
    if (errors.length > 0) {
      throw new UserInputError("Errors:", { errors });
    }
  };

  const employeeList = async (parent, {employeeType}) => {
    const db = getDB();
    let filter = {}
    if (employeeType) filter.employeeType = employeeType
    console.log(filter)
    const employees = await db.collection("employess").find(filter).toArray();
    //console.log(employees);
    return employees;
  };
  const addEmployee = async (parent, args) => {
    const db = getDB();
    const { employee } = args;
    validateData(employee);
    const retirementDate = new Date(employee.dateOfJoining);
    const tempAge = 65 - employee.age;
    retirementDate.setFullYear(retirementDate.getFullYear() + tempAge);
    employee.retirementDate = retirementDate;
    employee.id = await getNextCounter("employeeCount");
    console.log("employee", employee);
    const result = await db.collection("employess").insertOne(employee);

    const savedIssue = await db
      .collection("employess")
      .findOne({ _id: result.insertedId });
    console.log(savedIssue);
    return savedIssue;
  }

  const updateEmployee = async (parent, { id, changes}) => {
    const db = getDB();
    if (changes.title || changes.department || changes.currentStatus) {
      const employee = await db.collection('employess').findOne({ id });
      Object.assign(employee, changes); // merge changes
      validateData(employee)
    }
      await db.collection('employess').updateOne({ id }, { $set : changes });
      const updatedEmployee = await db.collection('employess').findOne({ id });
      console.log(updatedEmployee)
      return updatedEmployee
  }

  const getEmployee = async (parent, {id}) =>{
    console.log(id)
    const db = getDB();
    const employee = await db.collection("employess").findOne({id});
    console.log(employee)
    return employee;
  }

  

  const deleteEmployee = async (parent, { id }) => {
    const db = getDB();
    const employee = await db.collection('employess').findOne({ id });
    if (!employee){
      return false;
    } else{
      const result = await db.collection('employess').deleteOne({ id });
      return result.deletedCount === 1;
    }
    
    
    
  }
  const upComingRetirements = async (parent, employeeType) => {
    const db = getDB();
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
    var upcomingRetirements = null;
    let filter = {}
    if (employeeType){
      filter = employeeType
      upcomingRetirements = await db.collection('employess').find({
        $and:[
          {
            retirementDate: {
              $gte: new Date(), // Today's date
              $lte: sixMonthsFromNow // Six months from now
          }
          },
          filter
        ]
        
    }).toArray();
     
    } else{
      upcomingRetirements = await db.collection('employess').find({
        retirementDate: {
            $gte: new Date(), // Today's date
            $lte: sixMonthsFromNow // Six months from now
        }
    }).toArray();

    }
   
    console.log(upcomingRetirements)

  return upcomingRetirements;
    
  };
  module.exports = {employeeList,addEmployee,getEmployee, updateEmployee, deleteEmployee,upComingRetirements}