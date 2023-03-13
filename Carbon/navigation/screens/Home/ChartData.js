import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart} from "react-native-chart-kit";
import { VictoryChart, VictoryLine, VictoryScatter, VictoryArea, VictoryPie, VictoryLabel, VictoryAnimation } from 'victory-native';
import { Svg } from 'react-native-svg';
import { Colors } from '../../../colors/Colors';
import { Ionicons } from '@expo/vector-icons';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const margin = 10;
const chartWidth = windowWidth - (margin * 2);
const chartHeight = 210;

export const CarbonFootprint = () => {
    const userFootprint = Math.round(Math.random() * 100000);
    const maxFootprint = 100000;

    const startData=[{x: 'total', y: maxFootprint}, {x:'user', y: 0}]
    const endData=[{x: 'total', y: maxFootprint - userFootprint}, {x:'user', y: userFootprint}]

    const pieColors = [
        "lightgray",
        Colors.primary.MINT,
    ];

    const [graphicData, setGraphicData] = useState(startData);
    const [labelValue, setLabelValue] = useState(0);

    useEffect(() => {
        setGraphicData(endData);
    }, []);

    const updateLabelValue = (newValue) => {
        const easing = (t) => Math.pow(2, 10 * (5 - 1)) + 1;
        setLabelValue(easing(newValue));
    };

    return (
        <View>
            <Svg height={chartHeight} width={chartWidth}>
                <VictoryPie
                    data={endData}
                    labels={[]}
                    colorScale={pieColors}
                    startAngle={90}
                    endAngle={-90}
                    innerRadius={120}
                    padding={{
                        top: -40,
                        bottom: 0,
                        left: 30,
                        right: 30 + 20, //There is a 20px offset between left and right
                    }}
                    animate={{
                        duration: 2000,
                        easing: 'exp'
                    }}
                />
                <VictoryAnimation
                    data={{ value: endData[1].y }}
                    duration={2000}
                    easing="exp"
                    onEnd={() => updateLabelValue(endData[1].y)}
                >
                    {(animatedData) => (
                        <VictoryLabel
                        textAnchor="middle"
                        style={{ fontSize: 40, fontWeight: 'bold' }}
                        x={chartWidth / 2}
                        y={135}
                        text={`${Math.round(animatedData.value)}`}
                        />
                    )}
                </VictoryAnimation>
                <VictoryLabel
                    textAnchor="middle"
                    style={{ fontSize: 20 }}
                    x={chartWidth/2}
                    y={165}
                    text={`kg CO2e`}
                />
            </Svg>
        </View>
    );
};

export const LineChartFootprint = () => {
    const lineChartData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [{
            // TODO: Change hardcode data
            data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100
            ]
        }]
    };

    return(
        <LineChart
            data={lineChartData}
            width={chartWidth}
            height={chartHeight}
            //yAxisLabel=""
            yAxisSuffix=" lb"
            yAxisInterval={1}
            chartConfig={styles.chartConfig}
            style={{...styles.chart, marginRight: 20}}
            bezier
        />
    );
};

export const LineChartFootprintv2 = () => {
    const data = [
        { x: "Jan", y: Math.random() * 10000 },
        { x: "Feb", y: Math.random() * 10000 },
        { x: "Mar", y: Math.random() * 10000 },
        { x: "Apr", y: Math.random() * 10000 },
        { x: "May", y: Math.random() * 10000 },
        { x: "Jun", y: Math.random() * 10000 },
    ];

    return(
        <VictoryChart
            width={chartWidth}
            height={chartHeight}
            style={{backgroundColor: Colors.primary.MINT}}
        >
            {/* <VictoryLine
                data={data}
                interpolation="basis"
            /> */}
            {/* <VictoryScatter
                data={data}
                size={5} // adjust the size of the dots as needed
                style={{
                    data: {
                        fill: "white",
                        stroke: Colors.primary.MINT,
                        strokeWidth: 2
                    },
                    // add other dot styles as needed
                }}
                interpolation="basis"
            /> */}
            <VictoryArea
                data={data}
                interpolation="basis"
                style={{
                    opacity: 0.7
                }}
            />
        </VictoryChart>
    );
};

// Ticket C4-19
export const CategoryChart = () => {
    //TODO: Change hardcoded values to link with back end
    const data = [
        {
            name: 'Transport',
            carbonFootprint: 4000,
            color: '#C70039',
            legendFontColor: Colors.primary.MINT_CREAM,
            legendFontSize: 12,
        },
        {
            name: 'Diet',
            carbonFootprint: 6000,
            color: '#FF5733',
            legendFontColor: Colors.primary.MINT_CREAM,
            legendFontSize: 12,
        },
        {
            name: 'Home',
            carbonFootprint: 8000,
            color: '#FFC300',
            legendFontColor: Colors.primary.MINT_CREAM,
            legendFontSize: 12,
        },
        {
            name: 'Stuff',
            carbonFootprint: 5000,
            color: '#DAF7A6',
            legendFontColor: Colors.primary.MINT_CREAM,
            legendFontSize: 12,
        },
    ];

    const chartConfig = {
        backgroundColor: Colors.primary.MINT,
        backgroundGradientFrom: Colors.primary.MINT,
        backgroundGradientTo: Colors.primary.MINT,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    };

    return (
        <PieChart
            data={data}
            width={chartWidth}
            height={chartHeight}
            chartConfig={chartConfig}
            accessor={'carbonFootprint'}
            paddingLeft={'30'}
            absolute
            renderLegend={() => null}
            renderLabels={({ category, percentage, index }) => (
                <Text key={index} style={{ color: 'white', position: 'absolute', textAlign: 'center' }}>
                    {category} {'\n'} ({percentage.toFixed(0)}%)
                </Text>
            )}
        />
    );
};

