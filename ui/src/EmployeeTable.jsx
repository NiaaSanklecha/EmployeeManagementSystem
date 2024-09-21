
import React from "react";
import Row from "./Row.jsx";
import Table from 'react-bootstrap/Table';

const EmployeeTable = (props) =>{

  const {deleteEmployee} = props;
    const rowStyle = { border: "1px solid silver", padding: "10px",  };
    
        return(
          <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th >ID</th>
          <th >First Name</th>
          <th >Last Name</th>
          <th >Age</th>
          <th >Date Of Joining</th>
          <th >Title</th>
          <th >Employee Type</th>
          <th >Department</th>
          <th >Retirement Date</th>
          <th >Current Status</th>
          <th colSpan={3}>Action</th>
        </tr>
      </thead>
      <tbody>
        
        {props.employees.map((employee,index) => (
          <Row
            key={employee.id} // when rendering an array of items, always provide key, key should be unique
            rowStyle={rowStyle}
            employee={employee}
            deleteEmployee={deleteEmployee}
            index={index}
          />
        ))}
      </tbody>
   
    </Table>
        );
    
}

export default EmployeeTable;