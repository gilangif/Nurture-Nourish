import { Image, Modal, Pressable, ScrollView, Text, TouchableWithoutFeedback, View } from "react-native"
import HeaderComponent from "../components/HeaderComponent"
import { FontAwesome5, Feather, Entypo, FontAwesome } from "@expo/vector-icons"
import { useState } from "react"
import { useNavigation, useRoute } from "@react-navigation/native"
import NutritionSubDetail from "../components/NutritionSubDetail"
import BottomComponent from "../components/BottomComponent"

export default function NutritionDetailScreen() {
  const navigation = useNavigation()
  const route = useRoute()
  const [modalVisible, setModalVisible] = useState(false)

  const {
    Protein_g,
    Karbohidrat_g,
    Serat_g,
    Lemak_Total,
    Omega_3,
    Omega_6,
    Air_ml,
    Vitamin_A_re,
    Vitamin_C_mcg,
    Folat,
    Kolin,
    Vitamin_B5,
    Vitamin_B3,
    Vitamin_B6,
    Vitamin_B1,
  } = route.params.data.details

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <HeaderComponent
        leftContent={
          <Pressable onPress={() => navigation.goBack()}>
            <Feather name="arrow-left-circle" size={30} color="black" />
          </Pressable>
        }
        centerContent={<Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20 }}>Detail Nutrisi</Text>}
        rightContent={
          <Pressable
            onPress={() => {
              navigation.navigate("ProfileDetail")
              console.log("clicked")
            }}
          >
            <FontAwesome5 name="user-circle" size={28} color="black" />
          </Pressable>
        }
      />
      <ScrollView style={{ paddingHorizontal: 25 }}>
        <View style={{ marginTop: 10 }}>
          <View
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
            <View style={{ flexDirection: "row", gap: 10 }}>
              <View style={{ alignItems: "center" }}>
                {/* <Entypo name="squared-cross" style={{ color: "red" }} size={39} color="black" /> */}
                <FontAwesome name="check-square-o" style={{ color: "green" }} size={40} color="black" />
              </View>
              <View style={{ flex: 1 }}>
                <Text numberOfLines={1} style={{ fontFamily: "Poppins-SemiBold", fontSize: 12, marginBottom: -5 }}>
                  17 Agustus 2023
                </Text>
                <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 15 }}>{route.params.data.input}</Text>
              </View>
            </View>
            <View style={{ flex: 1, backgroundColor: "rgb(203 213 225)", height: 2, marginBottom: 10, marginHorizontal: -15 }} />
            <View
              style={{
                gap: 15,
                borderRadius: 20,
                marginBottom: 10,
              }}
            >
              <NutritionSubDetail
                name={"Protein"}
                percentage={Protein_g.value + "%"}
                color={"rgb(239 68 68)"}
                imgUrl={require("../images/protein.png")}
              />
              <NutritionSubDetail
                name={"Karbohidrat"}
                percentage={Karbohidrat_g.value + "%"}
                color={"rgb(239 168 68)"}
                imgUrl={require("../images/protein.png")}
              />
              <NutritionSubDetail
                name={"Serat"}
                percentage={Serat_g.value + "%"}
                color={"rgb(239 168 68)"}
                imgUrl={require("../images/protein.png")}
              />
              <NutritionSubDetail
                name={"Lemak"}
                percentage={Lemak_Total.value + "%"}
                color={"rgb(239 168 68)"}
                imgUrl={require("../images/protein.png")}
              />
              <NutritionSubDetail
                name={"Omega 3"}
                percentage={Omega_3.value + "%"}
                color={"rgb(239 168 68)"}
                imgUrl={require("../images/protein.png")}
              />
              <NutritionSubDetail
                name={"Omega 6"}
                percentage={Omega_6.value + "%"}
                color={"rgb(239 168 68)"}
                imgUrl={require("../images/protein.png")}
              />
              <NutritionSubDetail
                name={"Mineral"}
                percentage={Air_ml.value + "%"}
                color={"rgb(239 168 68)"}
                imgUrl={require("../images/protein.png")}
              />
              <NutritionSubDetail
                name={"Vitamin A"}
                percentage={Vitamin_A_re.value + "%"}
                color={"rgb(239 168 68)"}
                imgUrl={require("../images/protein.png")}
              />
              <NutritionSubDetail
                name={"Vitamin C"}
                percentage={Vitamin_C_mcg.value + "%"}
                color={"rgb(239 168 68)"}
                imgUrl={require("../images/protein.png")}
              />
              <NutritionSubDetail name={"Folat"} percentage={Folat.value + "%"} color={"rgb(239 168 68)"} imgUrl={require("../images/protein.png")} />
              <NutritionSubDetail name={"Kolin"} percentage={Kolin.value + "%"} color={"rgb(239 168 68)"} imgUrl={require("../images/protein.png")} />
              <NutritionSubDetail
                name={"Vitamin B1"}
                percentage={Vitamin_B1.value + "%"}
                color={"rgb(239 168 68)"}
                imgUrl={require("../images/protein.png")}
              />
              <NutritionSubDetail
                name={"Vitamin B3"}
                percentage={Vitamin_B3.value + "%"}
                color={"rgb(239 168 68)"}
                imgUrl={require("../images/protein.png")}
              />
              <NutritionSubDetail
                name={"Vitamin B5"}
                percentage={Vitamin_B5.value + "%"}
                color={"rgb(239 168 68)"}
                imgUrl={require("../images/protein.png")}
              />
              <NutritionSubDetail
                name={"Vitamin B6"}
                percentage={Vitamin_B6.value + "%"}
                color={"rgb(239 168 68)"}
                imgUrl={require("../images/protein.png")}
              />
              <NutritionSubDetail
                name={"Vitamin B1"}
                percentage={Vitamin_B1.value + "%"}
                color={"rgb(239 168 68)"}
                imgUrl={require("../images/protein.png")}
              />
            </View>
          </View>
        </View>

        {/* Margin Bottom */}
        <View style={{ height: 30 }} />
      </ScrollView>
      <BottomComponent />
    </View>
  )
}
