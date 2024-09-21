import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import EmployeeDirectory from './EmployeeDirectory.jsx';
import EmployeeDetails from './EmployeeDetails.jsx';
import EmployeeCreate from './EmployeeCreate.jsx';
import EmployeeUpdate from './EmployeeUpdate.jsx';
import UpcomingRetirement from './UpcomingRetirement.jsx';

function Contents(){
    return(
        <Switch>
            <Redirect exact to="/employees" from="/"/>
            <Route path="/employees" component={EmployeeDirectory}/>
            <Route path ="/addEmployee" component={EmployeeCreate}/>
            <Route path="/employee/update/:id" component={EmployeeUpdate}/>
            <Route path="/employee/:id" component={EmployeeDetails}/>
            <Route path="/upcomingRetirement" component={UpcomingRetirement}/>
        </Switch>
    );
}
export default Contents;