const { ApolloServer, UserInputError } = require("apollo-server-express");
const fs = require("fs");
const GraphQLDate = require("./graphQLDate")
const employee = require("./employee");

const resolvers = {
    Query: {
      // Query will have the Read (GET) operation
      employeeList: employee.employeeList,
      employee : employee.getEmployee,
      upcomingRetirements : employee.upComingRetirements
    },
    Mutation: {
      addEmployee : employee.addEmployee,
      employeeUpdate : employee.updateEmployee,
      employeeDelete : employee.deleteEmployee
    },
    GraphQLDate,
  };

  const server = new ApolloServer({
    typeDefs: fs.readFileSync("userSchema.graphql", "utf-8"), // schema
    resolvers,
    // just to print error in the console
    formatError: (error) => {
      console.log(error);
      return error;
    },
  });

  function installHandler(app) {
    server.applyMiddleware({ app, path: "/graphql" });
  }
  
  module.exports = { installHandler };