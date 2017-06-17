import {AsyncStorage} from 'react-native';
import ApolloClient, {createNetworkInterface} from 'apollo-client';

import authenticationHandler from 'walless/util/auth';
import config from 'walless-native/config';

const networkInterface = createNetworkInterface({
  uri: `${config.api.protocol}://${config.api.url}:${config.api.port}/${config.api.graphQL.endpoint}`
});

const dataIdFromObject = result =>
  result.nodeId;

const apolloClient = new ApolloClient({
  networkInterface,
  shouldBatch: true,
  dataIdFromObject,
  queryDeduplication: true
});

networkInterface.
  use([{
    async applyMiddleware(req, next) {
      const [[, token], [, clientId], [, expiration], [, refreshToken]] =
        await AsyncStorage.multiGet([
          'authorization',
          'client-id',
          'expiration',
          'refresh-token'
        ]);
      let auth = token;
      if (Number(expiration) < Date.now() / 1000 || !expiration) {
        await AsyncStorage.multiRemove(['expiration', 'authorization']);
        if (refreshToken && clientId) {
          await authenticationHandler.authenticate();
          auth = await AsyncStorage.getItem('authorization');
        }
      }
      if (!req.options.headers) {
        req.options.headers = {};
      }
      req.options.headers['Client-Id'] = clientId || await authenticationHandler.fetchClientId();
      if (auth) {
        req.options.headers.Authorization = `Bearer ${auth}`;
      }
      next();
    }
  }])
  .useAfter([{
    async applyAfterware({response}, next) {
      if (response.status === 401) {
        const [[, refreshToken], [, clientId]] =
          await AsyncStorage.multiGet(['refresh-token', 'client-id']);
        if (refreshToken && clientId) {
          await authenticationHandler.authenticate();
          apolloClient.resetStore();
        }
      }
      next();
    }
  }]);


export default apolloClient;
