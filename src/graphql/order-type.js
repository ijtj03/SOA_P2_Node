const graphql = require('graphql')
const ProductType = require('./product-type')

const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLFloat } = graphql

const OrderType = new GraphQLObjectType({
  name: 'Ordenes',
  fields: () => ({
    id: { type: GraphQLInt },
    usuario: { type: GraphQLString },
    productos: { type: new GraphQLList(ProductType) },
    fecha: { type: GraphQLString }
  })
})

module.exports = OrderType
