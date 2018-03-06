import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const Header = (props) => {

  return (
    <View style={styles.header}>
      <Text style={styles.header_text}>{props.text}</Text>
      { props.children }
    </View>
  );

}

export default Header;