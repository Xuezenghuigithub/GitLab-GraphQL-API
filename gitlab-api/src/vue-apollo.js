import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import VueApollo from 'vue-apollo';
import Vue from 'vue'

Vue.use(VueApollo)

// 获取 GitLab API Token
const apolloToken = window.localStorage.getItem('apollo-token');

// 连接 GraphQL 服务
const httpLink = createHttpLink({
  uri: 'https://git.belstar.com.cn/api/graphql',
  headers: {
    Authorization: `Bearer ${apolloToken}`
  }
})

// 实现缓存
const cache = new InMemoryCache();

// 错误捕捉及处理
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log('GraphQL 类型的错误')
    );
  if (networkError) console.log('网络类型的错误');
});

// const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
//   if (graphQLErrors) {
//     for(let err of graphQLErrors) {
//       switch(err.extensions.code) {
//         case 'UNAUTHENTICATED':
//           // 此错误码意为验证失败，需要在此做重新获取 Token 的处理
//           console.log('验证失败');
//           const oldHeaders = operation.getContext().headers;
//           operation.setContext({
//             headers: {
//               ...oldHeaders,
//               authorization: getNewToken()
//             }
//           });
//           // 重新尝试刚才错误的请求
//           return forward(operation);
//         default: 
//           console.log('GraphQL 类型的错误')
//       }
//     }
//   }
//   if (networkError) console.log('网络类型的错误');
// });

// 创建 Apollo 客户端
const apolloClient = new ApolloClient({
  link: errorLink.concat(httpLink),
  cache,
})

// 创建用于挂载到所有组件中的 Apollo 客户端实例
const apolloProvider = new VueApollo ({
  defaultClient: apolloClient,
})

export default apolloProvider;