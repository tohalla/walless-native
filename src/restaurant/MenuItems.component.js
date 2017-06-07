import React from 'react';
import {compose} from 'react-apollo';
import {connect} from 'react-redux';
import {View, Text, ListView} from 'react-native';
import {hasIn, isEqual} from 'lodash/fp';

import {
	getMenuItemsByRestaurant
} from '../graphql/restaurant/restaurant.queries';

const mapStateToProps = state => ({
	restaurant: hasIn(['active', 'restaurant'])(state) ?
		state.active.restaurant : null
});

class MenuItems extends React.Component {
	static navigationOptions = {
		title: 'Menus'
	};
	static PropTypes = {
		restaurant: React.PropTypes.object.isRequired,
		menu: React.PropTypes.object
	};
	constructor(props) {
		super(props);
		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (r1, r2) => !isEqual(r1)(r2)
			})
		};
	};
	componentWillReceiveProps(newProps) {
		if (!isEqual(this.props.getMenuItemsByRestaurant)(newProps.getMenuItemsByRestaurant)) {
			this.setState({
				dataSource: Array.isArray(newProps.getMenuItemsByRestaurant.menuItems) ?
					this.state.dataSource.cloneWithRows(
						typeof this.props.menu === 'object' ? this.props.menu.menuItems :
							newProps.getMenuItemsByRestaurant.menuItems
					) :
					this.state.dataSource.cloneWithRows([])
			});
		}
	};
	render() {
		const {dataSource} = this.state;
		return (
			<View style={{
				height: '100%'
			}}>
				<ListView
						dataSource={dataSource}
						renderRow={item => (
							<View style={{
								backgroundColor: 'white',
								borderBottomWidth: 1,
								borderColor: 'lightgray'
							}}>
								<Text>{item.name}</Text>
								<Text>{item.description}</Text>
							</View>
						)}
				/>
			</View>
		);
	}
}

export default compose(
	connect(mapStateToProps),
	getMenuItemsByRestaurant
)(MenuItems);