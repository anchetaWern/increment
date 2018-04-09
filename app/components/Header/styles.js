import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  header: {
    //flex: 1, // remove
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingTop: 10,
    backgroundColor: '#3e3e3e'
  },
  header_text: {
    fontWeight: 'bold',
    color: '#FFF',
    fontSize: 17,
    textAlign: 'center',
    padding: 10
  }
});