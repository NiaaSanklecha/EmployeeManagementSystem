const Row = props => {
  const {
    employee,
    rowStyle
  } = props;
  return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    style: rowStyle
  }, employee.id), /*#__PURE__*/React.createElement("td", {
    style: rowStyle
  }, employee.firstname), /*#__PURE__*/React.createElement("td", {
    style: rowStyle
  }, employee.lastname), /*#__PURE__*/React.createElement("td", {
    style: rowStyle
  }, employee.age), /*#__PURE__*/React.createElement("td", {
    style: rowStyle
  }, employee.dateOfJoining ? employee.dateOfJoining.toDateString() : ""), /*#__PURE__*/React.createElement("td", {
    style: rowStyle
  }, employee.title), /*#__PURE__*/React.createElement("td", {
    style: rowStyle
  }, employee.employeeType), /*#__PURE__*/React.createElement("td", {
    style: rowStyle
  }, employee.department), /*#__PURE__*/React.createElement("td", {
    style: rowStyle
  }, employee.currentStatus));
};
const EmployeeTable = props => {
  const rowStyle = {
    border: "1px solid silver",
    padding: "10px"
  };
  return /*#__PURE__*/React.createElement("table", {
    style: {
      borderCollapse: "collapse",
      width: "100%",
      border: "2px solid #000000"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    style: rowStyle
  }, "ID"), /*#__PURE__*/React.createElement("td", {
    style: rowStyle
  }, "First Name"), /*#__PURE__*/React.createElement("td", {
    style: rowStyle
  }, "Last Name"), /*#__PURE__*/React.createElement("td", {
    style: rowStyle
  }, "Age"), /*#__PURE__*/React.createElement("td", {
    style: rowStyle
  }, "Date Of Joining"), /*#__PURE__*/React.createElement("td", {
    style: rowStyle
  }, "Title"), /*#__PURE__*/React.createElement("td", {
    style: rowStyle
  }, "Employee Type"), /*#__PURE__*/React.createElement("td", {
    style: rowStyle
  }, "Department"), /*#__PURE__*/React.createElement("td", {
    style: rowStyle
  }, "Current Status"), /*#__PURE__*/React.createElement("td", null))), /*#__PURE__*/React.createElement("tbody", null, props.employees.map(employee => /*#__PURE__*/React.createElement(Row, {
    key: employee.id // when rendering an array of items, always provide key, key should be unique
    ,
    rowStyle: rowStyle,
    employee: employee
  }))));
};
class EmployeeSearch extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "EmployeeSearch"));
  }
}
const dateRegex = new RegExp("^\\d\\d\\d\\d-\\d\\d-\\d\\d");
function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}
const graphQLFetch = async (query, variables = {}) => {
  try {
    const respone = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query,
        variables
      })
    });
    const body = await respone.text();
    const result = JSON.parse(body, jsonDateReviver);
    if (result.errors) {
      const error = result.errors[0];
      console.log(error.extensions.code);
      if (error.extensions.code == "BAD_USER_INPUT") {
        const details = error.extensions.exception.errors.join("\n");
        alert(`${error.message} \n ${details}`);
      } else {
        alert(`${error.extensions.code}: ${error.message}`);
      }
    } else {
      return result.data;
    }
  } catch (error) {
    alert(`Error in sending data  to server: ${error.message}`);
  }
};
class EmployeeCreate extends React.Component {
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
      }
    };
  }
  handleChange = event => {
    // We have specified name and value in <input /> element
    const {
      name,
      value
    } = event.target;
    this.setState(prevState => ({
      employee: {
        // we copy the rest of the fields of issue object
        ...prevState.employee,
        // for example, if we change input for 'title', name will be 'title' and value will have the value of 'title' input
        [name]: value
      }
    }));
  };
  handleAddButtonClick = event => {
    event.preventDefault();
    const newEmployee = {
      ...this.state.employee,
      currentStatus: 1
    };
    console.log(newEmployee);
    this.props.addEmployee(newEmployee);
    this.setState({
      employee: {
        firstname: "",
        lastname: "",
        age: "",
        dateOfJoining: "",
        title: "",
        department: "",
        employeeType: ""
      }
    });
  };
  formStyle = {
    textAlign: "center",
    width: "100%"
  };
  inputDiv = {
    margin: "10px 0px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: "35px"
  };
  inputStyle = {
    width: "100%",
    padding: "10px"
  };
  render() {
    return /*#__PURE__*/React.createElement("div", {
      style: this.formStyle
    }, /*#__PURE__*/React.createElement("h2", null, "Add Employee"), /*#__PURE__*/React.createElement("form", {
      onSubmit: this.handleAddButtonClick,
      style: {
        maxWidth: "700px",
        margin: "auto"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: this.inputDiv
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, "Firstname"), /*#__PURE__*/React.createElement("input", {
      style: this.inputStyle,
      type: "text",
      onChange: this.handleChange,
      name: "firstname",
      value: this.state.employee.firstname
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, "Lastname"), /*#__PURE__*/React.createElement("input", {
      style: this.inputStyle,
      type: "text",
      onChange: this.handleChange,
      name: "lastname",
      value: this.state.employee.lastname
    }))), /*#__PURE__*/React.createElement("div", {
      style: this.inputDiv
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, "Age"), /*#__PURE__*/React.createElement("input", {
      style: this.inputStyle,
      type: "number",
      onChange: this.handleChange,
      name: "age",
      value: this.state.employee.age
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, "Date of Joining"), /*#__PURE__*/React.createElement("input", {
      style: this.inputStyle,
      type: "date",
      onChange: this.handleChange,
      name: "dateOfJoining",
      value: this.state.employee.dateOfJoining
    }))), /*#__PURE__*/React.createElement("div", {
      style: this.inputDiv
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, "Title"), /*#__PURE__*/React.createElement("select", {
      name: "title",
      onChange: this.handleChange,
      value: this.state.employee.title,
      style: this.inputStyle
    }, /*#__PURE__*/React.createElement("option", {
      value: ""
    }, "Select"), /*#__PURE__*/React.createElement("option", {
      value: "Employee"
    }, "Employee"), /*#__PURE__*/React.createElement("option", {
      value: "Manager"
    }, "Manager"), /*#__PURE__*/React.createElement("option", {
      value: "Director"
    }, "Director"), /*#__PURE__*/React.createElement("option", {
      value: "VP"
    }, "VP"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, "Department"), /*#__PURE__*/React.createElement("select", {
      name: "department",
      onChange: this.handleChange,
      value: this.state.employee.department,
      style: this.inputStyle
    }, /*#__PURE__*/React.createElement("option", {
      value: "IT"
    }, "IT"), /*#__PURE__*/React.createElement("option", {
      value: "Marketing"
    }, "Marketing"), /*#__PURE__*/React.createElement("option", {
      value: "HR"
    }, "HR"), /*#__PURE__*/React.createElement("option", {
      value: "Engineering"
    }, "Engineering")))), /*#__PURE__*/React.createElement("div", {
      style: this.inputDiv
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, "Employee Type"), /*#__PURE__*/React.createElement("select", {
      name: "employeeType",
      onChange: this.handleChange,
      value: this.state.employee.employeeType,
      style: this.inputStyle
    }, /*#__PURE__*/React.createElement("option", {
      value: "FullTime"
    }, "FullTime"), /*#__PURE__*/React.createElement("option", {
      value: "PartTime"
    }, "PartTime"), /*#__PURE__*/React.createElement("option", {
      value: "Contract"
    }, "Contract"), /*#__PURE__*/React.createElement("option", {
      value: "Seasonal"
    }, "Seasonal")))), /*#__PURE__*/React.createElement("div", {
      style: this.inputDiv
    }, /*#__PURE__*/React.createElement("button", {
      type: "submit",
      style: {
        padding: "10px",
        width: "50%",
        backgroundColor: "black",
        color: "white"
      }
    }, "Add "))));
  }
}
class EmployeeDirectory extends React.Component {
  constructor() {
    super();
    this.state = {
      employees: []
    };
    console.log("[contructor]");
  }
  fetchData = async () => {
    const query = `query {
            employeeList {
            id,
            firstname,
            lastname,
            age,
            dateOfJoining,
            title,
            department,
            employeeType,
            currentStatus
            
        }
    }`;
    const result = await graphQLFetch(query);
    console.log(result);
    this.setState({
      employees: result.employeeList
    });
  };
  componentDidMount() {
    // Always fetch data from server in here or in componentDidUpdate
    this.fetchData();
  }
  addEmployee = async employee => {
    const query = `mutation addEmployee($employeeVar: EmployeeInput!) {
          addEmployee(employee: $employeeVar) {
            id
          }
        }`;
    const result = await graphQLFetch(query, {
      employeeVar: employee
    });
    this.fetchData();
  };
  divSyle = {
    display: "grid",
    gridTemplateColumns: "60% 40%",
    gridGap: "50px"
  };
  render() {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
      style: {
        textAlign: "center",
        fontSize: "50px",
        color: "grey"
      }
    }, "Employee Directory"), /*#__PURE__*/React.createElement(EmployeeCreate, {
      addEmployee: this.addEmployee
    }), /*#__PURE__*/React.createElement(EmployeeTable, {
      employees: this.state.employees
    }));
  }
}
ReactDOM.render( /*#__PURE__*/React.createElement(EmployeeDirectory, null), document.getElementById("content"));