import React from 'react';
import { View, FlatList } from 'react-native';
import styles from './styles';

const List = (props) => {

  if(props.data.length > 1){
    return (
      <View style={styles.list}>
        <FlatList
          key={props.data.length}
          listKey={props.listKey}
          numColumns={props.data.length}
          columnWrapperStyle={styles.wrapper}
          data={props.data}
          renderItem={props.renderItem}
        />
      </View>
    );
  }

  return (
    <View style={styles.list}>
      <FlatList
        key={props.data.length}
        numColumns={props.data.length}
        data={props.data}
        renderItem={props.renderItem}
      />
    </View>
  );

}

export default List;