import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Button } from "react-bootstrap";
const Row = withRouter((props) => {
    const { employee, rowStyle, deleteEmployee, index } = props;
    const { location: { search } } = props;
    

    return (
      <tr>
        <td>{employee.id}</td>
        <td >{employee.firstname}</td>
        <td >{employee.lastname}</td>
        <td >{employee.age}</td>
        <td >{employee.dateOfJoining ? employee.dateOfJoining.toDateString() : ""}</td>
        <td >{employee.title}</td>
        <td >{employee.employeeType}</td>
        <td >{employee.department}</td>
        <td  >{employee.retirementDate ? employee.retirementDate.toDateString() : ""}</td>
        <td >{employee.currentStatus}</td>
        <td  ><Link className="text-light" to={`/employee/${employee.id}`}>Show </Link></td>
        <td ><Link className="text-light" to={`/employee/update/${employee.id}`}>Update </Link></td>
        <td ><Button variant="light" onClick={()=> deleteEmployee(index)}>Delete</Button></td>
      </tr>
    );
});

export default Row;