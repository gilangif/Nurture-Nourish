import { Button, StyleSheet, View, Text } from "react-native"

export default function Loading({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Bisa sabar kaga bang? tungguin makanya...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
})
