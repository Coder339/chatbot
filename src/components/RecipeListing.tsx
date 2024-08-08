import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RectangleSkeltonLoader from './skeltonLoaders/RectangleSkeltonLoader'
import RecipeItem from './items/recipeItem'
import { SCREEN_HEIGHT, globalStyles } from '../styles/globalStyles'

interface DataProps {
    data: any,
    navigation: any,
    contentContainerStyle?: object,
    handleLike?: (item: object) => void,
    handleDislike: (item: object) => void,
    isHome?: boolean,
    loading?: boolean
}

export default function RecipeListing({ data, navigation, contentContainerStyle, handleLike, handleDislike, isHome, loading }: DataProps) {
    const _listEmptyComponent = () => {
        return (
            <View style={{ marginTop: SCREEN_HEIGHT / 5, alignItems: 'center' }}>
                <Text style={{ ...globalStyles.boldLargeText, fontSize: 20 }}>Search Recipe</Text>
            </View>
        )
    }
    return (
        <>
            <FlatList
                data={loading ? [1, 2, 3, 4, 5, 6] : data}
                scrollEnabled={!loading}
                renderItem={({ item, index }) =>
                    loading ?
                        <RectangleSkeltonLoader />
                        :
                        <RecipeItem
                            item={item}
                            index={index}
                            navigation={navigation}
                            handleLike={handleLike}
                            handleDislike={handleDislike}
                            isHome={isHome}
                        />
                }
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                style={{ marginHorizontal: loading ? 8 : 4, flex: 1 }}
                contentContainerStyle={contentContainerStyle}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={_listEmptyComponent}
            />
        </>
    )
}

const styles = StyleSheet.create({})