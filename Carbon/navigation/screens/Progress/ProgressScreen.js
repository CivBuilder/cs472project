import * as React from 'react';
import { View, SafeAreaView, ScrollView, Dimensions, StyleSheet, Text, Platform } from 'react-native';
import { Colors } from '../../../styling/Colors';
import { CategoryBreakdown } from './CategoryBreakdown';
import RecordEmission from './RecordEmission';
import Log from '../Progress/Log';
import { Section } from '../../../components/Section';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const margin = 12;

export default function ProgressScreen({ navigation }) {
  return (
    <SafeAreaView style={{ backgroundColor: '#F7FCF8', height: '100%' }}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 1 }}
      >
        {/* Category Breakdown */}
        <Section title="Category Breakdown">
          <CategoryBreakdown navigation={navigation} />
        </Section>

        {/* Log -- Will update styling and other things for this component soon :) */}
        <View style={styles.container}>
          <View style={{ backgroundColor: "white", borderRadius: 16, height: windowHeight / 2, padding: 10 }}>
            <Log></Log>
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
        shadowOffset: { width: 5, height: 5 },
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
  button: {
    backgroundColor: Colors.primary.MINT,
    height: 40,
    width: 105,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  buttonText: {
    color: Colors.primary.MINT_CREAM,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
