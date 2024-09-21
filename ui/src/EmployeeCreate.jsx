import React from 'react';
import PropTypes from 'prop-types';
import { graphQLFetch } from './graphQLFetch';
import TextInput from './TextInput.jsx';
import { Form, Row, Col, Button } from 'react-bootstrap';
class EmployeeCreate extends React.Component{
    constructor() {
        super();
        this.state = {
          employee: {
            
            firstname: "",
            lastname: "",
            age: "",
            dateOfJoining: "",
            title: "",
            department: "",
            employeeType: "",
            currentStatus: ""
          },
        };
      }

      addEmployee = async (employee) => {
        const {history} = this.props
        const query = `mutation addEmployee($employeeVar: EmployeeInput!) {
          addEmployee(employee: $employeeVar) {
            id
          }
        }`;
        
        const result = await graphQLFetch(query, { employeeVar: employee });
        if(result){
          const params = new URLSearchParams(search);
            params.set("toastMessage","Employee Added Successfully!!")
            var search = params.toString()
            history.push({pathname:"/employees",search})
        }
       
      };
      handleChange = (event) => {
        // We have specified name and value in <input /> element
        const { name, value } = event.target;
        this.setState((prevState) => ({
          employee: {
            // we copy the rest of the fields of issue object
            ...prevState.employee, 
            // for example, if we change input for 'title', name will be 'title' and value will have the value of 'title' input
            [name]: value,
          },
        }));
      };  
      handleAddButtonClick = (event) => {
        event.preventDefault();
        
        const newEmployee = {
          ...this.state.employee,
          
          currentStatus: 1,
          
          
        }
        console.log(newEmployee)
        this.addEmployee(newEmployee);
        this.setState({
          employee: {
            firstname: "",
            lastname: "",
            age: "",
            dateOfJoining: "",
            title: "",
            department: "",
            employeeType: "",
          },
        });
      };
      
    render() {
        return(

          <Form onSubmit={this.handleAddButtonClick} className='align-items-center w-75 m-3 ' >
            <h4>Add Employee Details </h4>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text"
           onChange={this.handleChange}
                  name={"firstname"}
                  value={this.state.employee.firstname}  placeholder="Enter first name" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Enter last name" 
          onChange={this.handleChange}
          name={"lastname"}
          value={this.state.employee.lastname}/>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridAge">
          <Form.Label>Age</Form.Label>
          <Form.Control 
           type="number"
           onChange={this.handleChange}
           name={"age"}
           value={this.state.employee.age}  placeholder="Enter age" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridLastName">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" placeholder="Enter joining date" 
          onChange={this.handleChange}
          name={"dateOfJoining"}
          value={this.state.employee.dateOfJoining}/>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridAge">
          <Form.Label>Title</Form.Label>
          <Form.Select defaultValue="Choose..."  name={"title"} onChange={this.handleChange} value={this.state.employee.title} >
          <option>Choose...</option>
                <option value={"Employee"}>Employee</option>
                <option value={"Manager"}>Manager</option>
                <option value={"Director"}>Director</option>
                <option value={"VP"}>VP</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridLastName">
          <Form.Label>Department</Form.Label>
          <Form.Select defaultValue="Choose..."name={"department"} onChange={this.handleChange} value={this.state.employee.department}>
          <option>Choose...</option>
          <option value={"IT"}>IT</option>
                <option value={"Marketing"}>Marketing</option>
                <option value={"HR"}>HR</option>
                <option value={"Engineering"}>Engineering</option>
          </Form.Select>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        

        <Form.Group as={Col} controlId="formGridLastName">
          <Form.Label>Employee Type</Form.Label>
          <Form.Select defaultValue="Choose..." name={"employeeType"} onChange={this.handleChange} value={this.state.employee.employeeType} style={this.inputStyle}>
          <option>Choose...</option>
                <option value={"FullTime"}>FullTime</option>
                <option value={"PartTime"}>PartTime</option>
                <option value={"Contract"}>Contract</option>
                <option value={"Seasonal"}>Seasonal</option>
          </Form.Select>
        </Form.Group>
      </Row>
      <Button variant="dark" className='text-center p-2 w-25' type="submit">
        Add
      </Button>

      </Form>
           /*  <div style={this.formStyle}>
              <h2>Add Employee</h2>
        <form onSubmit={this.handleAddButtonClick} style={{maxWidth: "700px", margin: "auto"}}>
          <div style={this.inputDiv}>
            <div>
                <span>Firstname</span>
                <TextInput style={this.inputStyle}
                  
                onChange={this.handleChange}
                  name={"firstname"}
                  value={this.state.employee.firstname}
                />
            </div>
            <div>
            <span>Lastname</span>
            <TextInput style={this.inputStyle}
              
              onChange={this.handleChange}
              name={"lastname"}
              value={this.state.employee.lastname}
            />
            </div>
            
            
          </div>
          <div style={this.inputDiv}>
            
            <div>
            <span>Age</span>
            <input style={this.inputStyle}
              type={"number"}
              onChange={this.handleChange}
              name={"age"}
              value={this.state.employee.age}
            />
            </div>
            <div>
              <span>Date of Joining</span>
            <input style={this.inputStyle}
              type={"date"}
              onChange={this.handleChange}
              name={"dateOfJoining"}
              value={this.state.employee.dateOfJoining}
            />
              </div>
          </div>
          <div style={this.inputDiv}>
              
              <div>
              <span>Title</span>
            <select name={"title"} onChange={this.handleChange} value={this.state.employee.title} style={this.inputStyle}>
                <option value={""}>Select</option>
                <option value={"Employee"}>Employee</option>
                <option value={"Manager"}>Manager</option>
                <option value={"Director"}>Director</option>
                <option value={"VP"}>VP</option>
            </select> 
              </div>
              <div>
            <span>Department</span>
            <select name={"department"} onChange={this.handleChange} value={this.state.employee.department} style={this.inputStyle}>
                <option value={"IT"}>IT</option>
                <option value={"Marketing"}>Marketing</option>
                <option value={"HR"}>HR</option>
                <option value={"Engineering"}>Engineering</option>
            </select> 
            </div>
          </div>
          
          
          <div style={this.inputDiv}>
            
            <div>
            <span>Employee Type</span>
            <select name={"employeeType"} onChange={this.handleChange} value={this.state.employee.employeeType} style={this.inputStyle}>
                <option value={"FullTime"}>FullTime</option>
                <option value={"PartTime"}>PartTime</option>
                <option value={"Contract"}>Contract</option>
                <option value={"Seasonal"}>Seasonal</option>
            </select> 
            </div>
            
          </div>
          
          
          <div style={this.inputDiv}>
            <button type={"submit"} style={{padding: "10px", width:"50%",backgroundColor:"black", color:"white"}}>Add </button>
          </div>
        </form>
      </div> */
        );
    }
}

EmployeeCreate.PropTypes ={
    addEmployee : PropTypes.func.isRequired,
}

export default EmployeeCreate;