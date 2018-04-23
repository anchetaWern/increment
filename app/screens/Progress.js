import React from 'react';
import { View, Text, TouchableHighlight, Image, StyleSheet, Modal, Alert, FlatList } from 'react-native';

import { Permissions, Camera, FileSystem } from 'expo';
import store from 'react-native-simple-store';
import { MaterialIcons } from '@expo/vector-icons';

import IconButton from '../components/IconButton';
import AlertBox from '../components/AlertBox';

import { getPathSafeDatetime, uniqid, friendlyDate } from '../lib/general';

export default class Progress extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      headerTitle: 'Progress',
      headerRight: (
        <IconButton size={25} color="#FFF" onPress={() => {
          params.openCamera();
        }} />
      ),
      headerStyle: {
        backgroundColor: '#333'
      },
      headerTitleStyle: {
        color: '#FFF'
      }
    }
  };


  state = {
    is_camera_visible: false,
    is_photo_visible: false,
    has_camera_permission: null,
    type: Camera.Constants.Type.back,
    progress_photos: []
  };


  constructor(props) {
    super(props);
    this.document_dir = FileSystem.documentDirectory;
    this.filename_prefix = 'increment_photo_';
  }


  componentWillMount() {
    Permissions.askAsync(Permissions.CAMERA).then((response) => {
      this.setState({
        has_camera_permission: response.status === 'granted'
      });
    });
  }


  componentDidMount() {
    this.props.navigation.setParams({
      'openCamera': this.openCamera
    });

    store.get('progress_photos')
      .then((response) => {
        if(response){
          this.setState({
            progress_photos: response
          });
        }
      });
  }


  openCamera = () => {
    this.setState({
      is_camera_visible: true
    });
  }


  closeCamera = () => {
    this.setState({
      is_camera_visible: false
    });
  }


  flipCamera = () => {
    this.setState({
      type: this.state.type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back,
    });
  }


  closePhoto = () => {
    this.setState({
      is_photo_visible: false
    });
  }


  takePicture = () => {

    if(this.camera){
      this.camera.takePictureAsync().then((data) => {

        let datetime = getPathSafeDatetime();
        let file_path = `${this.document_dir}${this.filename_prefix}${datetime}.jpg`;

        FileSystem.moveAsync({
          from: data.uri,
          to: file_path
        })
        .then((response) => {

          let photo_data = {
            key: uniqid(),
            name: datetime
          };
          store.push('progress_photos', photo_data);

          let progress_photos = [...this.state.progress_photos];
          progress_photos.push(photo_data);

          this.setState({
            progress_photos: progress_photos
          });

          Alert.alert(
            'Saved',
            'Your photo was successfully saved!',
          );

        });
      });
    }

  }


  render() {

    return (
      <View style={styles.wrapper}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.is_camera_visible}
          onRequestClose={() => {
            this.setState({
              is_camera_visible: false
            });
          }}>
          <View style={styles.modal}>
            {
              this.state.has_camera_permission &&
              <Camera style={styles.wrapper} type={this.state.type} ref={ref => { this.camera = ref; }}>
                <View style={styles.camera_body}>
                  <View style={styles.upper_buttons_container}>
                    <IconButton is_transparent={true} icon="close"
                      styles={[styles.camera_button, styles.camera_close_button]}
                      onPress={this.closeCamera} />

                    <IconButton is_transparent={true} icon="flip"
                      styles={[styles.camera_button, styles.camera_flip_button]}
                      onPress={this.flipCamera} />
                  </View>

                  <View style={styles.lower_buttons_container}>
                    <IconButton is_transparent={true} icon="photo-camera"
                      styles={styles.camera_photo_button}
                      onPress={this.takePicture} />
                  </View>
                </View>
              </Camera>
            }
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.is_photo_visible}
          onRequestClose={() => {
            this.setState({
              is_photo_visible: false
            });
          }}>
          <View style={styles.modal}>
            {
              this.state.current_image &&
              <View style={styles.wrapper}>
                <Image
                  source={{uri: this.state.current_image.url}}
                  style={styles.wrapper}
                  ImageResizeMode={"contain"} />

                <IconButton is_transparent={true} icon="close"
                  styles={styles.close_button}
                  onPress={this.closePhoto} />

                <View style={styles.photo_label}>
                  <Text style={styles.photo_label_text}>{this.state.current_image.label}</Text>
                </View>
              </View>
            }
          </View>
        </Modal>

        {
          this.state.progress_photos.length == 0 &&
          <AlertBox text="You haven't taken any progress pictures yet." type="info" />
        }

        {
          this.state.progress_photos.length > 0 &&
          <FlatList data={this.state.progress_photos} numColumns={2} renderItem={this.renderItem} />
        }

      </View>
    );
  }


  showPhoto = (item) => {
    this.setState({
      is_photo_visible: true,
      current_image: {
        url: `${this.document_dir}${this.filename_prefix}${item.name}.jpg`,
        label: friendlyDate(item.name)
      }
    });
  }


  renderItem = ({item}) => {

    let name = friendlyDate(item.name);
    let photo_url = `${this.document_dir}${this.filename_prefix}${item.name}.jpg`;

    return (
      <TouchableHighlight key={item.key} style={styles.list_item} underlayColor="#ccc" onPress={() => {
        this.showPhoto(item);
      }}>
        <View style={styles.image_container}>
          <Image
            source={{uri: photo_url}}
            style={styles.image}
            ImageResizeMode={"contain"} />
          <Text style={styles.image_text}>{name}</Text>
        </View>
      </TouchableHighlight>
    );

  }


}


const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  modal: {
    marginTop: 22,
    flex: 1
  },
  camera_body: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column'
  },
  upper_buttons_container: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  lower_buttons_container: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'flex-end'
  },
  camera_button: {
    padding: 10
  },
  camera_close_button: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start'
  },
  camera_flip_button: {
    alignSelf: 'flex-start',
    alignItems: 'flex-end'
  },
  camera_photo_button: {
    alignSelf: 'center',
    alignItems: 'center',
    paddingBottom: 10
  },
  list_item: {
    flex: 1,
    padding: 10
  },
  image_container: {
    alignItems: 'center'
  },
  image: {
    width: 130,
    height: 130,
  },
  image_text: {
    marginTop: 10,
    fontSize: 12
  },
  close_button: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 10
  },
  photo_label: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 5
  },
  photo_label_text: {
    color: '#FFF'
  }
});