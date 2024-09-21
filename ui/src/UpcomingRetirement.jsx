import React from "react";
import EmployeeTable from "./EmployeeTable.jsx";
import { graphQLFetch } from "./graphQLFetch.js";
import EmployeeSearch from "./EmployeeSearch.jsx";
import {  Modal,  Button, Card, Row } from "react-bootstrap";

class UpcomingRetirement extends React.Component{
    constructor() {
        super();
        this.state = {
          employees: [],
          path: "/upcomingRetirement"
        };
    
    }

    fetchData = async () => {
        const vars = {};
      const { search } = this.props.location;
      
      const params = new URLSearchParams(search);
      
  
      if (params.get("employeeType")) vars.employeeType = params.get("employeeType");
  
  
          const query = `query
          upcomingRetirements($employeeType: employee){
            upcomingRetirements (employeeType : $employeeType) {
              id,
              firstname,
              lastname,
              age,
              dateOfJoining,
              title,
              department,
              employeeType,
              retirementDate,
              currentStatus
            }
      }`;
      
          const result = await graphQLFetch(query, vars);
          console.log(result);
          this.setState({ employees: result.upcomingRetirements });
        };
        componentDidMount() {
          
          this.fetchData();
          
        }
        componentDidUpdate(prevProps) {
          
          const params = this.props.location.search;
          const prevparams = prevProps.location.search;
          console.log("params",this.props.location.search)
          if (prevparams != params) {
            console.log("params",this.props.location.search)
            this.fetchData();
          }
        }
        deleteEmployee = async (index) => {
        
            const { employees } = this.state;
            console.log(employees[index].currentStatus)
            if(employees[index].currentStatus==1){
                console.log(employees[index].currentStatus)
            }else{
            
            const query = `mutation employeeDelete($id: Int!) {
              employeeDelete(id: $id)
            }`;
            
    
            const {
              location: { pathname, search },
              history,
            } = this.props;
            const { id } = employees[index];
            const data = await graphQLFetch(query, { id });
            if (data && data.employeeDelete) {
              this.setState((prevState) => {
                const newList = [...prevState.employees];
                if (pathname === `/employee/delete/${id}`) {
                  history.push({ pathname: "/employees", search });
                }
                newList.splice(index, 1);
                return { employees: newList };
              });
            } else {
              this.fetchData();
            } 
          }
          };

        render(){
            return(
              
            < >
            <Row className="text-center mb-4 mt-4">
             
            <EmployeeSearch filterName="Employee" path={this.state.path}/>
         </Row> 
         <Row>
         <EmployeeTable employees={this.state.employees} deleteEmployee={this.deleteEmployee}/>
               </Row> 
           </>
               
            );
        }
    }
    
    export default UpcomingRetirement;