import React from 'react';
import { View, Text, TouchableHighlight, FlatList, StyleSheet } from 'react-native';
import store from 'react-native-simple-store';

import IconButton from '../components/IconButton';
import AlertBox from '../components/AlertBox';

import list_styles from '../components/List/styles';

import { getDate, lastWeeksDates, uniqid, getShortMonth } from '../lib/general';

export default class Logs extends React.Component {

  static navigationOptions = ({navigation}) => ({
    headerTitle: 'Logs',
    headerRight: (
      <IconButton size={25} color="#FFF" onPress={() => {
        navigation.navigate('LogWorkout', {
          date: getDate()
        });
      }} />
    ),
    headerStyle: {
      backgroundColor: '#333'
    },
    headerTitleStyle: {
      color: '#FFF'
    }
  });

  state = {
    logs_data: []
  };


  componentDidMount() {
    let dates = lastWeeksDates();

    let keys = dates.map((date) => {
      return date + '_exercises';
    });

    let logs_data = [];

    store.get(keys)
      .then((response) => {

        response.forEach((workout_session, index) => {
          let date = dates[index];

          if(workout_session){
            let exercises = [];
            workout_session.forEach((item) => {
              exercises.push(item.exercise_name);
            });

            let d = new Date(date);

            let month = getShortMonth(d.getMonth());
            let day = d.getDate();

            logs_data.push({
              key: uniqid(),
              date: date,
              month: month,
              day: day,
              exercises: exercises.splice(0, 3).join(', ') + '...'
            });

          }
        });

        this.setState({
          logs_data: logs_data
        });

      });
  }


  render() {
    return (
      <View>
        <FlatList data={this.state.logs_data} renderItem={this.renderItem} />
        {
          this.state.logs_data.length == 0 &&
          <AlertBox type="info" text="You haven't logged any sessions yet." />
        }
      </View>
    );
  }


  renderItem = ({item}) => {
    return (
      <TouchableHighlight underlayColor="#ccc" onPress={() => {
        this.props.navigation.navigate('LogWorkout', {
          date: item.date
        });
      }}>
        <View style={list_styles.list_item} key={item.key}>
          <View style={styles.date_container}>
            <Text style={styles.date_month}>{item.month}</Text>
            <Text style={styles.date_day}>{item.day}</Text>
          </View>

          <View style={styles.exercises}>
            <Text style={styles.exercises_text}>{item.exercises}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

}


const styles = StyleSheet.create({

  date_container: {
    flex: 1,
    alignItems: 'center'
  },
  date_month: {
    fontSize: 12
  },
  date_day: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  exercises: {
    flex: 9,
    paddingLeft: 20
  },
  exercises_text: {
    color: '#696969'
  }
});