export const CatgegoryChartv2 = () => {
    const data = [
        { x: 'Transport', y: Math.random() * 10000 },
        { x: 'Diet', y: Math.random() * 10000 },
        { x: 'Home', y: Math.random() * 10000 },
        { x: 'Stuff', y: Math.random() * 10000 },
    ];

    const sortedData = data.sort((a, b) => a.y - b.y); // sort data in ascending order

    // Converts each data.y to percentage to display inside the pie chart
    const getLabelPercent = (datum) => {
        const percent = (
          (datum.y / data.reduce((acc, curr) => acc + curr.y, 0)) * 100
        ).toFixed(1);
        return `${Math.round(percent)}%`;
    };

    const pieColors = [ Colors.secondary.DARK_MINT, '#FFC300', '#FF5733', '#C70039' ];

    const pieRadius = windowWidth / 3;
    const innerRadius = pieRadius * 0.6;
    const labelRadius = innerRadius + ((pieRadius - innerRadius) / 2);

    return (
        <View style={{marginHorizontal: -10}}>
            <Svg height={(pieRadius * 2) + (margin * 2)}>
                <VictoryPie
                    data={sortedData}
                    colorScale={pieColors}
                    labels={({ datum }) => getLabelPercent(datum)}
                    labelRadius={labelRadius}   // Distance of the labels from the pie center\
                    padAngle={2}                // The gap between each slice
                    radius={pieRadius}
                    innerRadius={innerRadius}   // Size of the hole in the center
                    cornerRadius={6}
                    style={{
                        labels: {
                            fill: Colors.primary.MINT_CREAM,
                            fontSize: 14,
                            fontWeight: 'bold',
                            textAnchor: 'middle',
                            verticalAnchor: 'middle',
                        },
                    }}
                    padding={{
                        top: -110, // bottom: 10, // left: 10,= // right: 10,
                    }}
                />
                <VictoryLabel
                    textAnchor="middle"
                    style={{ fontSize: 32}}
                    x={pieRadius * 1.5}
                    y={pieRadius + margin}
                    text={`Hello`}
                />
            </Svg>
        </View>
    );
};

export function DailyLog ({dataArray}) {


    const barChartData = {
        labels: ['Transportation', 'Diet', 'Lifestyle', 'Home', 'Overall'],
        datasets:[
            {
            data: dataArray,
            colors: [
                (opacity = 1) =>  Colors.primary.MINT,
                (opacity = 1) =>  Colors.primary.MINT,
                (opacity = 1) =>  Colors.primary.MINT,
                (opacity = 1) =>  Colors.primary.MINT,
                (opacity = 1) =>  Colors.primary.MINT,
            ]
            }
        ]
        };
    return (
        <BarChart
        data ={barChartData}
        chartConfig={styleBar.chartConfig}
        withCustomBarColorFromData={true}
        flatColor={true}
        style={styleBar.chart}
        width = {chartWidth}
        height = {windowHeight/3}
        withVerticalLabels ={true}
        withHorizontalLabels = {true}
        fromZero = {true}
    />
    )
}

const styles = StyleSheet.create({
    chart: {
        borderRadius: 16,
    },
    chartConfig: {
        backgroundColor: Colors.primary.MINT,
        backgroundGradientFrom: Colors.primary.MINT,
        backgroundGradientTo: Colors.primary.MINT,
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        propsForDots: {
            r: "5",                         // circle size
            strokeWidth: "2",               // circle border size
            stroke: Colors.primary.MINT     // circle border color
        }
    },
});

// Jira Ticket C4-20
export const BestWorstCategories = () => {
  // Change hard-coded values to real data from backend.
  const data = [
    { category: 'Transportation', emission: 4000 },
    { category: 'Diet', emission: 6000 },
    { category: 'Home', emission: 5000 },
    { category: 'Lifestyle', emission: 8000 },
  ];

  // Temporary value to determine if a category has too much emission and needs focusing (for the user).
  function categorize(emission) {
    return (emission >= 5000) ? (<Ionicons name={'alert-circle'} size={16} color={'#FF6961'} style={{width: 20}} />) : (<Text style={{width: 20}}></Text>);
  }

  return (
    <View style={styleBar.keyFactors}>
      {data.map(entry => (
        <View key={entry.category} style={styleBar.category}>
          {categorize(entry.emission)}
          <Text style={{flex: 1, marginLeft: 5}}>{entry.category}</Text>
          <Text>{entry.emission}</Text>
        </View>
      ))}
    </View>
  );
};

const styleBar = StyleSheet.create({
    container: {
        marginLeft: 100,
        flex: 1,
        justifyContent: 'center', padding: 100,
        paddingTop: 30, backgroundColor: '#ecf0f1',
        },
    chart: {
        borderRadius: 16,
        marginHorizontal: margin/2,
    },
    chartConfig: {

        backgroundColor: '#FFFFFF',
        backgroundGradientFrom: '#FFFFFF',
        backgroundGradientTo: '#FFFFFF',
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, //transparent
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,

        propsForDots: {
            r: "5",                         // circle size
            strokeWidth: "2",               // circle border size
            stroke: Colors.primary.MINT     // circle border color
        }
    },
    keyFactors: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: margin,
      marginVertical: margin-5
    },
    category: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'nowrap',
      marginVertical: 5
    },
});