import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
const MapaScreen = ({ navigation }) => {
  const [regiao, setRegiao] = useState({
    latitude: -12.586349,
    longitude: 13.413449,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

 
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      const nova = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };

      setRegiao(nova);
      console.log(nova);

    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <MapView
        style={{ width: "100%", height: "100%" }}
        initialRegion={regiao}
        showsUserLocation={true}
        userLocationPriority="high"
        showsMyLocationButton={true}
        provider="google"
      >
        {location?.coords && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Estou aqui"
            description="Vai aquecer, venha se divertir 🔥"
          />
        )}
      </MapView>
    </View>
  );
};

export default MapaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
