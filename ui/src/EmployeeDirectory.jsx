import React from "react";
import { graphQLFetch } from "./graphQLFetch.js";
import EmployeeCreate from "./EmployeeCreate.jsx";
import EmployeeTable from "./EmployeeTable.jsx";
import EmployeeSearch from "./EmployeeSearch.jsx";
import {  Modal,  Button, Card, Row, Form, } from "react-bootstrap";
import Toast from "./Toast.jsx";


class EmployeeDirectory extends React.Component{
    constructor() {
        super();
        this.state = {
          employees: [],
          showing: false,
          toastVisible: false,
          toastMessage: "",
          toastType: "dark",
        };
    
    }

    
  hideModal = () => {
    this.setState({showing: false})
  }
  showModal = () => {
    this.setState({showing: true});
  }

  showSuccess = (message) => {
    console.log("initiate")
    this.setState({
      toastVisible: true,
      toastMessage: message,
      toastType: "dark",
    });
  };
  showError = (message) => {
    this.setState({
      toastVisible: true,
      toastMessage: message,
      toastType: "danger",
    });
  };
  dismissToast = () => {
    this.setState({ toastVisible: false });
  };
    
    fetchData = async () => {
      const vars = {};
    const { search } = this.props.location;
      
    const params = new URLSearchParams(search);
    console.log(params)
    if (params.get("employeeType")) vars.employeeType = params.get("employeeType");
    if (params.get("showUpcomingRetirements")) vars.showUpcomingRetirements = params.get("showUpcomingRetirements");
    if(params.get("toastMessage") ){
      this.showSuccess(params.get("toastMessage"))
    }
      var query = "";
    if(vars.showUpcomingRetirements){
      console.log(vars.showUpcomingRetirements)
      query = `query
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
    }else{
      query = `query
      employeeList($employeeType: employee){
        employeeList (employeeType : $employeeType) {
          _id,
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
        this.setState({ employees: result.employeeList });
    }

        
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
            this.showError(`CAN"T DELETE! Employee ${employees[index].id} is currently active.`);
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
          this.showSuccess(`Employee ${id} deleted successfully`);
        } else {
          
          this.fetchData();
        } 
      }
      };

    
    
    render(){
      const { toastVisible, toastType, toastMessage } = this.state;
        return(
          
            < >
            <Toast 
          showing={toastVisible}
          onDismiss={this.dismissToast}
          variant={toastType}
        >
          {toastMessage}
        </Toast>

        
             <Row className="text-center mb-4 mt-4">
             
          <EmployeeSearch filterName="Employee" />
          
          </Row> 
          <Row>
                <EmployeeTable employees={this.state.employees} deleteEmployee={this.deleteEmployee}/>
                </Row> 
                
            </>
        );
    }
}

export default EmployeeDirectory;