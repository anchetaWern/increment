import React from 'react';
import { View, Text, FlatList } from 'react-native';

import list_styles from '../components/List/styles';

import exercises_data from '../data/exercises';

import { renderItem } from '../lib/general';

export default class Exercises extends React.Component {

  render() {
    return (
      <View>
        <Text style={list_styles.list_item_header}>Legs</Text>
        <FlatList data={exercises_data} renderItem={renderItem} />
      </View>
    );
  }

}