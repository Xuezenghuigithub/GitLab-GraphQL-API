import gql from 'graphql-tag' //引入graphql
const queriesAPI = Object.create(null);

queriesAPI.project = gql`
  query project($fullPath: ID!){
  project(fullPath: $fullPath){
    id,
    issues{
      nodes{
        title
        author{
          name
        }
        createdAt
        labels{
          nodes{
            title,
            color
          }
        }
      }
    }
  }
}
`

export default queriesAPI;