import * as Font from 'expo-font'

export default useFonts = async () => await Font.loadAsync({
    robotoRegular: require('../assets/fonts/Roboto-Regular.ttf'),
    robotoMedium: require('../assets/fonts/Roboto-Medium.ttf'),
    robotoBold: require('../assets/fonts/Roboto-Bold.ttf')
})