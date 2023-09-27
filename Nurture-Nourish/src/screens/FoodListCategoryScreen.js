import { Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import HeaderComponent from '../components/HeaderComponent'
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import FoodCategoryCard from '../components/FoodCategoryCard';
import BottomComponent from '../components/BottomComponent';
import FoodCard from '../components/FoodCard';

export default function FoodListCategoryScreen() {
    const navigation = useNavigation()

    return (
        <View style={{ backgroundColor: "white", flex: 1 }}>
            <HeaderComponent
                leftContent={
                    <Pressable onPress={() => navigation.goBack()}>
                        <Feather name="arrow-left-circle" size={30} color="black" />
                    </Pressable>}
                centerContent={<Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20 }}>Biji-bijian</Text>}
                rightContent={
                    <Pressable onPress={() => { navigation.navigate('ProfileDetail'); console.log('clicked') }}>
                        <FontAwesome5 name="user-circle" size={28} color="black" />
                    </Pressable>
                }
            />
            <View style={{ marginTop: 10, paddingHorizontal: 25, paddingBottom: 10, borderBottomWidth: 1, borderColor: 'rgb(203 213 225)' }}>
                <TextInput style={{ backgroundColor: "white", borderWidth: 2, borderColor: 'rgb(203 213 225)', padding: 10, borderRadius: 15 }} />
            </View>
            <ScrollView style={{ paddingHorizontal: 25 }}>
                <View style={{ marginTop: 10, gap: 10 }}>
                    <FoodCard />
                    <FoodCard />
                    <FoodCard />
                    <FoodCard />
                    <FoodCard />
                    <FoodCard />
                    <FoodCard />
                    <FoodCard />
                    <FoodCard />
                    <FoodCard />
                </View>

                {/* Margin Bottom */}
                <View style={{ height: 35 }} />
            </ScrollView >
            <BottomComponent />
        </View >
    )
}