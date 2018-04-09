import React from 'react';
import { View, Text, TouchableHighlight, Image, StyleSheet } from 'react-native';

import IconButton from '../components/IconButton';
import List from '../components/List';

import progress_data from '../data/progress';

export default class Progress extends React.Component {

  static navigationOptions = {
    headerTitle: 'Progress',
    headerRight: (
      <IconButton size={25} color="#FFF" />
    ),
    headerStyle: {
      backgroundColor: '#333'
    },
    headerTitleStyle: {
      color: '#FFF'
    }
  };

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
  body: {
    flex: 1
  },
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