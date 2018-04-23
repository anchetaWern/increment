import React from 'react';
import { View, Text, TextInput, Picker, StyleSheet, Button, Alert } from 'react-native';
import store from 'react-native-simple-store';

import routines_data from '../data/routines';

import { renderPickerItems, uniqid } from '../lib/general';

export default class CreateExercise extends React.Component {

  static navigationOptions = {
    headerTitle: 'Create Exercise',
    headerStyle: {
      backgroundColor: '#333'
    },
    headerTitleStyle: {
      color: '#FFF'
    }
  };

  state = {
    name: '',
    routine: this.props.navigation.state.params.key,
    sets: '3',
    exercises: []
  };


  componentDidMount() {

    store.get('exercises')
      .then((response) => {
        if(response){
          this.setState({
            'exercises': response
          });
        }
      });

  }


  render() {
    return (
      <View style={styles.form_container}>
        <View style={styles.form_group}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.text_input}
            returnKeyType="done"
            placeholder="Front Squat"
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
          />
        </View>

        <View style={styles.form_group}>
          <Text style={[styles.label, styles.muscle_label]}>Muscle</Text>
          <Picker
            style={styles.picker}
            itemStyle={styles.picker_items}
            mode="dropdown"
            selectedValue={this.state.routine}
            onValueChange={(itemValue, itemIndex) => this.setState({routine: itemValue})}
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
            value={this.state.sets}
            onChangeText={(sets) => this.setState({sets})}
          />
        </View>

        <View style={styles.button_container}>
          <Button
            style={styles.button}
            title="Save"
            onPress={this.saveExercise}
          />
        </View>

      </View>
    );
  }


  saveExercise = () => {

    let id = uniqid();
    let new_exercise = {
      'id': id,
      'name': this.state.name,
      'routine': this.state.routine,
      'sets': this.state.sets
    };


    store.push('exercises', new_exercise);

    Alert.alert(
      'Saved',
      'The exercise was successfully saved!',
    );

    let exercises = [...this.state.exercises];
    exercises.push(new_exercise);

    this.setState({
      name: '',
      sets: '3',
      exercises: exercises
    });

    this.props.navigation.state.params.updateExercises(exercises);
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
  muscle_label: {
    marginTop: 100
  },
  text_input: {
    width: 200,
    height: 40,
    borderColor: '#bfbfbf',
    borderWidth: 1,
    padding: 10
  },
  picker: {
    width: 150
  },
  picker_items: {
    fontSize: 15
  },
  button_container: {
    marginTop: 30,
    padding: 10
  }
});