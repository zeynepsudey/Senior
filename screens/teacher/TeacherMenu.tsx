import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as React from 'react';

export default function TeacherMenu({ navigation, route }) {
    const { teacherId } = route.params;

    const handleCreateAppointment = () => {
        navigation.navigate('TeacherAppScreen', { teacherId });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handleCreateAppointment}>
                <Text style={styles.buttonText}>Create Appointment</Text>
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
    button: {
        backgroundColor: '#A391F5',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        alignSelf: 'center',
        width: 200,
        marginTop: 10,
        borderWidth: 1,
        borderColor: 'white',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
