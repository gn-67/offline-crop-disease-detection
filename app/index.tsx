import { useCameraPermissions } from 'expo-camera';
import { ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import * as MediaLibrary from 'expo-media-library';
import React, { useEffect, useState } from "react";
import { Alert, Dimensions, Linking, StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import colors, { gradients } from '../assets/colors/colors';
import { Cam, Lib } from '../assets/svg';


const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Index() {
  const [permission, requestPermission] = useCameraPermissions();
  const [permissionResponse, requestPermission2] = MediaLibrary.usePermissions(); // Fixed function name
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [hasMediaPermission, setHasMediaPermission] = useState<boolean | null>(null);

  useEffect(() => {
    if (permission) {
      setHasPermission(permission.granted);
    }
  }, [permission]);

  useEffect(() => {
    if (permissionResponse) { // Fixed: use permissionResponse instead of mediaPermission
      setHasMediaPermission(permissionResponse.granted);
    }
  }, [permissionResponse]); // Fixed: use permissionResponse

  const handleCameraPress = async () => {
    if (!hasPermission) { // Fixed: Camera should check camera permission
      const granted = await requestPermission();
      if (!granted) {
        Alert.alert(
          "Permissions Needed",
          "We need access to your camera to continue.", // Fixed message
          [
            {
              text: "Open Settings",
              onPress: () => Linking.openSettings(),
            },
            { text: "Cancel", style: "cancel" },
          ]
        );
        return;
      }
      setHasPermission(true);
    }

    // actual camera functionality here
  };

  const handleLibPress = async () => {
    if (!hasMediaPermission) { // Fixed: Library should check media permission
      const granted = await requestPermission2(); // Fixed function name
      if (!granted) {
        Alert.alert(
          "Permissions Needed",
          "We need access to your photo library to continue.", // Fixed message
          [
            {
              text: "Open Settings",
              onPress: () => Linking.openSettings(),
            },
            { text: "Cancel", style: "cancel" },
          ]
        );
        return;
      }
      setHasMediaPermission(true);
    }

    // actual library functionality here
  };

  return (
    <LinearGradient
      colors={gradients.backgroundLinear.colors}
      start={gradients.backgroundLinear.start}
      end={gradients.backgroundLinear.end}
      style={styles.container}
    >
      <ImageBackground
        style={responsiveStyle(-18, 200, 451, 717)}
        imageStyle={styles.image}
        source={require('../assets/images/bg.png')}
      >
        <SafeAreaView style={styles.safeArea}>
          <Text style={styles.title}>Plant Disease Detection App</Text>

          {/* <Button
            title="Click Me"
            onPress={() =>
              Alert.alert("My Title", "My message", [
                { text: "Yes", onPress: () => console.log("Yes") },
                { text: "No", onPress: () => console.log("No") },
              ])
            }
          /> */}
{/* //camera and photo lib  */}
          <TouchableOpacity onPress={handleCameraPress}>
            <Cam width={120} height={120} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLibPress}>
            <Lib width={120} height={120} />
          </TouchableOpacity>
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

// Figma-to-screen responsive function
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
    justifyContent: "center",
    alignItems: "center",
  },
  safeArea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "Jersey20-Regular",
    color: colors.secondary,
    fontSize: 24,
  },
});
