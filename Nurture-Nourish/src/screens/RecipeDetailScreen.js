import { Button, Image, Linking, Modal, Pressable, ScrollView, Text, TouchableWithoutFeedback, View } from "react-native"
import HeaderComponent from "../components/HeaderComponent"
import { FontAwesome5, Feather, Entypo, FontAwesome } from "@expo/vector-icons"
import { useNavigation, useRoute } from "@react-navigation/native"
import BottomComponent from "../components/BottomComponent"
import { useEffect } from "react"

export default function RecipeDetailScreen() {
  const navigation = useNavigation()
  const route = useRoute()

  const { recipe, status } = route.params
  useEffect(() => {
    console.log(route)
  }, [])

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <HeaderComponent
        leftContent={
          <Pressable onPress={() => navigation.goBack()}>
            <Feather name="arrow-left-circle" size={30} color="black" />
          </Pressable>
        }
        centerContent={<Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20 }}>Resep Makanan</Text>}
        rightContent={
          <>
          {  status && status === "unsave" ?  (<Feather name="bookmark" size={28} color="black" />) : ""
           }
            <FontAwesome5 name="user-circle" size={28} color="black" />
          </>
        }
      />
      <ScrollView style={{ paddingHorizontal: 25 }}>
        <View style={{ marginTop: 10 }}>
          <View>
            <Image
              resizeMode="cover"
              style={{ width: "100%", height: 200, borderRadius: 20 }}
              source={{
                uri: recipe.thumb,
              }}
            />
          </View>
          <View>
            <Button onPress={() => Linking.openURL(recipe.youtube)} title="Youtube" />
            <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20, marginTop: 20 }}>{recipe?.title}</Text>
            <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 17, marginTop: 10 }}>Deskripsi:</Text>
            <Text style={{ fontFamily: "Poppins-Regular", fontSize: 16, textAlign: "justify" }}>{recipe?.description}</Text>
            <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 17, marginTop: 10 }}>Nutrisi:</Text>
            <Text style={{ fontFamily: "Poppins-Regular", fontSize: 16, textAlign: "justify" }}>{recipe?.nutrition}</Text>
            <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 17, marginTop: 10 }}>Bahan - bahan:</Text>
            {recipe?.ingredients.map((ingredient, i) => {
              return (
                <View key={i} style={{ flexDirection: "row" }}>
                  <Text style={{ fontFamily: "Poppins-Regular", fontSize: 16 }}>{i + 1}. </Text>
                  <Text style={{ fontFamily: "Poppins-Regular", fontSize: 16, textAlign: "justify", flex: 1 }}>{ingredient}</Text>
                </View>
              )
            })}
            <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 17, marginTop: 10 }}>Langkah- langkah:</Text>
            {recipe?.instructions.map((instruction, i) => {
              return (
                <View key={i} style={{ flexDirection: "row", flex: 1 }}>
                  <Text style={{ fontFamily: "Poppins-Regular", fontSize: 16 }}>{i + 1}. </Text>
                  <Text style={{ fontFamily: "Poppins-Regular", fontSize: 16, flex: 1 }}>{instruction}</Text>
                </View>
              )
            })}
          </View>
        </View>

        {/* Margin Bottom */}
        <View style={{ height: 30 }} />
      </ScrollView>
      <BottomComponent />
    </View>
  )
}
