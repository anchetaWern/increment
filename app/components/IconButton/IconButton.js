import React from 'react';
import { TouchableHighlight } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles';

const IconButton = (props) => {

  let icon_name = props.icon ? props.icon : 'add';
  let color = props.color ? props.color : '#eee';
  let icon_size = props.size ? props.size : 35;

  return (
    <TouchableHighlight style={styles.icon_button} underlayColor="#ccc" onPress={() => {
      console.log('pressed!');
    }}>
      <MaterialIcons name={icon_name} size={icon_size} color={color} />
    </TouchableHighlight>
  );

}

export default IconButton;