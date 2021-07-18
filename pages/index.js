import { useState, useEffect } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import config from "../aws-exports";

export const listCustomers = `
  query ListCustomers {
    listCustomers{
    items {
      id
      name
    }
  }
  }
`;

Amplify.configure(config);

const Blog = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const customers = await API.graphql(graphqlOperation(listCustomers));
      console.log(customers);
      setData(customers);
    };
    fetchData();
  }, []);
  
  return (
    <>
      <div>Customers...</div>
      <ul>
        {data &&
          data.data.listCustomers.items.map((item) => (
            <li key={item.id}>
              {item.name}
            </li>
          ))}
      </ul>
    </>
  );
};

export default Blog;
