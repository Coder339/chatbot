import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AnimatedDotsCarousel from 'react-native-animated-dots-carousel';

export default function PaginationDots(props:any) {
    const {activeIndex,LENGTH} = props
    return (
        <AnimatedDotsCarousel
            // verticalOrientation={true}
            length={LENGTH}
            currentIndex={activeIndex}
            maxIndicators={2}
            interpolateOpacityAndColor={true}
            activeIndicatorConfig={{
            color: 'black',
            margin: 3,
            opacity: 1,
            size: 8,
            }}
            inactiveIndicatorConfig={{
            color: 'gray',
            margin: 3,
            opacity: 0.5,
            size: 8,
            }}
            decreasingDots={[
            {
                config: { color: 'gray', margin: 3, opacity: 0.5, size: 7 },
                quantity: 1,
            },
            {
                config: { color: 'gray', margin: 3, opacity: 0.5, size: 6 },
                quantity: 1,
            },
            ]}
        />
    )
}

const styles = StyleSheet.create({})