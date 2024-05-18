import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSQLiteContext } from "expo-sqlite/next";

export default function TeacherAppScreen({ route }) {
    const { teacherId } = route.params;
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [appointments, setAppointments] = useState([]);

    const db = useSQLiteContext();

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleSaveAppointment = async () => {
        try {
            await db.getAllAsync(
                'INSERT INTO Appointments (teacherId, date, time) VALUES (?, ?, ?)',
                [teacherId, date.toISOString().split('T')[0], time.toTimeString().split(' ')[0]]
            );
            Alert.alert('Success', 'Appointment saved.');
            fetchAppointments();
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'An error occurred while saving the appointment.');
        }
    };

    const fetchAppointments = async () => {
        try {
            const results = await db.getAllAsync('SELECT * FROM Appointments WHERE teacherId = ?', [teacherId]);
            setAppointments(results);
        } catch (error) {
            console.error('An error occurred while fetching appointments:', error);
        }
    };

    const handleDeleteAppointment = async (id) => {
        try {
            await db.getAllAsync('DELETE FROM Appointments WHERE id = ?', [id]);
            Alert.alert('Success', 'Appointment deleted.');
            fetchAppointments();
        } catch (error) {
            console.error('An error occurred while deleting the appointment:', error);
            Alert.alert('Error', 'An error occurred while deleting the appointment.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Appointment</Text>

            <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        const currentDate = selectedDate || date;
                        setShowDatePicker(false);
                        setDate(currentDate);
                    }}
                />
            )}

            <Button title="Select Time" onPress={() => setShowTimePicker(true)} />
            {showTimePicker && (
                <DateTimePicker
                    value={time}
                    mode="time"
                    display="default"
                    onChange={(event, selectedTime) => {
                        const currentTime = selectedTime || time;
                        setShowTimePicker(false);
                        setTime(currentTime);
                    }}
                />
            )}

            <Button title="Save" onPress={handleSaveAppointment} />

            <FlatList
                data={appointments}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.appointmentItem}>
                        <Text>{`Date: ${item.date}`}</Text>
                        <Text>{`Time: ${item.time}`}</Text>
                        <TouchableOpacity onPress={() => handleDeleteAppointment(item.id)} style={styles.deleteButton}>
                            <Text style={styles.deleteButtonText}>Delete</Text>
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
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    appointmentItem: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#f9f9f9',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    deleteButton: {
        backgroundColor: '#ff6347',
        padding: 8,
        borderRadius: 4,
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
