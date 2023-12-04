import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"

const typeDefs = `
    type User {
        _id: ID
        nome: String
        idade: Int
        altura: Float
        cadastro: Boolean
    }

    type Query {
        hello: String
        user: [User]
    }
`

const resolvers = {
    Query: {
        hello: () => "Hello, world!",
        user: () => {
            return [
                {
                    _id: () => 1,
                    nome: () => "Islan",
                    idade: () => 26,
                    altura: () => 1.72,
                    cadastro: () => true
                }
            ]
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers })

const { url } = await startStandaloneServer(server)

console.log(`🚀 Server ready at ${url}`)

