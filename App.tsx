import { StatusBar } from 'expo-status-bar';
import {useState,useRef} from"react"
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import DraggableFlatList , {ScaleDecorator, ShadowDecorator, OpacityDecorator, useOnCellActiveAnimation} from "react-native-draggable-flatlist"

import Animated from 'react-native-reanimated'

export default function App() {
  const ref = useRef(null)
  const [data, setData] = useState([
    {
      key:'1',
      label:"Evandro oliveira",
      height: 100,
      backgroundColor:"#121212"
    },
    {
      key:'2',
      label:"Ana carolina",
      height: 100,
      backgroundColor:"#124512"
    },
    {
      key:'3',
      label:"Israel oliveira",
      height: 100,
      backgroundColor:"#270a48"
    },
    {
      key:'4',
      label:"Maria oliveira",
      height: 100,
      backgroundColor:"#a70505"
    },
  ])

  interface RenderItemProps {
    item: {
      height: number;
      backgroundColor: string;
      label: string;
      
    };
    drag: any; 
  }

  const renderItem = ({ item, drag }: RenderItemProps) => {
    const {isActive} = useOnCellActiveAnimation();
    return (
      <ScaleDecorator>
        <OpacityDecorator activeOpacity={0.5}>
          <ShadowDecorator>
            <TouchableOpacity
              onLongPress={drag}
              activeOpacity={1}
              style={[
                  styles.rowItem,
                  {
                    height: item.height,
                    backgroundColor: item.backgroundColor,
                    elevation: isActive ? 30 : 0,
                  }
              ]}
  
            >
              <Animated.View>
                <Text style={styles.text}>{item.label}</Text>
              </Animated.View>
            </TouchableOpacity>
          </ShadowDecorator>
        </OpacityDecorator>
      </ScaleDecorator>
    );
  }
  

  return (
    <GestureHandlerRootView>
      <DraggableFlatList 
        ref={ref}
        data={data}
        renderItem={renderItem}
        onDragEnd={({data}) => setData(data)}
        keyExtractor={(item) => item.key}
      />
    </GestureHandlerRootView>
     
  );
}

const styles = StyleSheet.create({
  rowItem:{
    alignItems:"center",
    justifyContent:"center"
  },
  text:{
    fontSize:24, 
    fontWeight:"bold",
    color:"#fff"
  }
});
