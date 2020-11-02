# react-native-swiper-x
一个简单的轮播组件

| Prop              |         Type       |   Default    | Description                                                                |
| :---------------- | :---------------------: | :-------: | :------------------------------------------------------------------------- |
| `wrapperStyle`    | `style`            |              | 轮播组件的样式 |
| `showButtons`     | `bool`             | `true`       | 显示左右操作按钮 |
| `prevButton`      | `element`          | <Text style={styles.operateIcon}>{'＞'}</Text> | 重新定义`上一个`的按钮 |
| `nextButton`      | `element`          | <Text style={styles.operateIcon}>{'＜'}</Text> | 重新定义`下一个`的按钮 |
| `showPagination`  | `bool`             | `true`       | 显示分页按钮 |
| `renderPagination`| `element`          |<View style={styles.dotWrapper}><TouchableOpacity onPress={()=>this.scrollTo(i)} key={i}><View style={[styles.dot,dotStyle,index==i?active:null]}></View></TouchableOpacity>)</View>             | 可以自己定义分页，样式需自己写   |
| `dotStyle`        | `style`             | -           | 分页按钮的样式 |
| `activeDotStyle`  | `style`             | -           | 当前页按钮的样式 |
| `onChange`        | `function`          | -           | 切换时候的回调，会传入新的序号 |


## 简单使用
```js
import Swiper from 'react-native-swiper';
//...
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

const styles = StyleSheet.create({
    item:{
        width: Dimensions.get('window').width,
        height: 300,
        lineHeight: 100,
        fontSize: 30,
        color: '#fff',
        textAlign: 'center'
    }
})
```
## 效果展示
![效果展示](https://www.eyes487.top/fs/uploads/6ab7ed1067416a63b04a6ff536df264c.gif "图1")
