import * as ExpoMediaLibrary from "expo-media-library";
import * as React from 'react';
import { View } from 'react-native-reanimated/lib/typescript/Animated';
import { CameraPermissionStatus } from 'react-native-vision-camera';

export default function PermissionsScreen() {
  const [CameraPermissionStatus, setCameraPermissionStatus] = 
    React.useState<CameraPermissionStatus>("not-determined");
  const[microphonePermissionStatus, setMicrophonePermissionStatus] =
    React.useState<CameraPermissionStatus>("not-determined");
  
  const [mediaLibraryPermission, requestMediaLibraryPermissions] = ExpoMediaLibrary.usePermissions();

  return <>
  
  <View style = {styles.container}>
    <Text type = "subtitle" style = {styles.subtitle}>
      Crop Center needs access to a few permissions in order to work properly.
    </Text>
  </View>
  
  </>;
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  subtitle: {
    textAlign: "center"
  }
});