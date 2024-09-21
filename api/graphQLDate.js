const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");

const GraphQLDate = new GraphQLScalarType({
    name: "GraphQLDate",
    description: "A Date() type in graphQL as a scalar",
    serialize: (value) => {
      return value.toISOString();
    },
    parseLiteral: (ast) => {
      if (ast.kind === Kind.STRING) {
        const value = new Date(ast.value);
        return isNaN(value) ? undefined : value;
      }
    },
    parseValue: (value) => {
      const value2 = new Date(value);
      return isNaN(value2) ? undefined : value2;
    },
  });

  module.exports = GraphQLDate