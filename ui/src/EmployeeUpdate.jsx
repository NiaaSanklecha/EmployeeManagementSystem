import React from 'react';
import { graphQLFetch } from './graphQLFetch';
import { Row,Card,Col,Form ,ListGroup, Button} from 'react-bootstrap';

class EmployeeUpdate extends React.Component{
    constructor() {
        super();
        this.state = {
          employee: {},
          invalidFields: {},
          toastMessage: ""
        };
      }
      componentDidMount() {
        this.fetchEmployee();
      }
    
      componentDidUpdate(prevProps) {
        const {
          match: {
            params: { id: prevId },
          },
        } = prevProps;
        const {
          match: {
            params: { id },
          },
        } = this.props;
        if (id !== prevId) {
          this.fetchEmployee();
        }
      }
      handleFormChange = (e, naturalValue) => {
        const { name, value: textValue } = e.target;
        const value = naturalValue === undefined ? textValue : naturalValue;
    
        this.setState((prevState) => {
          return { employee: { ...prevState.employee, [name]: value } };
        });
      };
      fetchEmployee = async () => {
        const {
          params: { id },
        } = this.props.match;
        const query = `query employee($id: Int!) {
          employee(id: $id) {
            id,
            firstname,
            lastname,
            age,
            dateOfJoining,
            title,
            department,
            employeeType,
            retirementDate
            currentStatus
          }
        }`;
        const data = await graphQLFetch(query, { id });
        this.setState({ employee: data? data.employee: {}, invalidFields: {} });
    }
    updateButtonClick = async (e) => {
        e.preventDefault();
        const { history } = this.props;
        const { employee, invalidFields } = this.state;
        const { id, ...changes } = employee;
        console.log(employee);

        const query = `mutation employeeUpdate($id: Int!, $changes: EmployeeUpdateInputs!) {
            employeeUpdate(id: $id, changes: $changes) {
                id,
                firstname,
                lastname,
                age,
                dateOfJoining,
                title,
                department,
                employeeType,
                retirementDate
                currentStatus
            }
          }`
          const data = await graphQLFetch(query, { id, changes });
          if (data) {
            this.setState({ employee: data.employeeUpdate, toastMessage:"Employee Updated successfully!!"});
            const params = new URLSearchParams(search);
            params.set("toastMessage",this.state.toastMessage)
            var search = params.toString()
            history.push({pathname:"/employees",search})
          }
    }
    inputDiv = {margin: "10px 0px", display: "grid", gridTemplateColumns: "1fr 1fr", gridGap: "35px"}
      inputStyle = {width : "100%", padding: "10px"}
    render(){
        const {
            params: { id: propsId },
          } = this.props.match;
          const {
            employee: { id },
          } = this.state;
      
          if (id == null) {
            if (propsId != null) {
              return <h3>{`Issue with ID ${propsId} not found.`}</h3>;
            }
            return null;
          }
      
          const { invalidFields } = this.state;
          let validationMessage;
          if (Object.keys(invalidFields).length != 0) {
            validationMessage = (
              <div className="error">
                Please correct invalid fields before submitting.
              </div>
            );
          }
          const { employee } = this.state;
          const { firstname,
            lastname,
            age,
            dateOfJoining,
            title,
            department,
            employeeType, retirementDate,
            currentStatus } = employee;
        return(
          <Row className='mt-5'>
          
          <Col md={7}>
          <Card   bg={"dark"} className="text-center text-light">
  <Card.Header bg={"dark"} variant="dark">Employee Id : {id}</Card.Header>
  <Card.Body>
  <ListGroup variant="flush">
    <ListGroup.Item>Name : {firstname} {lastname}</ListGroup.Item>
    <ListGroup.Item>Age: {age}</ListGroup.Item>
    <ListGroup.Item>Title: {title}</ListGroup.Item>
    <ListGroup.Item>Department: {department}</ListGroup.Item>
    <ListGroup.Item>Employee Type: {employeeType}</ListGroup.Item>
    <ListGroup.Item>Date Of Joining : {dateOfJoining ? dateOfJoining.toDateString() : ""}</ListGroup.Item>
    <ListGroup.Item>Retirement Date: {retirementDate ? retirementDate.toDateString(): ""}</ListGroup.Item>
  </ListGroup>
  </Card.Body>
  <Card.Footer className="text-muted">2 days ago</Card.Footer>
</Card>
          </Col>
          <Col md={5}>
            <h4>Update Details </h4>
            <Form onSubmit={this.updateButtonClick} style={{maxWidth: "700px", margin: "auto"}}>
            <Form.Group as={Col} controlId="formGridAge">
      <Form.Label>Title</Form.Label>
      <Form.Select defaultValue="Choose..."  name={"title"} onChange={this.handleFormChange} value={title} >
      <option>Choose...</option>
            <option value={"Employee"}>Employee</option>
            <option value={"Manager"}>Manager</option>
            <option value={"Director"}>Director</option>
            <option value={"VP"}>VP</option>
      </Form.Select>
    </Form.Group>
    <Form.Group as={Col} controlId="formGridLastName">
      <Form.Label>Department</Form.Label>
      <Form.Select defaultValue="Choose..."name={"department"} onChange={this.handleFormChange} value={department}>
      <option>Choose...</option>
      <option value={"IT"}>IT</option>
            <option value={"Marketing"}>Marketing</option>
            <option value={"HR"}>HR</option>
            <option value={"Engineering"}>Engineering</option>
      </Form.Select>
    </Form.Group>
    <Form.Group as={Col} controlId="formGridAge">
      <Form.Label>Current Status</Form.Label>
      <Form.Control 
       type="text" name='currentStatus'
       onChange={this.handleFormChange} value={currentStatus}  />
    </Form.Group>
    <Button variant="dark" className='text-center p-2 w-25 mt-4' type="submit">
    Update
  </Button>
       
      </Form>
      </Col>
        </Row>
        )
    };
}
export default EmployeeUpdate;