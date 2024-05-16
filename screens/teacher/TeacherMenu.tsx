import { View, Text, Button, StyleSheet } from "react-native";
import * as React from 'react';

export default function TeacherMenu({ navigation }) {
    const teacherId = 1; // Bu değer giriş yapan öğretmen ID'sine göre dinamik olmalıdır

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Öğretmen Menüsü</Text>
            <Button
                title="Randevu Belirleme"
                onPress={() => navigation.navigate('TeacherAppScreen', { teacherId })}
            />
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
});
