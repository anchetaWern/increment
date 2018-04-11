import React from 'react';
import { FlatList, TouchableHighlight, Text } from 'react-native';

import routines_data from '../data/routines';

import styles from '../lib/styles';

export default class Routines extends React.Component {

  static navigationOptions = ({navigation}) => ({
    headerTitle: 'Routines',
    headerStyle: {
      backgroundColor: '#333'
    },
    headerTitleStyle: {
      color: '#FFF'
    }
  });


	render() {
		return (
      <FlatList data={routines_data} renderItem={this.renderItem} />
		);
	}


  renderItem = ({item}) => {
    const { navigate } = this.props.navigation;
    return (
      <TouchableHighlight key={item.key} underlayColor="#ccc" onPress={() => {
        navigate('Exercises', {
          'key': item.key,
          'name': item.name
        });
      }} style={styles.list_item}>
        <Text key={item.key}>{item.name}</Text>
      </TouchableHighlight>
    );
  }

}