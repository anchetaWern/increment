import React from 'react';
import { View, Text, TextInput, Picker, StyleSheet, Button } from 'react-native';

import routines_data from '../data/routines';

import { renderPickerItems } from '../lib/general';

export default class CreateExercise extends React.Component {

  render() {
    return (
      <View style={styles.form_container}>
        <View style={styles.form_group}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.text_input}
            returnKeyType="done"
            placeholder="Front Squat"
          />
        </View>

        <View style={styles.form_group}>
          <Text style={styles.label}>Muscle</Text>
          <Picker
            style={styles.picker}
            itemStyle={styles.picker_items}
            mode="dropdown"
            >
            {renderPickerItems(routines_data)}
          </Picker>
        </View>

        <View style={styles.form_group}>
          <Text style={styles.label}>Sets</Text>
          <TextInput
            style={styles.text_input}
            returnKeyType="done"
            keyboardType="numeric"
            placeholder="20"
          />
        </View>

        <View style={styles.button_container}>
          <Button
            style={styles.button}
            title="Save"
            onPress={() => {
              console.log('pressed!');
            }}
          />
        </View>
      </View>
    );
  }

}


const styles = StyleSheet.create({
  form_container: {
    padding: 20
  },
  form_group: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  label: {
    marginTop: 20
  },
  text_input: {
    width: 200,
    height: 40,
    borderColor: '#bfbfbf',
    borderWidth: 1,
    padding: 10
  },
  picker: {
    width: 150,
    marginTop: -70
  },
  picker_items: {
    fontSize: 15
  },
  button_container: {
    marginTop: 30
  }
});
