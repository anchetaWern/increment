import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import styles from './styles';

const SetContainer = (props) => {

  return (
    <TouchableHighlight style={styles.set_container} onPress={props.onPress} underlayColor="#eee">
      <View style={styles.set_body}>
        <View style={styles.weight}>
          <Text style={styles.weight_text}>{props.weight}</Text>
        </View>
        <View style={styles.reps}>
          <Text style={styles.reps_text}>{props.reps}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

export default SetContainer;