// StudentMenu.tsx

import { View, Text, StyleSheet, Button } from "react-native";
import * as React from 'react';

export default function StudentMenu({ navigation }) {
    const handleAppointments = () => {
        navigation.navigate('StudentAppList');
    };

    const handleMakeAppointment = () => {
        navigation.navigate('StudentAppScreen');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Öğrenci Menüsü</Text>
            <Button title="My Appointments" onPress={handleAppointments} />
            <Button title="Get Appointment" onPress={handleMakeAppointment} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
});