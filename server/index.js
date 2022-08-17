const express = require('express');
const cors = require('cors');
const { graphqlHTTP }= require('express-graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLList,
    GraphQLBoolean
  } = require('graphql')


const People = [
    { id: 1, name: 'Cook Meals', height: '10', mass: '50', gender: 'male', homeWorld: 'South Africa'},
    { id: 2,  name: 'Olivier ', height: '30', mass: '30', gender: 'female', homeWorld: 'America'},
    { id: 3,  name: 'Richie ', height: '20', mass: '63', gender: 'male', homeWorld: 'Japon'},
    { id: 3,  name: 'David B', height: '12', mass: '44', gender: 'female', homeWorld: 'Malta'},
]

const PeopleType = new GraphQLObjectType({
    name: 'Todo',
    description: 'This is a todo',
    fields: () => ({
      id: { type: new GraphQLNonNull(GraphQLInt) },
      name: { type: new GraphQLNonNull(GraphQLString) },
      height: { type: new GraphQLNonNull(GraphQLString) },
      mass: { type: new GraphQLNonNull(GraphQLString) },
      gender: { type: new GraphQLNonNull(GraphQLString) },
      homeWorld: { type: new GraphQLNonNull(GraphQLString) },
    })
  })


const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
      todos: {
        type: new GraphQLList(PeopleType),
        description: 'List of All People',
        resolve: () => People
      },
      todo:{
        type: PeopleType,
        description: 'Single person',
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLInt)
            },
        },
        resolve: (root, args) => {
            return People.find(todo => todo.id === args.id)
        }
      }
    })
  })

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
      addTodo: {
        type: PeopleType,
        description: 'Add a new person',
        args: {
            name: {
                type: new GraphQLNonNull(GraphQLString)
            },
            description: {
                type: new GraphQLNonNull(GraphQLString)
            },
        },
        resolve: (root, args) => {
            const newTodo = {
                id: People.length + 1,
                name: args.name,
                description: args.description,
            }
            People.push(newTodo)
            return newTodo
      }},
      deleteTodo: {
        type: PeopleType,
        description: 'Delete a person',
        args: {
            id: {
                type: new GraphQLNonNull(GraphQLInt)
            },
        },
        resolve: (root, args) => {
            const todo = People.find(todo => todo.id === args.id)
            if(todo){
                People.splice(People.indexOf(todo), 1)
                return todo
            }
            return null
        }
      },
})})

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
  })

const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

app.listen(8000);

console.log('Running a GraphQL API server at localhost:4000/graphql');