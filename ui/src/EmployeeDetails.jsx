import React from 'react';
import { graphQLFetch } from './graphQLFetch';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
class EmployeeDetails extends React.Component {

    constructor() {
        super();
        this.state = {
          employee: {},
          remainingTime : "",
          invalidFields: {},
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
        console.log(data)
        this.setState({ employee: data? data.employee: {}, invalidFields: {} });
        
      }
       calculateRemainingTime = (currentDate, retirementDate) => {
        const timeDifference = retirementDate.getTime() - currentDate.getTime();
    
        const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));
        const months = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
        const days = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    
        return { years, months, days };
    };
     
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
        const { employee } = this.state;
    const {employeeId, firstname,
        lastname,
        age,
        dateOfJoining,
        title,
        department,
        employeeType,
        retirementDate,
        currentStatus } = employee;
        const currentDate = new Date();
    const remainingTime1 = this.calculateRemainingTime(currentDate, employee.retirementDate);
       
        return (
          <Card   bg={"dark"} className="text-center text-light w-50 m-auto mb-3 mt-3">
      <Card.Header bg={"dark"} variant="dark">Employee Id : {id}</Card.Header>
      <Card.Body>
      <ListGroup variant="flush">
        <ListGroup.Item>Name : {firstname} {lastname}</ListGroup.Item>
        <ListGroup.Item>Age: {age}</ListGroup.Item>
        <ListGroup.Item>Title: {title}</ListGroup.Item>
        <ListGroup.Item>Department: {department}</ListGroup.Item>
        <ListGroup.Item>Employee Type: {employeeType}</ListGroup.Item>
        <ListGroup.Item>Date Of Joining : {dateOfJoining.toDateString()}</ListGroup.Item>
        <ListGroup.Item>Retirement Date: {retirementDate.toDateString()}</ListGroup.Item>
      </ListGroup>
      </Card.Body>
      <Card.Footer  bg={"dark"} variant="dark">Remaining time for Retirement : Years: {remainingTime1.years},Months:{remainingTime1.months}, Days:{remainingTime1.days}</Card.Footer>
    </Card>
            /* <div style={{textAlign:"center", margin:"20px"}}>
                <h3>First Name : {firstname}</h3>
                <h3>Last Name : {lastname}</h3>
                <h3>Age : {age}</h3>
                <h3>Joining Date : {dateOfJoining.toDateString()}</h3>
                <h3>Title : {title}</h3>
                <h3>Department : {department}</h3>
                <h3>Employee Type : {employeeType}</h3>
                <h3>Current Status : {currentStatus}</h3>
               
            </div> */
        );
        }
    
}

export default EmployeeDetails;