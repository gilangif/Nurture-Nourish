import { Image, ScrollView, Text, View } from 'react-native'
import HeaderComponent from '../components/HeaderComponent'
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import FoodCategoryCard from '../components/FoodCategoryCard';

export default function FoodCategoryScreen() {
    const navigation = useNavigation()

    return (
        <View style={{ backgroundColor: "white", flex: 1 }}>
            <HeaderComponent
                leftContent={
                    <>
                        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20, marginBottom: -4 }}>
                            Kategori
                        </Text>
                        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20, marginBottom: -4 }}>
                            Makanan & Nutrisi
                        </Text>
                    </>}
                rightContent={<><FontAwesome5 name="user-circle" size={28} color="black" /></>}
            />
            <ScrollView style={{ paddingHorizontal: 25 }}>
                <View style={{ marginTop: 10, flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", gap: 14 }}>
                    <FoodCategoryCard name={'Biji-bijian'} imgUrl={require("../images/seeds.png")} />
                    <FoodCategoryCard name={'Sayuran'} imgUrl={require("../images/fiber.png")} />
                    <FoodCategoryCard name={'Kacang-kacangan'} imgUrl={require("../images/nuts.png")} />
                    <FoodCategoryCard name={'Olahan Susu'} imgUrl={require("../images/cheese.png")} />
                    <FoodCategoryCard name={'Bumbu'} imgUrl={require("../images/spice.png")} />
                    <FoodCategoryCard name={'Olahan'} imgUrl={require("../images/sausage.png")} />
                    <FoodCategoryCard name={'Herbal'} imgUrl={require("../images/herbal.png")} />
                    <FoodCategoryCard name={'Buah'} imgUrl={require("../images/fruit.png")} />
                    <FoodCategoryCard name={'Cemilan'} imgUrl={require("../images/tacos.png")} />
                    <FoodCategoryCard name={'Laut'} imgUrl={require("../images/seafood.png")} />
                    <FoodCategoryCard name={'Daging'} imgUrl={require("../images/meat.png")} />
                    <FoodCategoryCard name={'Minuman'} imgUrl={require("../images/drink.png")} />
                </View>

                {/* Margin Bottom */}
                <View style={{ height: 35 }} />
            </ScrollView >
        </View >
    )
}