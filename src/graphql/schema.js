const graphql = require('graphql')

const OrderType = require('./order-type')
const OrderSQLModel = require('../models/mysql/order')


const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLInt,
  GraphQLFloat
} = graphql

const OrderQuery = new GraphQLObjectType({
  name: 'querOrdenes',
  fields: {
    getOrdenes: {
      type: new GraphQLList(OrderType),
      args: {},
      resolve: async (parent, args) => {
        const data = await OrderSQLModel.getOrdenes()
        return data
      }
    },
    getOrden: {
      type: OrderType,
      args: { id: { type: GraphQLInt } },
      resolve: async (parent, args) => {
        const { id } = args
        let data = await OrderSQLModel.getOrden(id)
        return data
      }
    }
  }
})

const ProductInputType = new GraphQLInputObjectType({
  name: 'ProductInput',
  fields: () => ({
    id_producto: { type: GraphQLString },
    precio: { type: GraphQLFloat },
    cantidad: { type: GraphQLInt }
  })
})

const OrderMutation = new GraphQLObjectType({
  name: 'mutOrdenes',
  fields: {
    agregarOrden: {
      type: GraphQLString,
      args: {
        usuario: { type: GraphQLString },
        productos: { type: new GraphQLList(ProductInputType) }
      },
      resolve: async (parent, args) => {
        console.log("Prueba")
        const { usuario, productos } = args

        const order = { usuario: usuario, fecha: new Date() };
        try {
          const addOrder = await OrderSQLModel.insertarOrden(order)
          const { insertId } = addOrder
          for (const product of productos) {
            await OrderSQLModel.insertarProducto(insertId, product)
          }

          return "Ok";
        } catch{
          return "Error";
        }
      }
    },
    actualizarOrden: {
      type: GraphQLString,
      args: {
        id: { type: GraphQLInt },
        usuario: { type: GraphQLString },
        productos: { type: new GraphQLList(ProductInputType) }
      },
      resolve: async (parent, args) => {
        const { id, usuario, productos } = args
        try {
          if (usuario) {
            const updatedOrder = await OrderSQLModel.actualizarOrden(id, { usuario })
            console.log(updatedOrder)
            updatedId = updatedOrder.affectedRows
            if (updatedId == 0) {
              return "Error"
            }
          }
          if (productos) {
            for (const producto of productos) {
              await OrderSQLModel.actualizarProducto(id, producto)
            }
          }

          return "Ok"
        } catch (error) {
          return "Error"
        }
      }
    },
    borrarOrden: {
      type: GraphQLString,
      args: {
        id: { type: GraphQLInt }
      },
      resolve: async (parent, args) => {
        const { id } = args
        try {
          await OrderSQLModel.borrarProductos(id)
          await OrderSQLModel.borrarOrden(id)

          return "OK";
        } catch{
          return "Error";
        }
      }
    },
    borrarProducto: {
      type: GraphQLString,
      args: {
        codigo: { type: GraphQLString },
        id_orden: { type: GraphQLInt }
      },
      resolve: async (parent, args) => {
        const { codigo, id_orden } = args
        try {
          await OrderSQLModel.borrarProducto(codigo, id_orden)
          return "Ok"
        } catch (error) {
          return "Error"
        }
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: OrderQuery,
  mutation: OrderMutation
})
