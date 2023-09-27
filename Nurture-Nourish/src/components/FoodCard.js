import { AntDesign, FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, Pressable, Text, View } from 'react-native'

export default function FoodCard() {
    const navigation = useNavigation()
    const food = {
        "id": 487,
        "food_key": "bacang",
        "name": "Bacang",
        "category_id": 1,
        "key": "whole_grains",
        "category_name": "Biji-bijian",
        "image": "https://static.cdntap.com/groups-tap/food/food_list/images/bacang1548758121.jpg?quality=90&height=600&width=800",
        "thumbnail_big": "https://static.cdntap.com/groups-tap/food/food_list/images/bacang1548758121.jpg?quality=90&height=150&width=200",
        "nutrition": "Sodium, Kalium, Vitamin A, Vitamin B12, Vitamin B6, Vitamin, C, Vitamin D, Vitamin E, Kalsium, Tembaga, Folat, Besi, Magnesium, Mangan, Niacin, Asam Pantotenat, Fosfor, Riboflavin, Selenium, Thiamin, dan Seng ",
        "thumbnail": "https://static.cdntap.com/groups-tap/food/food_list/images/bacang1548758121.jpg?quality=90&height=80&width=80",
        "share_message": "https://theasianparent.page.link/jSVkHvMLhzmtb2nNA",
        "permissions": [
            {
                "key": "pregnant",
                "name": "Hamil",
                "permission": "little_allowed",
                "description": "Di China ada festival yang selalu dinantikan, yaitu Dragon Boat Festival. Festival ini menyajikan beragam sajian khas, seperti bacang. Bacang bisa meningkatkan nafsu makan karena rasanya lezat. Namun, perhatikan bahwa makanan ini juga tinggi kalori dan rendah serat. Jadi, tidak mudah dicerna. Meskipun bumil bisa menikmatinya, tentu saja perlu dibatasi untuk menghindari gangguan pencernaan dan kenaikan berat badan."
            },
            {
                "key": "afterbirth",
                "name": "Pascamelahirkan",
                "permission": "little_allowed",
                "description": "Setelah melahirkan, Anda tentu saja bisa makan makanan ini. Toh, sebenarnya bacang bisa meringankan gejala, seperti kelemahan fisik dan kelelahan pascamelahirkan. Namun, karena rendah serat, bacang mungkin bisa menggangu proses pencernaan jika dikonsumsi terlalu banyak."
            },
            {
                "key": "breastfeeding",
                "name": "Menyusui",
                "permission": "allowed",
                "description": "Jika Bunda bertanya apakah busui bisa menikmati bacang atau tidak, jawabannya tentu saja boleh! Makanan ini kaya akan nutrisi. Tetapi ingat, jika hanya mengonsumsi bacang saja tanpa makanan lainnya, busui akan berisiko alami sembelit. Untuk menyeimbangkan nutrisi dan tidak mengganggu pencernaan, jangan lupa konsumsi makanan berserat ya!"
            },
            {
                "key": "baby",
                "name": "Bayi",
                "permission": "not_allowed",
                "description": "Bacang tidak cocok untuk bayi usia di bawah 11 tahun."
            }
        ]
    }

    function status(status) {
        if (status == 'not_allowed') {
            return <AntDesign name="closecircle" size={18} color="red" />
        } else if (status == 'little_allowed') {
            return <FontAwesome5 name="exclamation-circle" size={18} color="orange" />
        } else {
            return <FontAwesome name="check-circle" size={20} color="green" />
        }
    }

    return (
        <Pressable
            onPress={() => navigation.navigate('NutritionList')}
            style={{
                backgroundColor: "white", padding: 20, borderRadius: 20, borderWidth: 2,
                borderColor: 'rgb(203 213 225)'
            }}
        >
            <View style={{ flexDirection: "row" }}>
                <View style={{ width: 80, marginRight: 10 }}>
                    <Image resizeMode='contain' style={{ width: '100%', borderRadius: 10, height: undefined, aspectRatio: 1 }} source={{ uri: food.image }} />
                </View>
                <View style={{ flex: 1 }}>
                    <Text numberOfLines={1} style={{ fontFamily: "Poppins-SemiBold", fontSize: 16 }}>
                        {food?.name}
                    </Text>
                    <Text numberOfLines={3} style={{ fontFamily: "Poppins-Medium", fontSize: 13, marginTop: -4, textAlign: "justify" }}>
                        {food?.nutrition}
                    </Text>
                </View>
            </View>
            <View style={{ height: 2, backgroundColor: 'rgb(203 213 225)', marginVertical: 20 }} />
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View>
                    <View style={{ flexDirection: "row", gap: 8 }}>
                        {status(food.permissions[2].permission)}
                        <Text style={{ fontFamily: "Poppins-Medium", fontSize: 15, marginTop: -2 }}>{food.permissions[2].name}</Text>
                    </View>
                    <View style={{ flexDirection: "row", gap: 8 }}>
                        {status(food.permissions[3].permission)}
                        <Text style={{ fontFamily: "Poppins-Medium", fontSize: 15, marginTop: -2 }}>{food.permissions[3].name}</Text>
                    </View>
                </View>
                <View>
                    <View style={{ flexDirection: "row", gap: 8 }}>
                        {status(food.permissions[0].permission)}
                        <Text style={{ fontFamily: "Poppins-Medium", fontSize: 15, marginTop: -2 }}>{food.permissions[0].name}</Text>
                    </View>
                    <View style={{ flexDirection: "row", gap: 8 }}>
                        {status(food.permissions[1].permission)}
                        <Text style={{ fontFamily: "Poppins-Medium", fontSize: 15, marginTop: -2 }}>{food.permissions[1].name}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}
