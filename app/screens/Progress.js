import React from 'react';
import { View, Text, TouchableHighlight, Image, StyleSheet } from 'react-native';

import List from '../components/List';

import progress_data from '../data/progress';

export default class Progress extends React.Component {

  render() {
    return (
      <List data={progress_data} renderItem={this.renderItem} />
    );
  }


  renderItem({ item }) {
    return (
      <TouchableHighlight key={item.key} style={styles.list_item} underlayColor="#ccc" onPress={() => {
        console.log('pressed');
      }}>
        <View style={styles.image_container}>
          <Image
            source={item.url}
            style={styles.image}
            ImageResizeMode={"contain"} />
          <Text style={styles.image_text}>{item.date}</Text>
        </View>
      </TouchableHighlight>
    );
  }

}

const styles = StyleSheet.create({
  list_item: {
    padding: 20
  },
  image_container: {
    alignItems: 'center'
  },
  image: {
    width: 150,
    height: 150,
  },
  image_text: {
    fontWeight: 'bold'
  }
});