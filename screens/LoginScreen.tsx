import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import * as React from 'react';
import { useSQLiteContext } from "expo-sqlite/next";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const db = useSQLiteContext();

    async function handleLogin() {
        if (email === '' || password === '') {
            Alert.alert('Hata', 'Lütfen kullanıcı adı ve şifrenizi girin.');
            return;
        }

        try {
            // Students tablosunu kontrol et
            const studentResult = await db.getAllAsync(
                'SELECT * FROM Students WHERE email = ? AND password = ?',
                [email, password]
            );

            if (studentResult.length > 0) {
                Alert.alert('Başarılı', 'Öğrenci olarak giriş yapıldı!');
                navigation.navigate('StudentMenu');
                return;
            }

            // Teachers tablosunu kontrol et
            const teacherResult = await db.getAllAsync(
                'SELECT * FROM Teachers WHERE email = ? AND password = ?',
                [email, password]
            );

            if (teacherResult.length > 0) {
                Alert.alert('Başarılı', 'Öğretmen olarak giriş yapıldı!');
                navigation.navigate('TeacherMenu');
                return;
            }

            Alert.alert('Hata', 'Geçersiz kullanıcı adı veya şifre.');
        } catch (error) {
            console.error(error);
            Alert.alert('Hata', 'Bir hata oluştu, lütfen tekrar deneyin.');
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}></Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});
