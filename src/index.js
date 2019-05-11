"use strict";

// Change this to "import Hapi from "hapi""
const Hapi = require("hapi");

const { graphqlHapi, graphiqlHapi } = require("apollo-server-hapi");

const schema = require("./graphql/schema");

// Create a server with a host and port
const server = Hapi.server({
  port: 5000
});

// Start the server
const start = async function() {
  try {
    await server.register({
      plugin: graphiqlHapi,
      options: {
<<<<<<< HEAD
        path: '/ordenesi',
        graphiqlOptions: {
          endpointURL: '/ordenes'
=======
        path: "/ordersiql",
        graphiqlOptions: {
          endpointURL: "/orders"
>>>>>>> ee67c2826e8d47a1fede5c72a8a815e32d58d8eb
        },
        route: {
          cors: true
        }
      }
    });

    await server.register({
      plugin: graphqlHapi,
      options: {
        path: "/orders",
        graphqlOptions: { schema },
        route: { cors: true }
      }
    });

    console.log("Starting server...");
    await server.start();
  } catch (err) {
    await connection.end();
    console.log(err);
    process.exit(1);
  }

  console.log("Server running at: ", server.info.uri);
};

start();
