import * as React from 'react';
import { View, SafeAreaView, ScrollView, Dimensions, StyleSheet, Text } from 'react-native';
import { Colors } from '../../../colors/Colors';
import { LineChartFootprint, CatgegoryChartv2, BestWorstCategories } from '../Home/ChartData';
import RecordEmission from './RecordEmission';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const margin = 10;

export default function ProgressScreen() {
    return(
        <SafeAreaView>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                style={{flexGrow: 1}}
            >
                <RecordEmission />


                {/* Chart #1 */}
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>By Time</Text>
                    </View>
                    <View style={styles.chart}>
                        <LineChartFootprint/>
                    </View>
                </View>

                {/* Chart #2 */}
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>By Category</Text>
                    </View>
                    <View style={styles.chart}>
                        <CatgegoryChartv2/>
                    </View>
                </View>

                {/* Chart #3 */}
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Key Factors</Text>
                    </View>
                    <View style={styles.chart}>
                        <BestWorstCategories/>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: margin,
        backgroundColor: "white",
        borderRadius: 16,
        ...Platform.select({
            ios: {
                shadowColor: Colors.primary.RAISIN_BLACK,
                shadowOffset: {width: 5, height: 5},
                shadowOpacity: 0.125,
                shadowRadius: 2.5,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        margin: margin,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    chart: {
        margin: margin,
    },
});