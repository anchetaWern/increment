import React from 'react';
import { View, FlatList } from 'react-native';
import styles from './styles';

const List = (props) => {

  return (
    <View style={styles.list}>
      <FlatList
        numColumns={props.data.length}
        columnWrapperStyle={styles.wrapper}
        data={props.data}
        renderItem={props.renderItem}
      />
    </View>
  );


}

export default List;