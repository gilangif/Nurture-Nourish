import React, { useState, useEffect } from "react"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { Camera } from "expo-camera"
import axios from "axios"
import * as FileSystem from "expo-file-system"
import { Buffer } from "@craftzdog/react-native-buffer"

import FormData from "form-data"

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
      console.log("📌 data: ", data)

      navigation.navigate("Preview", { data })
    }
  }

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <View style={styles.container}>
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
