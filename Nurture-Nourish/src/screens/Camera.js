import React, { useState, useEffect } from "react"
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from "react-native"
import { Camera } from "expo-camera"

export default function CameraComp({ navigation }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [camera, setCamera] = useState(null)

  const getCamera = async () => {
    const cameraStatus = await Camera.requestCameraPermissionsAsync()
    setHasCameraPermission(cameraStatus.status === "granted")
  }

  useEffect(() => {
    getCamera()
  }, [])

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null)
      navigation.navigate("Preview", { data })
    }
  }

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <View style={styles.container}>
      <HeaderComponent
        leftContent={
          <Pressable onPress={() => navigation.goBack()}>
            <Feather name="arrow-left-circle" size={30} color="black" />
          </Pressable>}
        centerContent={<Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20 }}>Camera</Text>}
        rightContent={
          <Pressable onPress={() => { navigation.navigate('ProfileDetail'); console.log('clicked') }}>
            <FontAwesome5 name="user-circle" size={28} color="black" />
          </Pressable>
        }
      />
      <Camera ref={(ref) => setCamera(ref)} style={styles.fixedRatio} type={type} ratio={"4:3"} />
      <View style={styles.shotBox}>
        <TouchableOpacity
          style={styles.reverseBtn}
          onPress={() => setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)}
        />
        <TouchableOpacity style={styles.shotBtn} onPress={() => takePicture()} />
        <TouchableOpacity style={styles.galleryBtn} />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white"
  },

  fixedRatio: {
    flex: 4,
    aspectRatio: 4 / 3,
  },

  shotBox: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },

  reverseBtn: {
    backgroundColor: "yellow",
    width: 60,
    height: 60,
    borderRadius: 10,
    borderWidth: 2,
  },

  shotBtn: {
    backgroundColor: "white",
    width: 80,
    height: 80,
    borderRadius: 100,
    borderWidth: 2,
  },

  galleryBtn: {
    backgroundColor: "red",
    width: 60,
    height: 60,
    borderRadius: 10,
    borderWidth: 2,
  },
})
