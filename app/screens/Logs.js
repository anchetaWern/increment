import React from 'react';
import { View, Text, TouchableHighlight, FlatList, StyleSheet } from 'react-native';

import list_styles from '../components/List/styles';

import logs_data from '../data/logs';

export default class Logs extends React.Component {

  render() {
    return (
      <FlatList data={logs_data} renderItem={this.renderItem} />
    );
  }


  renderItem({item}) {
    return (
      <TouchableHighlight underlayColor="#ccc" onPress={() => {
        console.log('pressed!');
      }}>
        <View style={list_styles.list_item} key={item.key}>
          <View style={styles.date_container}>
            <Text style={styles.date_month}>{item.month}</Text>
            <Text style={styles.date_day}>{item.day}</Text>
          </View>

          <View style={styles.exercises}>
            <Text style={styles.exercises_text}>{item.exercises}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

}


const styles = StyleSheet.create({
  date_container: {
    flex: 2
  },
  date_month: {
    fontSize: 12
  },
  date_day: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  exercises: {
    flex: 8
  },
  exercises_text: {
    color: '#696969'
  }
});