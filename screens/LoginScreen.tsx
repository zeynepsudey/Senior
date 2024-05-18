import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from "react-native";
import * as React from 'react';
import { useSQLiteContext } from "expo-sqlite/next";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const db = useSQLiteContext();

    async function handleLogin() {
        if (email === '' || password === '') {
            Alert.alert('ERROR', 'Please enter your username and password.');
            return;
        }

        try {
            // Students tablosunu kontrol et
            const studentResult = await db.getAllAsync(
                'SELECT * FROM Students WHERE email = ? AND password = ?',
                [email, password]
            );

            if (studentResult.length > 0) {
                const studentId = studentResult[0].id;
                Alert.alert('SUCCESSFUL', 'Login as a student!');
                navigation.navigate('StudentMenu', { studentId });
                return;
            }

            // Teachers tablosunu kontrol et
            const teacherResult = await db.getAllAsync(
                'SELECT * FROM Teachers WHERE email = ? AND password = ?',
                [email, password]
            );

            if (teacherResult.length > 0) {
                const teacherId = teacherResult[0].id;
                Alert.alert('SUCCESSFUL', 'Login as a teacher!');
                navigation.navigate('TeacherMenu', { teacherId });
                return;
            }

            Alert.alert('ERROR', 'Invalid username or password.');
        } catch (error) {
            console.error(error);
            Alert.alert('ERROR', 'An error occurred, please try again.');
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#130632"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="#130632"
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#130632',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        color: 'white',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        color: '#130632', // İçindeki yazı rengi
        backgroundColor: 'white', // Arka plan rengi
        borderRadius: 8,
    },
    button: {
        backgroundColor: '#A391F5',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        alignSelf: 'center',
        width: 100,
        marginTop: 5,
        borderWidth: 1,
        borderColor: 'white',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
