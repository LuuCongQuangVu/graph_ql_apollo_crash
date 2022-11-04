const express = require('express');
const { ApolloServer } = require('apollo-server-express');

// load schema and resolvers
const typeDefs = require('./schema/schema');
const resolvers = require('./resolver/resolver');

const PORT = process.env.PORT || 4000;

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({ typeDefs, resolvers });
  const app = express();
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  app.listen(PORT, () => {
    console.log(`Server is listening on port http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startApolloServer(typeDefs, resolvers);
