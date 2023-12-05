import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"

const typeDefs = `
    type Social_Medias {
        email: String
        facebook: String
        instagram: String
        linkedin: String
    }

    type User {
        _id: ID
        nome: String
        idade: Int
        altura: Float
        cadastro: Boolean
        social_medias: [Social_Medias]
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
                    cadastro: () => true,
                    social_medias: () => [
                        {
                            email: () => "islan_gomes@hotmail.com",
                            facebook: () => "Lanm Gomes",
                            instagram: () => "lanmgomez",
                            linkedin: () => "Islan Gomes"
                        }
                    ]
                }
            ]
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers })

const { url } = await startStandaloneServer(server)

console.log(`🚀 Server ready at ${url}`)

