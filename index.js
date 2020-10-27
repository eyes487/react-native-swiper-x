/**  
 * 轮播图
 */

import React, { Component, Fragment } from 'react';
import { View,Text, StyleSheet,Animated ,PanResponder,TouchableOpacity,Dimensions} from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';

class Swiper extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            positionAnimated: new Animated.Value(0),
            index: 0,
            layoutWidth: Dimensions.get('window').width
         };
    }
    componentDidMount(){
        this.state.positionAnimated.addListener(({value}) => {
            this.position = value
        })
    }
    onChange=(idx)=>{
        const {index} = this.state
        const {children, onChange} = this.props;

        let newIdx = index+idx
        if(newIdx<0 || newIdx>=children.length){
            return false
        }
        this.scrollTo(newIdx)
    }
    onPanResponderEnd = () => {
        // 超过 50% 的距离，触发左滑、右滑
        const index = Math.round(-this.position / this.state.layoutWidth)
        const safeIndex = this.getSafeIndex(index);
        this.scrollTo(safeIndex)
    };
    responder = PanResponder.create({
        // 返回ture时，表示该组件愿意成为触摸事件的响应者，如触摸点击。默认返回false。
        // onStartShouldSetPanResponder: (evt, gestureState) => true,
        // 返回ture时，表示该组件愿意成为触摸(滑屏)事件的响应者，如触摸滑屏，默认返回false。
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onShouldBlockNativeResponder: (evt, gestureState) => {
            // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
            // 默认返回true。目前暂时只支持android。
            return true;
        },
        //当其它组件需要响应手势时，此时为ture则表示本组件愿意放权给其它组件响应；为false时表示不放权，依然由本组件来响应手势事件
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        //手势刚开始触摸(即刚接触屏幕时)时，若响应成功则触发该事件
        onPanResponderGrant: (evt, gestureState) => {
            // 用户手指触碰屏幕，停止动画
            this.state.positionAnimated.stopAnimation();
            // 记录手势响应时的位置
            this.startPosition = this.position;
        },
        //手势滑动时触发该事件
        onPanResponderMove: (evt, { dx }) => {
            // 要变化的位置 = 手势响应时的位置 + 移动的距离
            const position = this.startPosition + dx
            this.state.positionAnimated.setValue(position)
        },
        // 手势松开时触发该事件
        onPanResponderRelease: this.onPanResponderEnd,
        //当组件响应放权后(即由其它组件拿到了手势响应权)触发该事件
        onPanResponderTerminate: this.onPanResponderEnd,
    });
    
    scrollTo = ( toIndex ) => {
        const {onChange} = this.props;
        Animated.timing(this.state.positionAnimated, {
            toValue: - toIndex * this.state.layoutWidth,
            duration: 200,
            useNativeDriver: false
        }).start(()=>{
            this.setState({
                index: toIndex
            })
            if(onChange) onChange(toIndex)
        })
    }

    getSafeIndex = (index) => {
        const max = this.props.children.length - 1;
        const min = 0;

        return Math.min(max, Math.max(index, min))
    }


    handleLayout = ({nativeEvent}) => {
        this.setState({
            layoutWidth: nativeEvent.layout.width,
        })
        
        this.state.positionAnimated.setValue( - this.state.index * nativeEvent.layout.width)
    }
    render(){
        const {children, wrapperStyle, showButtons=true, nextButton, prevButton, showPagination=true, renderPagination, dotStyle, activeDotStyle} = this.props;
        const {index} = this.state

        const len = new Array(children.length).fill(1) || []
        const active = activeDotStyle || styles.active
        return (
                <View 
                    style={[styles.wrapper,wrapperStyle]}
                    onLayout={this.handleLayout}
                    {...this.responder.panHandlers}
                >
                    {showButtons?<Fragment>
                        <TouchableOpacity onPress={()=>this.onChange(-1)} style={styles.prevIcon}>
                            {prevButton||<Text style={styles.operateIcon}>{'＜'}</Text>}
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.onChange(1)} style={styles.nextIcon}>
                            {nextButton||<Text style={styles.operateIcon}>{'＞'}</Text>}
                        </TouchableOpacity>
                    </Fragment>:null}
                    {
                        showPagination?
                        renderPagination?renderPagination
                        :<View style={styles.dotWrapper}>
                        {
                            len.map((v,i)=><TouchableOpacity onPress={()=>this.scrollTo(i)} key={i}>
                                <View style={[styles.dot,dotStyle,index==i?active:null]}></View>
                            </TouchableOpacity>)
                        }
                        </View>:null
                    }
                    <Animated.View
                        style={[
                        styles.content,
                        {
                            // transform: [{
                            //     translateX:  this.state.positionAnimated,
                            // }],
                            //transform会有一些问题，改用marginLeft
                            marginLeft: this.state.positionAnimated
                        }
                        ]}
                    >
                        <View style={[styles.content]}>
                            {children}
                        </View>
                    </Animated.View>
                </View>
        )
    }
}
const styles = StyleSheet.create({
    wrapper:{
        position:'relative'
    },
    content:{
        flexDirection: 'row',
        justifyContent:'flex-start',
    },
    operateIcon:{
        width: 40,
        height: 60,
        fontSize: 26,
        color: '#fff',
        margin: 5,
        fontWeight: "600",
        textAlign:'center',
        lineHeight: 60,
        backgroundColor: 'rgba(0,0,0,.3)',
    },
    prevIcon:{
        position: 'absolute',
        top: '45%',
        zIndex: 999,
        left: -10,
    },
    nextIcon:{
        position: 'absolute',
        top: '45%',
        zIndex: 999,
        right: -10,
    },
    title:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center'
    },
    tip:{
        fontSize: 20,
        color: '#fff',
        lineHeight: 50,
        textAlign: 'center'
    },
    dotWrapper:{
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        zIndex: 100
    },
    dot:{
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#d0d0d0',
        marginRight: 10
    },
    active:{
        backgroundColor:'#03a9f4'
    }
  });
export default Swiper;