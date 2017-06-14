import React from 'react';
import I18n from 'react-native-i18n';
import {ApolloProvider} from 'react-apollo';
import App from 'walless/App';

import translations from 'walless/translations';
import apolloClient from 'walless/apolloClient';
import store from 'walless/store';

export default class Root extends React.Component {
  render = () => (
    <ApolloProvider client={apolloClient} store={store}>
      <App />
    </ApolloProvider>
  )
}

Object.assign(
  I18n,
  {fallbacks: true, translations}
);
