import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { MaterialIcons } from '@expo/vector-icons';

import RoutinesPage from './app/screens/Routines';
import LogsPage from './app/screens/Logs';
import ProgressPage from './app/screens/Progress';

import ExercisesPage from './app/screens/Exercises';
import CreateExercisePage from './app/screens/CreateExercise';
import LogWorkoutPage from './app/screens/LogWorkout';

const icons = {
  'Logs': 'event-note',
  'Routines': 'edit',
  'Progress': 'camera-alt'
};

const LogStack = StackNavigator(
  {
    Logs: {
      screen: LogsPage
    },
    LogWorkout: {
      screen: LogWorkoutPage
    }
  },
  {
    initialRouteName: 'Logs',
  }
);

const RoutinesStack = StackNavigator(
  {
    Routines: {
      screen: RoutinesPage
    },
    Exercises: {
      screen: ExercisesPage
    },
    CreateExercise: {
      screen: CreateExercisePage
    }
  },
  {
    initialRouteName: 'Routines'
  }
);

const ProgressStack = StackNavigator(
  {
    Progress: {
      screen: ProgressPage
    }
  },
  {
    initialRouteName: 'Progress',
  }
);


export default TabNavigator(
  {
    Logs: {
      screen: LogStack
    },
    Routines: {
      screen: RoutinesStack
    },
    Progress: {
      screen: ProgressStack
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName = icons[routeName];
        let color = (focused) ? '#fff' : '#929292';

        return <MaterialIcons name={iconName} size={35} color={color} />;
      },
    }),
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      style: {
        backgroundColor: '#333'
      }
    }
  },
  {
    initialRouteName: 'Routines'
  }
);