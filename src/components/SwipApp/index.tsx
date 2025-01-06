import { useCallback, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import FontAwesome5 from '@expo/vector-icons/Ionicons';

const STRINGS_ARRAY = [
  '🛒 Buy groceries',
  '📚 Read 20 pages of a book',
  '🏋️‍♂️ Hit the gym',
  '🍳 Cook dinner',
  '🎸 Practice guitar',
];

const MAPPED_STRINGS = STRINGS_ARRAY.map((str, index) => ({ str, index }));

const WIDTH_CARD = Dimensions.get('window').width * 0.85;
const ITEM_HEIGHT = 70;
const WIDTH_SCREEN = Dimensions.get('window').width;

const SHADOW = {
  shadowColor: 'black',
  shadowOffset: {
    width: 0,
    height: 10,
  },
  shadowOpacity: 0.5,
  shadowRadius: 5,
};

interface IMappedStrings {
  str: string;
  index: number;
}

const SwipeApp = () => {
  const [exampleArray, setExampleArray] = useState<IMappedStrings[]>(MAPPED_STRINGS);

  const handleRemoveCard = useCallback((title: IMappedStrings) => {
    setExampleArray((prev) => {
      console.log({ prev, title });
      return prev.filter((item) => item.index !== title.index);
    });
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.viewContainer}>
        {exampleArray.map((title) => (
          <FieldSwipe key={title.index} title={title} onRemove={handleRemoveCard} />
        ))}
      </View>
    </GestureHandlerRootView>
  );
};

export default SwipeApp;

interface IFieldSwipe {
  title: IMappedStrings;
  onRemove: (title: IMappedStrings) => void;
}

const FieldSwipe: React.FC<IFieldSwipe> = ({ title, onRemove }) => {
  const swipeTranslateX = useSharedValue(0);
  const pressed = useSharedValue(false);
  const itemHeight = useSharedValue(ITEM_HEIGHT);
  const marginVertical = useSharedValue(20);

  const pan = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
    })
    .onChange((event) => {
      if (event.translationX < 0) {
        swipeTranslateX.value = event.translationX;
      }
    })
    .onFinalize(() => {
      const isShouldDismiss = swipeTranslateX.value < -WIDTH_SCREEN * 0.3;
      if (isShouldDismiss) {
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        swipeTranslateX.value = withTiming(-WIDTH_SCREEN, undefined, (isDone) => {
          if (isDone) {
            runOnJS(onRemove)(title);
          }
        });
      } else {
        swipeTranslateX.value = withSpring(0);
      }
      pressed.value = false;
    });

  const transformStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: swipeTranslateX.value },
      { scale: withTiming(pressed.value ? 1.15 : 1) },
    ],
  }));

  const opacityStyle = useAnimatedStyle(() => ({
    opacity: swipeTranslateX.value < -WIDTH_SCREEN * 0.7 ? 0 : 1,
  }));

  const itemHeightStyle = useAnimatedStyle(() => ({
    height: itemHeight.value,
    marginVertical: marginVertical.value,
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={itemHeightStyle}>
        <Animated.View style={[styles.iconContainer, opacityStyle]}>
          <FontAwesome5 name="trash" size={25} color="#FF165D" />
        </Animated.View>
        <Animated.View style={[styles.fieldContainer, transformStyle]}>
          <Text style={styles.text}>{title.str}</Text>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {},
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  headerText: {
    color: '#FF6B35',
    fontSize: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  containerHeaderText: {
    ...SHADOW,
    width: WIDTH_SCREEN,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A8E6CF',
    borderBottomColor: '#FF6B35',
    borderBottomWidth: 1,
    paddingVertical: 30,
  },
  fieldContainer: {
    backgroundColor: '#FF165D',
    justifyContent: 'center',
    width: WIDTH_CARD,
    height: ITEM_HEIGHT,
    alignItems: 'center',
    borderRadius: 20,
    ...SHADOW,
  },
  iconContainer: {
    position: 'absolute',
    height: ITEM_HEIGHT,
    right: '10%',
    justifyContent: 'center',
  },
  viewContainer: {
    alignItems: 'center',
    width: WIDTH_SCREEN,
  },
});
