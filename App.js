import React from 'react';
import { StyleSheet, View } from 'react-native';



import IconButton from './app/components/IconButton';
import Screen from './app/components/Screen';

import RoutinesPage from './app/screens/Routines';
import ExercisesPage from './app/screens/Exercises';
import CreateExercisePage from './app/screens/CreateExercise';

import LogsPage from './app/screens/Logs';
import LogWorkoutPage from './app/screens/LogWorkout';
import ProgressPage from './app/screens/Progress';

import Root from './Root';

const pages = {
  routines: {
    title: 'Routines',
    component: <RoutinesPage />,
    has_header_button: false
  },
  exercises: {
    title: 'Exercises',
    component: <ExercisesPage />,
    has_header_button: true
  },
  create_exercise: {
    title: 'Create Exercise',
    component: <CreateExercisePage />,
    has_header_button: false
  },
  logs: {
    title: 'Logs',
    component: <LogsPage />,
    has_header_button: true
  },
  log_workout: {
    title: 'Log Workout',
    component: <LogWorkoutPage />,
    has_header_button: true
  },
  progress: {
    title: 'Progress',
    component: <ProgressPage />,
    has_header_button: true
  }
};

var current_page = pages.routines;

export default class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Root />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  tabs_container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#3e3e3e'
  }
});
