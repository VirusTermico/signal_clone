import React, { useState, useEffect } from 'react';
import { Button, Image,Text, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import firebase from './firebase';

export default function ImagemScreen() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [8, 7],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    
        uploadImage(result.uri, "test-image")
          .then(() => {
            Alert.alert("Success");
          })
          .catch((error) => {
            Alert.alert(error);
          });
    }
  };


  const uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase.storage().ref().child("images/" + imageName);
    return ref.put(blob);
  }


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Escolher uma Foto" onPress={pickImage} />
      <View style={{height:100}}/>
      {image && <Image source={{ uri: image }} style={{ width: 400, height: 400 }} />}
    </View>
  );
}
