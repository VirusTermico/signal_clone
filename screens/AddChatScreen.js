import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input ,Button} from "react-native-elements";
import {db} from "../firebase";
import Icon from "react-native-vector-icons/FontAwesome";

const AddChatScreen = ({navigation}) => {
  const [input, setInput] = useState("");

  const createChat = async () => {
    
      db.collection("chats").add({
        chatName: input,
      }).then(()=>navigation.goBack()).catch(error=>alert(error.messase));
    
  };
  return (
    <View style={styles.container}>
      <Input
        placeholder="Nome do Chat"
        onChangeText={(text) => setInput(text)}
        value={input}
        autoFocus
        leftIcon={
          <Icon name="wechat" type="antdesign" size={24} color="black" />
        }
      />
      <Button title="Criar Novo Tópico" onPress={createChat}/>
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({
    container:{
        padding:30,
        backgroundColor:"white",
        height:"100%"
    }
});
