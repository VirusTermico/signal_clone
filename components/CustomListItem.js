import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { db, auth, firebase } from "../firebase";

const CustomListItem = ({ id, chatName, email, enterChat }) => {
  const [chats, setChats] = useState([]);
  useEffect(() => {
    const unSubscribe = db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setChats(snapshot.docs.map((doc) => doc.data()))
      );
    return  unSubscribe;
  }, []);

  return (
      <ListItem key={id} bottomDivider onPress={()=>enterChat(id,chatName)}>
        <Avatar
          rounded
          source={
            chats?.[0]?.photoURL || {
              uri: "http://1.bp.blogspot.com/_NYaJQllvyA0/Sy3wtOEdIOI/AAAAAAAAAdE/XtmufCWdG5k/s320/Ramanujan.jpg",
            }
          }
        />
        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: "800" }}>
            {chatName}
          </ListItem.Title>
          <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
            {chats?.[0]?.displayName}:{chats?.[0]?.message}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
