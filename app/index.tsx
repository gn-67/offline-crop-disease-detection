import { ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Button, Dimensions, StyleSheet, Text, TouchableHighlight } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCameraDevice, useCameraPermission } from "react-native-vision-camera";
import colors, { gradients } from '../assets/colors/colors';
import Logo from "../assets/svg/logo.svg";

export default function Index() {
  const handlePress = () => console.log("Text pressed");
  console.log(Dimensions.get("screen"));
  const {hasPermission} = useCameraPermission();
  const microphonePermission = Camera.getMicrophonePermissionStatus();
  const redirectToPermissions = !hasPermission || microphonePermission == "not-determined";

  const device = useCameraDevice("back");
  const router = useRouter();
  if (redirectToPermissions) return <Redirect href={"/permissions"} />;  //prob use alert
  if(!device) return <></>;

  

  return (
    <LinearGradient
      colors={gradients.backgroundLinear.colors}
      start={gradients.backgroundLinear.start}
      end={gradients.backgroundLinear.end}
      style={styles.container}
    >
      <ImageBackground
        style = {responsiveStyle(-18, 200, 451, 717)}
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

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

/**
 * converts Figma design values into responsive screen values
 * @param {number} x - X position from Figma
 * @param {number} y - Y position from Figma
 * @param {number} w - Width from Figma
 * @param {number} h - Height from Figma
 * @param {number} designWidth - Figma frame width (default 375)
 * @param {number} designHeight - Figma frame height (default 812)
 * @returns {object} { top, left, width, height }
 */
export function responsiveStyle(x, y, w, h, designWidth = 412, designHeight = 917) {
  return {
    position: "absolute",
    left: (x / designWidth) * SCREEN_WIDTH,
    top: (y / designHeight) * SCREEN_HEIGHT,
    width: (w / designWidth) * SCREEN_WIDTH,
    height: (h / designHeight) * SCREEN_HEIGHT,
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',   //brings text to the center of the screen
    alignItems: 'center',  //aligns it to the center
  },
  
  // background: {
  //   flex: 1,
  //   width: width * 1.1, height: height,   //100% of screen width
  //   justifyContent: "center",
  //   alignItems: "center",
  //   responsiveStyle(-18, 200, 451, 717)
    
  // },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // camera: {
   
  // }


  title: {
    fontFamily: 'Jersey20-Regular',
    color: colors.secondary,
    fontSize: 24,
  }
});