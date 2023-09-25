import { Image, StyleSheet, View } from "react-native"

export default function Preview({ navigation, route }) {
  const { uri } = route.params.data
  console.log("📌 route.params: ", route.params)
  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={{ height: 200, width: 200 }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
})
