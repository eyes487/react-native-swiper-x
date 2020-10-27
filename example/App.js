/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,Dimensions
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Swiper from 'react-native-swiper-x';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Swiper 
              // wrapperStyle={styles.wrapper} 
              // showButtons={false}
              // nextButton={<Text style={{marginRight: 10}}>next</Text>}
              // prevButton={<Text style={{marginLeft: 10}}>prev</Text>}
              // showPagination={false}
              // renderPagination={<View style={{position:'absolute',bottom: 20,zIndex: 100,width:'100%'}}><Text style={{textAlign:'center'}}>第n页</Text></View>}
              // dotStyle={{width: 30}}
              // activeDotStyle={{backgroundColor: 'yellow'}}

          >
              <Text style={[styles.item,{backgroundColor: '#f44336'}]}>1</Text>
              <Text style={[styles.item,{backgroundColor: '#bd9212'}]}>2</Text>
              <Text style={[styles.item,{backgroundColor: '#4caf50'}]}>3</Text>
          </Swiper>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  wrapper:{
    // backgroundColor: 'rgba(0,0,0,.1)',
  },
  item:{
    width: Dimensions.get('window').width,
    height: 300,
    lineHeight: 100,
    fontSize: 30,
    color: '#fff',
    textAlign: 'center'
  }
});

export default App;
