import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"

const typeDefs = `
    type User {
        _id: ID!
        name: String!
        email: String!
        active: Boolean!
    }

    type Post {
        _id: ID!
        title: String!
        content: String!
        author: User!
    }

    type Query {
        users: [User!]!
        getUserByEmail(email: String!): User!
    }

    type Mutation {
        createUser(name: String!, email: String!): User!
    }
`
const users = [
    { _id: String(Math.random()), name: "Islan", email: "islan@hotmail.com", active: true},
    { _id: String(Math.random()), name: "Vinicius", email: "vini@hotmail.com", active: true},
    { _id: String(Math.random()), name: "Marcio", email: "marcio@hotmail.com", active: false},
]

const resolvers = {
    // Toda Query eh equivalente ao metodo GET
    Query: {
        hello: () => "Hello, world!",
        users: () => users,
        getUserByEmail: (_, args) => {
            return users.find((user) => user.email === args.email)
        }
    },
    Mutation: {
        createUser: (_, args) => {
            const newUser = {
                _id: String(Math.random()),
                name: args.name,
                email: args.email,
                active: true
            }

            users.push(newUser)
            return newUser
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers })

const { url } = await startStandaloneServer(server)

console.log(`🚀 Server ready at ${url}`)