const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat } = graphql;

const ProductType = new GraphQLObjectType({
  name: "Productos",
  fields: () => ({
    codigo: { type: GraphQLString },
    precio: { type: GraphQLFloat },
    cantidad: { type: GraphQLInt }
  })
});

module.exports = ProductType;
