// @flow
import React from 'react';
import I18n from 'react-native-i18n';
import {ApolloProvider} from 'react-apollo';

import MainNavigator from './navigation/MainNavigator.component';
import translations from './translations';
import apolloClient from './apolloClient';
import store from './store';

export default class App extends React.Component {
  render() {
    return (
			<ApolloProvider client={apolloClient} store={store}>
				<MainNavigator />
			</ApolloProvider>
    );
  }
}

Object.assign(
	I18n,
	{fallbacks: true, translations}
);
