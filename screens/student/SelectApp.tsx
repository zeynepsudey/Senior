import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useSQLiteContext } from "expo-sqlite/next";

export default function SelectApp({ route }) {
    const { teacherId, studentId } = route.params;
    const [appointments, setAppointments] = useState([]);
    const db = useSQLiteContext();

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const results = await db.getAllAsync('SELECT * FROM Appointments WHERE teacherId = ? AND studentId IS NULL', [teacherId]);
            setAppointments(results);
        } catch (error) {
            console.error('An error occurred while fetching appointments:', error);
        }
    };

    const handleSelectAppointment = async (appointmentId) => {
        try {
            // Seçilen randevuyu öğrenciye atama
            await db.executeAsync('UPDATE Appointments SET studentId = ? WHERE id = ?', [studentId, appointmentId]);

            // Uyarı mesajını göster
            Alert.alert(
                "SUCCESSFUL",
                "Your selection has been successfully saved in the 'My Appointments' tab. You can cancel your appointment at least 6 hours before your appointment date. Appointments less than 6 hours before the appointment date cannot be cancelled."
            );
        } catch (error) {
            console.error('An error occurred while marking the appointment:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Teacher's Appointments</Text>
            <FlatList
                data={appointments}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.appointmentItem}>
                        <Text style={styles.appList}>{`Date: ${item.date}`}</Text>
                        <Text style={styles.appList}>{`Time: ${item.time}`}</Text>
                        <TouchableOpacity
                            style={styles.selectButtonContainer}
                            onPress={() => handleSelectAppointment(item.id)}
                        >
                            <Text style={styles.selectButton}>Select</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    appointmentItem: {
        padding: 16,
        marginVertical: 15,
        backgroundColor: 'white',
        borderColor: '#A391F5',
        borderWidth: 2,
        borderRadius: 4,
        alignItems: 'center',
        width: '100%',
    },
    selectButtonContainer: {
        backgroundColor: '#A391F5',
        marginTop: 8,
        borderRadius: 4,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: '#130632',
    },
    selectButton: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    appList: {
        fontWeight: 'bold',
        textAlign: 'center',
    }
});
