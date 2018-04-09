import React from 'react';
import styles from './styles';

import { View } from 'react-native';
import IconButton from '../../components/IconButton';

const Tabs = (props) => {

  return (
    <View style={styles.tabs_container}>
      <IconButton icon="event-note" onPress={() => { props.go('Routines'); }} />
      <IconButton icon="edit" onPress={() => { props.go('Logs'); }} />
      <IconButton icon="camera-alt" onPress={() => { props.go('Progress'); }} />
    </View>
  );

}

export default Tabs;