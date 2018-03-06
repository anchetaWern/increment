import React from 'react';
import { View } from 'react-native';
import Header from '../Header';
import IconButton from '../IconButton';
import styles from './styles';

const Screen = (props) => {

  return (
    <View style={styles.screen}>
      <Header text={props.title}>
        <IconButton icon={props.icon} size={25} is_header={props.has_header_button} />
      </Header>
      <View style={styles.body}>
        {props.page}
      </View>
    </View>
  );

}

export default Screen;