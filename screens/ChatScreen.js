import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Keyboard,
} from "react-native";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { db, auth, firebase } from "../firebase";
import { Avatar } from "react-native-elements";

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [conversations, setConversations] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal Clone",
      headerStyle: { backgroundColor: "#00B4D8" },
      headerTintColor: "#fff",
      headerTintStyle: { color: "black" },
      alignTitleHeader: "center",
      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar
            rounded
            source={{
              uri: "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
            }}
          />
          <Text style={{ color: "white", marginLeft: 10, fontWeight: "700" }}>
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const sendMessage = () => {
    Keyboard.dismiss();
    db.collection("chats").doc(route.params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      display_name: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photo_url: auth.currentUser.photoURL,
    });

    setInput("");
  };

  useLayoutEffect(() => {
    const unSubscribe = db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setConversations(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, [route]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar type="ligth" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 160}
      >
        <>
          <ScrollView contentContainerStyle={{paddingTop:15}}>
            {conversations.map(({ id, data }) =>
              data.email === auth.currentUser.email ? (
                <View key={id} style={styles.receiver}>
                  <Avatar
                    size={30}
                    rounded
                    position="absolute"
                    bottom={-15}
                    right={-5}
                    source={{
                      uri:
                        data.photoURL ||
                        "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
                    }}

                  />

                  <Text style={styles.receiverText}>{data.message}</Text>
                  <Text style={styles.displayName}>{data.displayName}</Text>

                </View>
              ) : (
                <View key={id} style={styles.sender}>
                  <Avatar
                    size={30}
                    rounded
                    position="absolute"
                    bottom={-15}
                    left={-5}
                    source={{
                      uri:
                        data.photoURL ||
                        "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
                    }}
                  />
                  <Text style={styles.senderText}>{data.message}</Text>
                  <Text style={styles.displayName}>{data.displayName}</Text>
                </View>
              )
            )}
          </ScrollView>

          <View style={styles.footer}>
            <TextInput
              style={styles.inputText}
              placeholder="Escreva aqui"
              onChangeText={(text) => setInput(text)}
              value={input}
              onSubmitEditing={sendMessage}
            />
            <TouchableOpacity onPress={sendMessage}>
              <Ionicons name="send" size={24} color="#2B68E6" />
            </TouchableOpacity>
          </View>
        </>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerRight: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 80,
    marginRight: 20,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  inputText: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: "transparent",
    backgroundColor: "#ECECEC",
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
  receiver: {
    padding: 15,
    backgroundColor: "#ECECEC",
    borderRadius: 20,
    marginRight: 15,
    alignSelf: "flex-end",

    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  sender: {
    padding: 15,
    backgroundColor: "#2B68E6",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
    position: "relative",
  },
  receiverText: {
    color: "black",
  },
  senderText: {
    color: "white",

  },displayName:{
      color:"white"
  }
});
