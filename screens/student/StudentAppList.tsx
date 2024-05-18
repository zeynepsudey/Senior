// StudentAppList.js

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useSQLiteContext } from "expo-sqlite/next";

export default function StudentAppList({ studentId }) {
    const [selectedAppointments, setSelectedAppointments] = useState([]);
    const db = useSQLiteContext();

    useEffect(() => {
        fetchSelectedAppointments();
    }, []);

    const fetchSelectedAppointments = async () => {
        try {
            const result = await db.getAllAsync('SELECT Appointments.*, Teachers.firstName, Teachers.lastName FROM Appointments INNER JOIN Teachers ON Appointments.teacherId = Teachers.id WHERE Appointments.studentId = ?', [studentId]);
            setSelectedAppointments(result);
        } catch (error) {
            console.error('An error occurred while fetching appointments:', error);
        }
    };

    const handleCancelAppointment = async (id, date) => {
        const currentDate = new Date();
        const appointmentDate = new Date(date);
        const timeDifference = appointmentDate.getTime() - currentDate.getTime();
        const hoursDifference = timeDifference / (1000 * 60 * 60);

        if (hoursDifference >= 6) {
            try {
                await db.getAllAsync('DELETE FROM Appointments WHERE id = ?', [id]);
                fetchSelectedAppointments();
                Alert.alert('Successful', 'Appointment cancelled successfully.');
            } catch (error) {
                console.error('An error occurred while cancelling the appointment:', error);
                Alert.alert('Error', 'An error occurred while cancelling the appointment.');
            }
        } else {
            Alert.alert('Error', 'The appointment must be at least 6 hours away to cancel.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Appointments</Text>
            <FlatList
                data={selectedAppointments}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.appointmentItem}>
                        <Text style={styles.appointmentText}>{`Teacher: ${item.firstName} ${item.lastName}`}</Text>
                        <Text style={styles.appointmentText}>{`Tarih: ${item.date}`}</Text>
                        <Text style={styles.appointmentText}>{`Saat: ${item.time}`}</Text>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => handleCancelAppointment(item.id, item.date)}
                        >
                            <Text style={styles.cancelButtonText}>İptal et</Text>
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
        marginVertical: 8,
        backgroundColor: '#f9f9f9',
        borderColor: '#A391F5',
        borderWidth: 2,
        borderRadius: 4,
        width: '60%', // Kutu genişliği daraltıldı
        alignSelf: 'center', // Kutular sayfanın ortasında hizalanacak
    },
    appointmentText: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#826DE3', // Tüm metinlerin rengi
        marginBottom: 8, // Metinler arası boşluk
    },
    cancelButton: {
        backgroundColor: '#A391F5',
        paddingVertical: 8,
        borderRadius: 4,
        marginTop: 8,
        width: '50%',
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: '#130632',
    },
    cancelButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
