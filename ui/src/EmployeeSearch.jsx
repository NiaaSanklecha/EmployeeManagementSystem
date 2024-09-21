import React from "react";
import URLSearchParams from 'url-search-params'
import { withRouter } from 'react-router-dom';
import { Button, Row, Col} from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

class EmployeeSearch extends React.Component{
    constructor(props) {
        super(props)
        const params = new URLSearchParams(this.props.location.search)
        
        this.state = {
          pathname : props.path,
          employeeType: params.get('employeeType') || '',
          showUpcomingRetirements : false,
          changed: false
        }
        console.log("old",this.state.showUpcomingRetirements)
      }
      componentDidUpdate(prevProps) {
        const { search } = this.props.location;
        const { search: prevSearch } = prevProps.location;
        if (prevSearch !== search) {
          this.showOriginalFilter();
        }
      }
      showOriginalFilter = () => {
        const { search } = this.props.location;
        const params = new URLSearchParams(search);
        this.setState({
          employeeType: params.get('employeeType') || '',
          changed: false
        })
      }
    onChangeTitle = (e) => {
        const { value } = e.target;
        this.setState({ employeeType: value, changed: true });
      }
      onChangeUpcomingRetirements = (e) =>{
        
        this.setState({ showUpcomingRetirements: !this.state.showUpcomingRetirements, changed: true})
        
      }

      applyFilter = () =>{
        const {employeeType,showUpcomingRetirements} = this.state

        const { history } = this.props;

        const params = new URLSearchParams();
        if (employeeType) params.set('employeeType', employeeType);
        
        
        if(showUpcomingRetirements){
          
          params.append('showUpcomingRetirements',showUpcomingRetirements)
      
        }
        var search = params.toString()? `?${params.toString()}`: '';
        
        history.push({pathname: this.state.pathname, search});

      }
      
    render() {
        const {employeeType,showUpcomingRetirements} = this.state
        
        return(
          < >
          <Col lg="auto">
                <InputGroup className="mb-3">
                  <InputGroup.Text id="inputGroup-sizing-default">
                  Employee Type
                  </InputGroup.Text>
                  <Form.Select name={"employeeType"} onChange={this.onChangeTitle} value={employeeType}>
                  <option value={""}>All</option>
                          <option value={"FullTime"}>FullTime Employee</option>
                          <option value={"PartTime"}>PartTime Employee</option>
                          <option value={"Contract"}>Contract Employee</option>
                          <option value={"Seasonal"}>Seasonal Employee</option>
              </Form.Select>
                </InputGroup>
            </Col>
            <Col lg="auto">
                <Form.Check 
        type="switch" className="text-dark"
        onChange={this.onChangeUpcomingRetirements}
        id="custom-switch"
        label="Show Upcoming Retirements"
      />
              </Col>
              <Col lg="auto">
                <Button type="button" variant="dark" onClick={this.applyFilter} >Filter</Button>
                </Col>
                </>

             
            
        );
    }
}

export default withRouter(EmployeeSearch);