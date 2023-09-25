import { Button, Image, Pressable, ScrollView, Text, View } from "react-native"
import HeaderComponent from "../components/HeaderComponent"
import { Feather, FontAwesome, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import BottomComponent from "../components/BottomComponent"
import NutritionDailyCard from "../components/NutritionDailyCard"

import AsyncStorage from "@react-native-async-storage/async-storage"

export default function ProfileScreen() {
  const navigation = useNavigation()

  const handleLogout = async () => {
    console.log("OK")
    await AsyncStorage.clear()
    console.log(navigation)
    navigation.navigate("Welcome")
  }

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <HeaderComponent
        leftContent={
          <Pressable onPress={() => navigation.goBack()}>
            <Feather name="arrow-left-circle" size={30} color="black" />
          </Pressable>
        }
        centerContent={<Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20 }}>Profile</Text>}
        rightContent={<MaterialCommunityIcons name="dots-horizontal-circle-outline" size={31} style={{ margin: -2 }} color="black" />}
      />
      <ScrollView style={{ paddingHorizontal: 25 }}>
        <View style={{ marginTop: 10, justifyContent: "center", alignItems: "center" }}>
          <Image
            style={{ width: 150, backgroundColor: "red", borderRadius: 100, height: undefined, aspectRatio: 1 }}
            source={{ uri: "https://storage.prompt-hunt.workers.dev/clh4m5fnm0004jq08x3ln0f4w_1" }}
          />
          <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 25, marginVertical: 20 }}>Floryn Georgianna</Text>

          <Button onPress={() => handleLogout()} title="logout" />
          <View style={{ marginTop: 20 }}>
            <Pressable
              onPress={() => {
                navigation.navigate("NutritionDetail")
                console.log("clicked")
              }}
              style={{
                backgroundColor: "white",
                padding: 15,
                gap: 10,
                borderRadius: 20,
                marginBottom: 10,
                borderWidth: 2,
                borderColor: "rgb(203 213 225)",
              }}
            >
              <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 15, marginBottom: -4 }}>Nutrisi Harian Terkini</Text>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ width: 70, height: 60, gap: 8, flexDirection: "row", alignItems: "center" }}>
                  <View style={{ backgroundColor: "rgb(226 232 240)", width: 7, height: 45, borderRadius: 10, justifyContent: "flex-end" }}>
                    <View style={{ backgroundColor: "rgb(239 68 68)", width: "100%", height: "70%", borderRadius: 10 }} />
                  </View>
                  <View>
                    <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 15, marginBottom: -4 }}>25 g</Text>
                    <Text style={{ fontFamily: "Poppins-Bold", color: "rgb(71 85 105)", fontSize: 12, marginBottom: -4 }}>Protein</Text>
                  </View>
                </View>
                <View style={{ width: 70, height: 60, gap: 8, flexDirection: "row", alignItems: "center" }}>
                  <View style={{ backgroundColor: "rgb(226 232 240)", width: 7, height: 45, borderRadius: 10, justifyContent: "flex-end" }}>
                    <View style={{ backgroundColor: "rgb(139 92 246)", width: "100%", height: "80%", borderRadius: 10 }} />
                  </View>
                  <View>
                    <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 15, marginBottom: -4 }}>25 g</Text>
                    <Text style={{ fontFamily: "Poppins-Bold", color: "rgb(71 85 105)", fontSize: 12, marginBottom: -4 }}>Karbo</Text>
                  </View>
                </View>
                <View style={{ width: 70, height: 60, gap: 8, flexDirection: "row", alignItems: "center" }}>
                  <View style={{ backgroundColor: "rgb(226 232 240)", width: 7, height: 45, borderRadius: 10, justifyContent: "flex-end" }}>
                    <View style={{ backgroundColor: "rgb(16 185 129)", width: "100%", height: "30%", borderRadius: 10 }} />
                  </View>
                  <View>
                    <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 15, marginBottom: -4 }}>25 g</Text>
                    <Text style={{ fontFamily: "Poppins-Bold", color: "rgb(71 85 105)", fontSize: 12, marginBottom: -4 }}>Serat</Text>
                  </View>
                </View>
                <View style={{ width: 70, height: 60, gap: 8, flexDirection: "row", alignItems: "center" }}>
                  <View style={{ backgroundColor: "rgb(226 232 240)", width: 7, height: 45, borderRadius: 10, justifyContent: "flex-end" }}>
                    <View style={{ backgroundColor: "rgb(250 204 21)", width: "100%", height: "50%", borderRadius: 10 }} />
                  </View>
                  <View>
                    <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 15, marginBottom: -4 }}>25 g</Text>
                    <Text style={{ fontFamily: "Poppins-Bold", color: "rgb(71 85 105)", fontSize: 12, marginBottom: -4 }}>Lemak</Text>
                  </View>
                </View>
              </View>
            </Pressable>
          </View>
        </View>

        {/* Margin Bottom */}
        <View style={{ height: 20 }} />
      </ScrollView>
      <BottomComponent />
    </View>
  )
}
