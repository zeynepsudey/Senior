import { View, Text, Button, StyleSheet } from "react-native";
import * as React from 'react';

export default function TeacherMenu({ navigation, route }) {
    const { teacherId } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Teacher Menu</Text>
            <Button
                title="Create Appointment"
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
