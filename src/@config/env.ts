export default {
  authToken: process.env.REACT_APP_AUTH_TOKEN || '',
  backendUrl:
    process.env.REACT_APP_BACKEND_URL || 'http://localhost:9999/graphql',
};
