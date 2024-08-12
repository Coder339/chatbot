import { Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { globalStyles } from "../styles/globalStyles";
import Animated, { FadeIn, FadeInLeft } from "react-native-reanimated";

const DonutChart = () => {
    const pieData = [
        {
            value: 47,
            color: '#009FFF',
            gradientCenterColor: '#006DFF',
            focused: true,
        },
        { value: 40, color: '#93FCF8', gradientCenterColor: '#3BE9DE' },
        { value: 16, color: '#FF5733', gradientCenterColor: '#FF5733' }
    ];

    const renderDot = (color: string) => {
        return (
            <View
                style={{
                    height: 10,
                    width: 10,
                    borderRadius: 5,
                    backgroundColor: color,
                    marginRight: 10,
                }}
            />
        );
    };

    const renderLegendComponent = () => {
        return (
            <>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 10,
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: 120,
                            marginRight: 20,
                        }}>
                        {renderDot('#006DFF')}
                        <Text style={{ color: 'white' }}>Excellent: 47%</Text>
                    </View>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
                        {renderDot('#8F80F3')}
                        <Text style={{ color: 'white' }}>Okay: 16%</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: 120,
                            marginRight: 20,
                        }}>
                        {renderDot('#3BE9DE')}
                        <Text style={{ color: 'white' }}>Good: 40%</Text>
                    </View>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
                        {renderDot('#FF7F97')}
                        <Text style={{ color: 'white' }}>Poor: 3%</Text>
                    </View>
                </View>
            </>
        );
    };

    return (

        <View style={{ marginTop: 20, alignItems: 'center' }}>
            <PieChart
                data={pieData}
                donut
                showGradient
                sectionAutoFocus
                radius={70}
                innerRadius={40}
                innerCircleColor={'#232B5D'}
                centerLabelComponent={() => {
                    return (
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Animated.Text
                                entering={FadeInLeft.delay(300).duration(1500)}
                                style={{ ...globalStyles.boldLargeText, fontSize: 20, color: '#fff' }}>
                                47%
                            </Animated.Text>
                            <Animated.Text
                                entering={FadeIn.delay(300).duration(2500)}
                                style={{ ...globalStyles.regularLargeText, color: '#fff' }}>Excellent</Animated.Text>
                        </View>
                    );
                }}
            />
        </View>

    );
}

export default DonutChart