import express from "express";
import cors from "cors";
import { buildSchema } from "graphql";
import { graphqlHTTP } from "express-graphql";

const schema = buildSchema(`
    type Product {
    id: Int
    title: String
    price: Float
    description: String
    category: String
    image: String
  }

  type Query {
    products: [Product]
  }`);

const root = {
  products: async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      return await response.json();
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  },
};

const app = express();
app.use(cors());
app.use("/graphql", graphqlHTTP({ schema, rootValue: root, graphiql: true }));

app.listen(4000, () =>
  console.log("Server started at http://localhost:4000/graphql")
);
