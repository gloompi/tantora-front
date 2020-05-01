export default {
  backendUrl: process.env.BACKEND_URL || 'http://localhost:9999/graphql',
  privateBackendUrl: process.env.BACKEND_PRIVATE_URL || 'http://localhost:9999/graphql/private',
};
