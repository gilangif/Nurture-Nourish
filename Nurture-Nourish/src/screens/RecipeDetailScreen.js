import { Image, Modal, Pressable, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native'
import HeaderComponent from '../components/HeaderComponent'
import { FontAwesome5, Feather, Entypo, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function RecipeDetailScreen() {
    const navigation = useNavigation()
    const recipe = {
        "title": "Rendang Daging Sapi",
        "description": "Rendang is a rich and tender coconut beef stew which is explosively flavorful and beefy. One of the most celebrated dishes in Indonesian cuisine.",
        "ingredients": [
            "500 grams of beef, cubed",
            "200 ml of milk or coconut milk",
            "2 tomatoes, quartered",
            "3 chillies, sliced (adjust to taste)",
            "2 lemongrass stalks",
            "4 kaffir lime leaves",
            "2 turmeric leaves (optional)",
            "2 tsp tamarind paste",
            "Salt to taste",
            "Spice paste (blended): 5 shallots, 3 cloves garlic, 1 thumb-sized ginger"
        ],
        "instructions": [
            "Blend the shallots, garlic, and ginger to make a spice paste.",
            "Heat some oil in a pan and sauté the spice paste until fragrant.",
            "Add the beef to the pan and sear until browned.",
            "Add lemongrass, kaffir lime leaves, turmeric leaves, and chillies. Stir well.",
            "Pour in the milk or coconut milk and let it simmer for about 1.5 hours or until the meat is tender and the sauce has thickened.",
            "Add the tomatoes, tamarind paste, and salt. Stir well and cook for an additional 10 minutes.",
            "Serve with warm rice."
        ],
        "nutrition": "Rich in protein from beef and contains essential nutrients from tomatoes and milk. The chili provides a boost to metabolism."
    }

    return (
        <View style={{ backgroundColor: "white", flex: 1 }}>
            <HeaderComponent
                leftContent={
                    <Pressable onPress={() => navigation.goBack()}>
                        <Feather name="arrow-left-circle" size={30} color="black" />
                    </Pressable>}
                centerContent={<Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20 }}>Resep Makanan</Text>}
                rightContent={<><Feather name="bookmark" size={28} color="black" /><FontAwesome5 name="user-circle" size={28} color="black" /></>}
            />
            <ScrollView style={{ paddingHorizontal: 25 }}>
                <View style={{ marginTop: 10 }}>
                    <View>
                        <Image resizeMode='cover' style={{ width: '100%', height: 200, borderRadius: 20 }} source={{ uri: "https://www.astronauts.id/blog/wp-content/uploads/2023/03/Resep-Rendang-Daging-Sapi-Untuk-Lebaran-Gurih-dan-Nikmat-1024x683.jpg" }} />
                    </View>
                    <View>
                        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20, marginTop: 20 }}>
                            {recipe?.title}
                        </Text>
                        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 17, marginTop: 10 }}>
                            Deskripsi:
                        </Text>
                        <Text style={{ fontFamily: "Poppins-Regular", fontSize: 16, textAlign: 'justify' }}>
                            {recipe?.description}
                        </Text>
                        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 17, marginTop: 10 }}>
                            Nutrisi:
                        </Text>
                        <Text style={{ fontFamily: "Poppins-Regular", fontSize: 16, textAlign: 'justify' }}>
                            {recipe?.nutrition}
                        </Text>
                        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 17, marginTop: 10 }}>
                            Bahan - bahan:
                        </Text>
                        {recipe?.ingredients.map((ingredient, i) => {
                            return (
                                <View key={i} style={{ flexDirection: "row" }}>
                                    <Text style={{ fontFamily: "Poppins-Regular", fontSize: 16 }}>{i + 1}. </Text>
                                    <Text style={{ fontFamily: "Poppins-Regular", fontSize: 16, textAlign: "justify", flex: 1 }}>{ingredient}</Text>
                                </View>
                            )
                        })}
                        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 17, marginTop: 10 }}>
                            Langkah- langkah:
                        </Text>
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
            </ScrollView >
        </View >
    )
}

