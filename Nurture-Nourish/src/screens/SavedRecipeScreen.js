import { Image, Modal, Pressable, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native'
import HeaderComponent from '../components/HeaderComponent'
import { FontAwesome5, Feather, Entypo, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import RecipeCard from '../components/RecipeCard';
import RecipeSaveCard from '../components/RecipeSaveCard';
import BottomComponent from '../components/BottomComponent';

export default function SavedRecipeScreen() {
    const navigation = useNavigation()

    return (
        <View style={{ backgroundColor: "white", flex: 1 }}>
            <HeaderComponent
                leftContent={
                    <>
                        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20, marginBottom: -4 }}>
                            Resep
                        </Text>
                        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20, marginBottom: -4 }}>
                            Makanan Tersimpan
                        </Text>
                    </>}
                rightContent={<><FontAwesome5 name="user-circle" size={28} color="black" /></>}
            />
            <ScrollView style={{ paddingHorizontal: 25 }}>
                <View style={{ marginTop: 10 }}>
                    <RecipeSaveCard />
                    <RecipeSaveCard />
                    <RecipeSaveCard />
                    <RecipeSaveCard />
                    <RecipeSaveCard />
                </View>

                {/* Margin Bottom */}
                <View style={{ height: 15 }} />
            </ScrollView >
            <BottomComponent />
        </View >
    )
}

