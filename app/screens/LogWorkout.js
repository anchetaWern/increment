import React from 'react';
import { View, Text, ScrollView, FlatList, Modal, Picker, TextInput, Button, StyleSheet, Alert } from 'react-native';
import store from 'react-native-simple-store';

import List from '../components/List';

import IconButton from '../components/IconButton';
import SetContainer from '../components/SetContainer';
import AlertBox from '../components/AlertBox';

import { renderPickerItems, uniqid } from '../lib/general';

export default class LogWorkout extends React.Component {

  static navigationOptions = ({navigation}) => {
    const { params } = navigation.state;

    return {
      headerTitle: `Log Workout`,
      headerRight: (
        <IconButton size={25} color="#FFF" onPress={() => params.showAddExerciseModal() } />
      ),
      headerStyle: {
        backgroundColor: '#333'
      },
      headerTitleStyle: {
        color: '#FFF'
      }
    };

  };

  state = {
    add_exercise_visible: false,
    add_set_visible: false,
    workouts_data: [],
    exercises_data: [],
    sets_data: [],
    selected_exercise: '',
    weight: '',
    current_set_exercise: ''
  };


  componentDidMount() {

    let date = this.props.navigation.state.params.date;

    let keys = ['exercises', date + '_exercises', date + '_sets'];

    store.get(keys)
      .then((response) => {

        let exercises_data = (response[0]) ? response[0] : [];
        let selected_exercise = (response[0]) ? response[0][0].id : '';
        let workouts_data = (response[1]) ? response[1] : [];
        let sets_data = (response[2]) ? response[2] : [];

        this.setState({
          exercises_data,
          selected_exercise,
          workouts_data,
          sets_data
        });

      });


    this.props.navigation.setParams({
      showAddExerciseModal: this.showAddExerciseModal
    });
  }


  showAddExerciseModal = () => {
    this.setState({
      add_exercise_visible: true
    });
  }


  addExercise = () => {
    let id = uniqid();
    let date = this.props.navigation.state.params.date;

    let exercises_data = this.state.exercises_data;
    let exercise = exercises_data.find((item) => {
      return item.id == this.state.selected_exercise;
    });

    let new_exercise = {
      'key': id,
      'exercise_id': this.state.selected_exercise,
      'exercise_name': exercise.name,
      'exercise_sets': exercise.sets
    };

    let workouts_data = [...this.state.workouts_data];
    workouts_data.push(new_exercise);

    store.push(date + '_exercises', new_exercise);

    this.setState({
      workouts_data: workouts_data
    });

    Alert.alert(
      'Saved',
      'The exercise was successfully added!',
    );

  }


  addSet = () => {
    let id = uniqid();
    let date = this.props.navigation.state.params.date;
    let weight = this.state.weight;

    let sets_data = this.state.sets_data;
    let new_set = {
      'key': id,
      'weight': weight,
      'exercise_id': this.state.current_set_exercise,
      'reps': 5
    };

    store.push(date + '_sets', new_set);

    this.setState({
      add_set_visible: false,
      sets_data: [...sets_data, new_set]
    });
  }


  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          visible={this.state.add_exercise_visible}
          onRequestClose={() => {
            this.setState({
              add_exercise_visible: false
            });
          }}>
            <View style={styles.modal_header}>
              <Text style={styles.modal_header_text}>Add Exercise</Text>
              <IconButton icon="close" color="#FFF" size={18} onPress={() => {
                this.setState({
                  add_exercise_visible: false
                });
              }} />
            </View>
            <View style={styles.modal_body}>
              <Picker
                style={styles.picker}
                selectedValue={this.state.selected_exercise}
                onValueChange={(itemValue, itemIndex) => this.setState({selected_exercise: itemValue}) }
                >
                {renderPickerItems(this.state.exercises_data)}
              </Picker>

              <View style={styles.button_container}>
                <Button
                  style={styles.button}
                  title="Add"
                  onPress={this.addExercise}
                />
              </View>

            </View>
        </Modal>

        <Modal
          animationType="slide"
          visible={this.state.add_set_visible}
          onRequestClose={() => {
            this.setState({
              add_set_visible: false
            });
          }}>
          <View style={styles.modal_header}>
            <Text style={styles.modal_header_text}>Add Set</Text>
            <IconButton icon="close" color="#FFF" size={18} onPress={() => {
              this.setState({
                add_set_visible: false
              });
            }} />
          </View>

          <View style={styles.modal_body}>
            <TextInput
              style={styles.text_input}
              returnKeyType="done"
              keyboardType="numeric"
              placeholder="Weight (e.g. 100)"
              onChangeText={(weight) => this.setState({weight})}
              value={this.state.weight}
            />

            <View style={styles.button_container}>
              <Button
                style={styles.button}
                title="Add"
                onPress={this.addSet}
              />
            </View>
          </View>
        </Modal>

        <FlatList data={this.state.workouts_data} extraData={this.state} renderItem={this.renderItem} />
        {
          this.state.workouts_data.length == 0 &&
          <AlertBox type="info" text="No workouts for this session yet." />
        }
      </View>
    );
  }


  showAddSetModal(exercise_id) {
    this.setState({
      current_set_exercise: exercise_id,
      add_set_visible: true
    });
  }


  renderItem = ({item}) => {
    return (
      <View key={item.key} listKey={item.key}>
        <View style={styles.list_item_header}>
          <Text style={styles.list_item_header_text}>{item.exercise_name} ({item.exercise_sets})</Text>
          <IconButton icon="add" size={20} color="#333" onPress={() => this.showAddSetModal(item.exercise_id)} />
        </View>
        {this.renderSets(item.exercise_id, item.key)}
      </View>
    );
  }


  renderSets(exercise_id, key) {

    let l_key = exercise_id + ":" + key + ":" + uniqid();

    let sets_data = this.state.sets_data;
    let sets = sets_data.filter((item) => {
      return item.exercise_id == exercise_id;
    });

    if(sets.length){
      return (
        <ScrollView horizontal={true} contentContainerStyle={styles.content_container}>
          <List data={sets} listKey={l_key} renderItem={({ item }) => {
            return (
              <SetContainer key={item.key} weight={item.weight} reps={item.reps} onPress={() => this.incrementSet(item)} />
            );
          }} />
        </ScrollView>
      );
    }
  }


  incrementSet = (item) => {

    let sets_data = [...this.state.sets_data];
    let index = sets_data.findIndex((itm) => {
      return itm.key == item.key;
    });

    let reps = item.reps;
    sets_data[index] = {...sets_data[index], 'reps': reps + 1};

    this.setState({
      sets_data: sets_data
    });

    let date = this.props.navigation.state.params.date;
    store.save(date + '_sets', sets_data);
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
  text_input: {
    height: 40,
    borderColor: '#bfbfbf',
    borderWidth: 1,
    padding: 10
  },
  button_container: {
    marginTop: 30,
    padding: 10
  }
});