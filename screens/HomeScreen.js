import { StatusBar } from "expo-status-bar";
import {auth,db} from "../firebase";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import CustomListItem from "../components/CustomListItem";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SimpleLineIcons } from "@expo/vector-icons";
import HeaderRight from "../components/HeaderRight";
import {Button} from 'react-native-elements'

const Home = ({ navigation }) => {
  const enterChat = (id,chatName) => {
    navigation.navigate("chat",{
      id:id,
      chatName:chatName,
      
    });
  };

  const [chats, setChats] = useState([]);

  const signOut = () => {
  
      auth.signOut()
      .then(() => {
        navigation.replace("login");
      });
  };

  useEffect(() => {
    const unsubscribe = db.collection("chats").onSnapshot((snapshot) => {
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    return () => unsubscribe();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal Clone",
      headerStyle: { backgroundColor: "#00B4D8" },
      headerTintColor: "#fff",
      headerTintStyle: { color: "black" },
      alignTitleHeader: "center",

      headerRight: () => (
        <View style={styles.headerRight}>
          <HeaderRight name="camera" />
          <SimpleLineIcons name="pencil"  size={24} color="white" onPress={()=>navigation.navigate("addchat")}/>
        </View>
      ),
      headerLeft: () => (
        <View style={styles.headerLeft}>
          <HeaderRight name="logout" onPress={() => signOut()} />
        </View>
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar type="ligth" />
      <ScrollView>
      
      {chats.map(({id,data:{chatName}})=>(
        <CustomListItem key={id} id={id} chatName={chatName} email={chatName} enterChat={() => enterChat(id,chatName
          )} />
        ))}
      </ScrollView>
      <Button title="upload foto" onPress={()=>navigation.navigate("insta")}/>
      <Text>{auth.currentUser.displayName}</Text>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
  headerLeft: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 80,
    marginLeft: 20,
  },
  headerRight: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 80,
    marginRight: 20,
  },
});
