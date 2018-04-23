import React from 'react';
import { View, Text, ScrollView, FlatList, Modal, Picker, TextInput, Button, StyleSheet } from 'react-native';

import List from '../components/List';

import IconButton from '../components/IconButton';
import SetContainer from '../components/SetContainer';
import workouts_data from '../data/workouts';
import routines_data from '../data/routines';

import { renderPickerItems } from '../lib/general';

export default class LogWorkout extends React.Component {

  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          visible={false}
          onRequestClose={() => {
            console.log('request close');
          }}>
            <View style={styles.modal_header}>
              <Text style={styles.modal_header_text}>Add Exercise</Text>
              <IconButton icon="close" color="#FFF" size={18} />
            </View>
            <View style={styles.modal_body}>
              <Picker
                style={styles.picker}>
                {renderPickerItems(routines_data)}
              </Picker>

              <View style={styles.button_container}>
                <Button
                  style={styles.button}
                  title="Add"
                  onPress={() => {
                    console.log('pressed!');
                  }}
                />
              </View>

            </View>
        </Modal>

        <Modal
          animationType="slide"
          visible={false}
          onRequestClose={() => {
            console.log('request close');
          }}>
          <View style={styles.modal_header}>
            <Text style={styles.modal_header_text}>Add Set</Text>
            <IconButton icon="close" color="#FFF" size={18} />
          </View>

          <View style={styles.modal_body}>
            <TextInput
              style={styles.text_input}
              returnKeyType="done"
              keyboardType="numeric"
              placeholder="Weight (e.g. 100)"
            />

            <View style={styles.button_container}>
              <Button
                style={styles.button}
                title="Add"
                onPress={() => {
                  console.log('pressed!');
                }}
              />
            </View>
          </View>
        </Modal>

        <FlatList data={workouts_data} renderItem={this.renderItem} />
      </View>
    );
  }


  renderItem({item}) {
    return (
      <View key={item.key}>
        <View style={styles.list_item_header}>
          <Text style={styles.list_item_header_text}>{item.name}</Text>
          <IconButton icon="add" size={20} color="#333" />
        </View>
        <ScrollView horizontal={true} contentContainerStyle={styles.content_container}>
          <List data={item.sets} renderItem={({ item }) => {
            return (
              <SetContainer key={item.key} weight={item.weight} reps={item.reps} />
            );
          }} />
        </ScrollView>
      </View>
    );
  }

}


const styles = StyleSheet.create({
  list_item_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f3f3'
  },
  list_item_header_text: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 10
  },
  content_container: {
    borderBottomWidth: 1,
    borderBottomColor: '#f3f3f3',
    marginBottom: 10
  },
  modal_header: {
    marginTop: 20,
    padding: 20,
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#3e3e3e'
  },
  modal_header_text: {
    fontWeight: 'bold',
    color: '#FFF'
  },
  modal_body: {
    padding: 20
  },
  picker: {
    marginTop: -40
  },
  text_input: {
    height: 40,
    borderColor: '#bfbfbf',
    borderWidth: 1,
    padding: 10
  },
  button_container: {
    marginTop: 30
  }
});
