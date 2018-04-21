import React from 'react';
import { TouchableHighlight, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles';

const IconButton = (props) => {

  let icon_name = props.icon ? props.icon : 'add';
  let color = props.color ? props.color : '#eee';
  let icon_size = props.size ? props.size : 35;

  if(props.is_transparent){
    return (
      <TouchableOpacity style={[styles.transparent_icon_button, props.styles]} onPress={props.onPress}>
        <MaterialIcons name={icon_name} size={icon_size} color={color} />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableHighlight style={styles.icon_button} underlayColor="#ccc" onPress={props.onPress}>
      <MaterialIcons name={icon_name} size={icon_size} color={color} />
    </TouchableHighlight>
  );

}

export default IconButton;