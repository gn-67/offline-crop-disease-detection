import { ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Button, Dimensions, StyleSheet, Text, TouchableHighlight } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors, { gradients } from '../assets/colors/colors';
import Logo from "../assets/svg/logo.svg";

export default function Index() {
  const handlePress = () => console.log("Text pressed");
  console.log(Dimensions.get("screen"));
  // towels, bedding, extension cord + chargers
  
  return (
    <LinearGradient
      colors={gradients.backgroundLinear.colors}
      start={gradients.backgroundLinear.start}
      end={gradients.backgroundLinear.end}
      style={styles.container}
    >
      <ImageBackground
        style = {styles.background}
        imageStyle={styles.image}
        source={require('../assets/images/bg.png')}
        >

        <SafeAreaView style={styles.safeArea}>
          <Text style={styles.title}>
            Plant Disease Detection App
          </Text>
    
          <Button 
            title="Click Me" 
            onPress={() => Alert.alert("My Title", "My message", [
              {text: "Yes", onPress: () => console.log("Yes") },
              {text: "No", onPress: () => console.log("No") },
            ])} />
        
          <TouchableHighlight onPress={() => console.log("Image tapped")}>
            <Logo width={120} height={120} />
          </TouchableHighlight>
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );

}
const { width, height } = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',   //brings text to the center of the screen
    alignItems: 'center',  //aligns it to the center
  },
  
  background: {
    flex: 1,
    width: width * 1.1, height: height,   //100% of screen width
    justifyContent: "center",
    alignItems: "center",
    transform: [{translateY: height * 0.25}],
    
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },


  title: {
    fontFamily: 'Jersey20-Regular',
    color: colors.secondary,
    fontSize: 24,
  }
});