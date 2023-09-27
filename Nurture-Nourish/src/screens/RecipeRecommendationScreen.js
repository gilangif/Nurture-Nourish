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
  // const recipes = useSelector((state) => state.recipes)

  recipes = [
    {
      title: "Pisang Goreng",
      description: "Pisang goreng is a popular Indonesian snack made from ripe bananas coated in batter and deep-fried until crispy.",
      ingredients: ["Ripe bananas", "Flour", "Sugar", "Salt", "Water"],
      instructions: [
        "Peel the bananas and slice them diagonally.",
        "In a mixing bowl, combine flour, sugar, and salt.",
        "Gradually add water to the dry mixture to form a smooth batter.",
        "Dip the banana slices into the batter, ensuring they are fully coated.",
        "Deep fry the coated banana slices until golden brown and crispy.",
        "Remove from oil and drain excess oil on a paper towel.",
        "Serve hot and enjoy!",
      ],
      nutrition:
        "Pisang goreng provides a good amount of carbohydrates from the bananas and flour, as well as some fiber, potassium, and vitamin C from the bananas. However, it is important to consume in moderation due to the deep-frying method.",
      inputIngredients: ["Tomato", "Pisang", "Daging merpati"],
      thumb: "https://www.lokataste.com/wp-content/uploads/2020/06/Pisang-Goreng-Recipe.jpg",
      youtube: "https://www.youtube.com/watch?v=C2_tP00mkis",
      youtubeThumb: "https://i.ytimg.com/vi/C2_tP00mkis/hqdefault.jpg",
    },
    {
      title: "Sop Buntut",
      description: "Sop buntut is a savory Indonesian oxtail soup, known for its rich and flavorful broth.",
      ingredients: ["Oxtail", "Carrots", "Potatoes", "Onions", "Garlic", "Bay leaves", "Nutmeg", "Salt", "Pepper", "Soy sauce"],
      instructions: [
        "In a large pot, boil the oxtail with water for about 1 hour until the meat is tender.",
        "Remove the oxtail from the pot and set aside.",
        "In the same pot, sauté onions and garlic until fragrant.",
        "Add carrots, potatoes, bay leaves, nutmeg, salt, and pepper to the pot.",
        "Pour in enough water to cover the vegetables.",
        "Simmer until the vegetables are cooked through.",
        "Add soy sauce to taste.",
        "Return the oxtail to the pot and simmer for another 15 minutes.",
        "Serve hot with steamed rice or bread.",
      ],
      nutrition:
        "Sop buntut is a nutritious dish that provides a good amount of protein from the oxtail, as well as vitamins and minerals from the vegetables. However, it is high in cholesterol and should be consumed in moderation.",
      inputIngredients: ["Tomato", "Pisang", "Daging merpati"],
      thumb: "https://www.cookmeindonesian.com/wp-content/uploads/2020/03/Sop-Buntut3.jpeg",
      youtube: "https://www.youtube.com/watch?v=qp4LPgmH4QE",
      youtubeThumb: "https://i.ytimg.com/vi/qp4LPgmH4QE/hqdefault.jpg",
    },
    {
      title: "Sate Ayam",
      description: "Sate ayam is a popular Indonesian dish consisting of skewered and grilled marinated chicken served with peanut sauce.",
      ingredients: ["Chicken breast", "Soy sauce", "Lime juice", "Garlic", "Ginger", "Peanut butter", "Sweet soy sauce", "Sugar", "Salt", "Skewers"],
      instructions: [
        "Cut the chicken breast into small cubes.",
        "In a bowl, mix soy sauce, lime juice, minced garlic, grated ginger, sugar, and salt to make the marinade.",
        "Marinate the chicken in the mixture for at least 1 hour.",
        "Thread the marinated chicken onto skewers.",
        "Grill the skewers over medium heat until the chicken is cooked through and slightly charred.",
        "In a small saucepan, combine peanut butter, sweet soy sauce, sugar, and a little water to make the peanut sauce.",
        "Cook the peanut sauce over low heat until smooth and slightly thickened.",
        "Serve the grilled chicken skewers with peanut sauce and steamed rice.",
      ],
      nutrition:
        "Sate ayam is a good source of protein from the chicken, and the peanut sauce provides healthy fats. It also contains various spices and flavors, enhancing the overall taste. However, the peanut sauce should be consumed in moderation due to its high calorie content.",
      inputIngredients: ["Tomato", "Pisang", "Daging merpati"],
      thumb: "https://www.indoindians.com/wp-content/uploads/2016/03/Sate-Ayam.jpg",
      youtube: "https://www.youtube.com/watch?v=Vh__EYZzPwg",
      youtubeThumb: "https://i.ytimg.com/vi/Vh__EYZzPwg/hqdefault.jpg",
    },
  ]

  const [loading, setLoading] = useState(true)
  const { ingredients } = route.params

  useEffect(() => {
    setLoading(true)
    // dispatch(getRecipes(ingredients)).then(() => setLoading(false))

    setLoading(false)
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
