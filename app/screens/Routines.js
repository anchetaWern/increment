import React from 'react';
import { FlatList } from 'react-native';

import routines_data from '../data/routines';

import { renderItem } from '../lib/general';

export default class Routines extends React.Component {

	render() {
		return (
			<FlatList data={routines_data} renderItem={renderItem} />
		);
	}

}