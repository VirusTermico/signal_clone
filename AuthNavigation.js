import React, { useState, useEffect } from "react";
import { View,Text } from "react-native";
import firebase from "./firebase";
import { SignedOutStack, SignInStack } from "./navigation";

const AuthNavigation = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const userHandler = user =>
  user ? setCurrentUser(user) : setCurrentUser(null);

  useEffect(() => {
    () => firebase.auth().onAuthStateChanged(user => userHandler(user))
  }, [])





  return <>{currentUser?<SignInStack/>:<SignedOutStack/>}</>
  //return (<><SignInStack/></>);
}

export default AuthNavigation;
