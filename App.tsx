import { StyleSheet} from 'react-native';
import { NavigationContainer , DefaultTheme} from '@react-navigation/native';
import MyTabs from "./src/navigators/BottomNavigation";
import AudioProvider from "./src/store/AudioProvider";
export default function App() {
  const navTheme = DefaultTheme;
  navTheme.colors.background = '#212433';

  return (
      <AudioProvider>
        <NavigationContainer theme={navTheme}>
          <MyTabs />

        </NavigationContainer>
      </AudioProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
