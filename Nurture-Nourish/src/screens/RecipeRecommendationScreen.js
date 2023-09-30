import { Image, Modal, Pressable, ScrollView, Text, TextInput, TouchableWithoutFeedback, View } from "react-native"
import HeaderComponent from "../components/HeaderComponent"
import { FontAwesome5, Feather, Entypo, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons"
import { useNavigation, useRoute } from "@react-navigation/native"
import BottomComponent from "../components/BottomComponent"
import RecipeSaveCard from "../components/RecipeSaveCard"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getRecipes } from "../stores/actionCreator"
import Loading from "../components/Loading"

export default function RecipeRecommendationScreen() {
  const navigation = useNavigation()
  const route = useRoute()
  const dispatch = useDispatch()
  const recipes = useSelector((state) => state.recipes)

  const [loading, setLoading] = useState(true)
  const { ingredients } = route.params

  useEffect(() => {
    setLoading(true)
    dispatch(getRecipes(ingredients)).then(() => setLoading(false))
  }, [])

  if (loading) {
    return <Loading />
  } else {
    return (
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <HeaderComponent
          leftContent={
            <Pressable onPress={() => navigation.goBack()}>
              <Feather name="arrow-left-circle" size={30} color="black" />
            </Pressable>
          }
          centerContent={<Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20 }}>Rekomendasi Resep</Text>}
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
            {recipes.map((item, index) => (
              <RecipeSaveCard recipe={item} key={index} status="unsave" />
            ))}
          </View>

          {/* Margin Bottom */}
          <View style={{ height: 15 }} />
        </ScrollView>
        <BottomComponent />
      </View>
    )
  }
}
