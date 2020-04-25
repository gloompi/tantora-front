import React, { useEffect, useState } from 'react';
import ApolloClient, { gql } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';


const client = new ApolloClient({
  uri: 'http://localhost:9999/graphql',
});

function App() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await client.query({
        query: gql`
          {
            users {
              userId
              userName
            }
          }
        `
      });

      setData(response.data);
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ApolloProvider client={client}>
      <div className="App">
        {/* {data.users} */}
      </div>
    </ApolloProvider>
  );
}

export default App;
