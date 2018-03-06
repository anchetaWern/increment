import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  list: {
    flex: 1
  },
  list_item: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#f3f3f3'
  },
  list_item_header: {
    padding: 10,
    fontSize: 17,
    fontWeight: 'bold'
  }
});