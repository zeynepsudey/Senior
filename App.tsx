import * as React from "react";
import { SQLiteProvider } from "expo-sqlite/next";
import { ActivityIndicator, Text, View } from "react-native";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Home from "./screens/Home";
import LoginScreen from "./screens/LoginScreen";

import StudentMenu from './screens/student/StudentMenu';
import StudentAppList from './screens/student/StudentAppList';
import StudentAppScreen from './screens/student/StudentAppScreen';

import TeacherMenu from './screens/teacher/TeacherMenu';
import TeacherAppScreen from "./screens/teacher/TeacherAppScreen";
import SelectApp from "./screens/student/SelectApp";

const Stack = createNativeStackNavigator();

const loadDatabase = async () => {
  const dbName = "SeniorApp.db";
  const dbAsset = require("./assets/SeniorApp.db");
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
  if (!fileInfo.exists) {
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`,
      { intermediates: true }
    );
    await FileSystem.downloadAsync(dbUri, dbFilePath);
  }
};

export default function App() {
  const [dbLoaded, setDbLoaded] = React.useState<boolean>(false);

  React.useEffect(() => {
    loadDatabase()
      .then(() => setDbLoaded(true))
      .catch((e) => console.error(e));
  }, []);

  if (!dbLoaded)
    return (
      <View style={{ flex: 1, backgroundColor: "red"}}>
        <ActivityIndicator size={"large"} />
        <Text>Loading Database...</Text>
      </View>
    );
  return (
    <NavigationContainer>
      <React.Suspense
        fallback={
          <View style={{ flex: 1 }}>
            <ActivityIndicator size={"large"} />
            <Text>Loading Database...</Text>
          </View>
        }
      >
        <SQLiteProvider databaseName="SeniorApp.db" useSuspense>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
              }}
            />
            <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />

            <Stack.Screen name="StudentAppList" component={StudentAppList} options={{ title: 'My Appointments' }}/>
            <Stack.Screen name="StudentAppScreen" component={StudentAppScreen} options={{ title: 'Get Appointment' }}/>
            <Stack.Screen name="StudentMenu" component={StudentMenu} options={{ title: 'Menu' }}/>
            <Stack.Screen name="SelectApp" component={SelectApp} options={{ title: 'Select Appointment' }}/>

            <Stack.Screen name="TeacherMenu" component={TeacherMenu} options={{ title: 'Menu' }}/>
            <Stack.Screen name="TeacherAppScreen" component={TeacherAppScreen} options={{ title: 'Create Appointment' }}/>

          </Stack.Navigator>
        </SQLiteProvider>
      </React.Suspense>
    </NavigationContainer>
  );
}