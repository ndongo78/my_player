import { StyleSheet} from 'react-native';
import { NavigationContainer , DefaultTheme} from '@react-navigation/native';
import MyTabs from "./src/navigators/BottomNavigation";
import AudioProvider from "./src/store/AudioProvider";
import HomeStack from "./src/navigators/HomeStack";
export default function App() {
  const navTheme = DefaultTheme;
//  navTheme.colors.background = '#212433';
  navTheme.colors.background = '#050A30';
    navTheme.colors.text='#C0C0C0'
    navTheme.colors.primary='#FFD700'
    navTheme.colors.secondary='#F5F5F5'

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
