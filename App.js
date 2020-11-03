import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import { RNCamera } from 'react-native-camera';
import ImagePicker from 'react-native-image-crop-picker';
import ImgToBase64 from 'react-native-image-base64';


export default function App() { 
  
  state = {
    img: null
  }
  
  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.9, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);

      ImagePicker.openCropper({        
        path: data.uri,
        freeStyleCropEnabled: true,
        width: 300,
        height: 400
      }).then(image => {
        ImgToBase64.getBase64String(image.path)
          .then(base64String => console.log(base64String))
          .catch(err => console.log(err));
        this.setState({
          img: <Image
            source={{ uri: image.path }}
            style={styles.preview}
          />
        });
      });
    }
  }

  return (
    <View style={styles.container}>
      {this.state.img ?
        <>
          {this.state.img}
          <TouchableOpacity style={styles.confirm}>
            <Text style={{ color: '#fff' }}>Confirmar</Text>
          </TouchableOpacity>
        </>
        :
        <>
          <RNCamera
            ref={camera => { this.camera = camera }}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            autoFocus={RNCamera.Constants.AutoFocus.on}
            flashMode={RNCamera.Constants.FlashMode.off}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
          />
          <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
              <Text style={{ fontSize: 14 }}> SNAP </Text>
            </TouchableOpacity>
          </View>
        </>
      }

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: '#FFF',
    marginBottom: 15,
  },
  cancel: {
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 17,
  },
  confirm: {
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: 'black',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 21,
    padding: 8,
    borderRadius: 4
  }
});