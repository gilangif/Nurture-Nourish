import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native"
import HeaderComponent from "../components/HeaderComponent"
import { FontAwesome5 } from "@expo/vector-icons"
import { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import RecipeCard from "../components/RecipeCard"
import ArticleCard from "../components/ArticleCard"
import BottomComponent from "../components/BottomComponent"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function DashboardScreen() {
  const [modalVisible, setModalVisible] = useState(false)
  const navigation = useNavigation()
  const [user, setUser] = useState("")

  useEffect(() => {
    const getUser = async () => {
      setUser(await AsyncStorage.getItem("username"))
    }
    getUser()
  }, [])

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <HeaderComponent
        leftContent={
          <>
            <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20, marginBottom: -4 }}>Hi, {user}!</Text>
            <Text style={{ fontFamily: "Poppins-Medium", fontSize: 15 }}>find, track, and eat healthy food.</Text>
          </>
        }
        rightContent={
          <>
            <Pressable
              onPress={() => {
                navigation.navigate("ProfileDetail")
                console.log("clicked")
              }}
            >
              <FontAwesome5 name="user-circle" size={28} color="black" />
            </Pressable>
          </>
        }
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
          <View
            onPress={() => setModalVisible(!modalVisible)}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              paddingHorizontal: 25,
            }}
          >
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 18,
                  padding: 35,
                  alignItems: "center",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5,
                }}
              >
                <Text style={{ fontFamily: "Poppins-Medium", fontSize: 16, marginLeft: 10, marginBottom: 20 }}>Hitung Hari Perkiraan Lahir</Text>
                <Pressable
                  style={{
                    borderRadius: 10,
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    elevation: 2,
                    backgroundColor: "#2196F3",
                  }}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "Poppins-Medium",
                      textAlign: "center",
                      marginBottom: -3,
                    }}
                  >
                    Tutup
                  </Text>
                </Pressable>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <ScrollView style={{ paddingHorizontal: 25 }}>
        <View style={{ marginTop: 10 }}>
          <Pressable
            onPress={() => navigation.navigate("NutritionList")}
            style={{
              flexDirection: "row-reverse",
              alignItems: "center",
              backgroundColor: "white",
              padding: 20,
              borderRadius: 20,
              borderWidth: 2,
              borderColor: "rgb(203 213 225)",
            }}
          >
            <View style={{ width: 60, marginTop: -10, marginBottom: -13 }}>
              <Image resizeMode="contain" style={{ width: "100%", height: undefined, aspectRatio: 1 }} source={require("../images/logo.png")} />
            </View>
            <View style={{ flex: 1, marginRight: 20 }}>
              <Text style={{ fontFamily: "Poppins-Medium", fontSize: 15 }}>Pantau nutrisi harian Anda secara teratur</Text>
            </View>
          </Pressable>
        </View>

        {/* Related Article */}
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 16, marginBottom: -4 }}>Artikel Kehamilan</Text>
          <ScrollView horizontal style={{ marginTop: 10 }} showsHorizontalScrollIndicator={false}>
            <ArticleCard />
            <ArticleCard />
            <ArticleCard />
          </ScrollView>
        </View>

        <View>
          <Pressable
            onPress={() => setModalVisible(true)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              padding: 20,
              borderRadius: 20,
              marginTop: 20,
              borderWidth: 2,
              borderColor: "rgb(203 213 225)",
            }}
          >
            <View style={{ width: 60, marginTop: -10, marginBottom: -13 }}>
              <Image resizeMode="contain" style={{ width: "100%", height: undefined, aspectRatio: 1 }} source={require("../images/pregnancy.png")} />
            </View>
            <View style={{ flex: 1, marginLeft: 20 }}>
              <Text style={{ fontFamily: "Poppins-Medium", fontSize: 15 }}>Sudah tahu kapan Hari Perkiraan Lahir anda?</Text>
            </View>
          </Pressable>
        </View>

        <View style={{ marginTop: 10 }}>
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 20,
              borderWidth: 2,
              borderColor: "rgb(203 213 225)",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ height: "100%", width: 5, backgroundColor: "gray", borderRadius: 10 }} />
              <Text
                style={{
                  fontFamily: "Poppins-SemiBold",
                  fontSize: 16,
                  marginLeft: 5,
                  marginTop: 1,
                  flex: 1,
                }}
              >
                241 Hari Lagi Menuju Kelahiran Si Kecil
              </Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 20, marginHorizontal: 3, alignItems: "center", justifyContent: "space-between" }}>
              <View>
                <Image style={{ width: 35, height: undefined, aspectRatio: 1 }} source={require("../images/fetus.png")} />
              </View>
              <View style={{ flex: 1, marginHorizontal: 10 }}>
                <View style={{ height: 10, borderRadius: 10, width: "100%", backgroundColor: "rgb(203 213 225)", overflow: "hidden" }}>
                  <View style={{ height: 10, borderRadius: 10, width: "50%", backgroundColor: "green" }} />
                </View>
              </View>
              <View>
                <Image style={{ width: 33, height: undefined, aspectRatio: 1 }} source={require("../images/baby.png")} />
              </View>
            </View>
            <View style={{ flexDirection: "row", marginTop: 20, marginHorizontal: 3 }}>
              <Text
                style={{
                  fontFamily: "Poppins-SemiBold",
                  fontSize: 16,
                  marginTop: -20,
                  flex: 1,
                  textAlign: "center",
                }}
              >
                Trimester 1
              </Text>
            </View>
          </View>
        </View>

        {/* Rekomendasi Resep (sesuai timester) */}
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 16, marginBottom: -4 }}>Resep Makanan (Trimester 1)</Text>
          <ScrollView horizontal style={{ marginTop: 10 }} showsHorizontalScrollIndicator={false}>
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
          </ScrollView>
        </View>

        {/* Margin Bottom */}
        <View style={{ height: 30 }} />
      </ScrollView>
      <BottomComponent />
    </View>
  )
}
