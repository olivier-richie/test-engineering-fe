import {gql} from 'apollo-angular'

const GET_TODOS = gql`
  query {
    todos {
      id
      name
      height
    }
  }

`

const GET_PEOPLE = gql`
  query {
    todos
        {
          id
          name
          height
          mass
          gender
          homeWorld
      }
  }

`

const GET_ONE_PERSON = gql`
  query todo($id: Int!){
    todo(id:$id) {
      id
      name
      height
      mass
      gender
      homeWorld

    }
  }
`

const ADD_TODO = gql`
  mutation addTodo($name: String!, $description: String!) {
    addTodo(name: $name, description: $description) {
      id
      name
      description
    }
  }
`

const DELETE_TODO = gql`
  mutation deleteTodo($id: Int!) {
    deleteTodo(id: $id) {
      id
    }
  }
  `

export { GET_TODOS, ADD_TODO, DELETE_TODO, GET_PEOPLE, GET_ONE_PERSON }
