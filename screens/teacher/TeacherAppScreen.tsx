import React, { useState, useEffect } from 'react';
import { View, Text, Alert, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSQLiteContext } from "expo-sqlite/next";
import { Ionicons } from '@expo/vector-icons'; // Örnek olarak Ionicons kullanıyorum, kendi kullanmak istediğiniz ikon kütüphanesini kullanabilirsiniz

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
            const dateStr = date.toISOString().split('T')[0];
            const timeStr = time.toTimeString().split(' ')[0];

            const result = await db.getAllAsync(
                'INSERT INTO Appointments (teacherId, date, time) VALUES (?, ?, ?)',
                [teacherId, dateStr, timeStr]
            );

            console.log('Appointment saved:', {
                teacherId,
                date: dateStr,
                time: timeStr,
                result
            });

            Alert.alert('Success', 'Appointment saved.');
            fetchAppointments();
        } catch (error) {
            console.error('An error occurred while saving the appointment:', error);
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
            const result = await db.getAllAsync('DELETE FROM Appointments WHERE id = ?', [id]);

            console.log('Appointment deleted:', {
                id,
                result
            });

            Alert.alert('Success', 'Appointment deleted.');
            fetchAppointments();
        } catch (error) {
            console.error('An error occurred while deleting the appointment:', error);
            Alert.alert('Error', 'An error occurred while deleting the appointment.');
        }
    };

    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.saveButton} onPress={() => setShowDatePicker(true)}>
                <Ionicons name="calendar" size={24} color="white" />
                <Text style={styles.saveButtonText}>Select Date</Text>
            </TouchableOpacity>
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

            <TouchableOpacity style={styles.saveButton} onPress={() => setShowTimePicker(true)}>
                <Ionicons name="time" size={24} color="white" />
                <Text style={styles.saveButtonText}>Select Time</Text>
            </TouchableOpacity>
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

            <TouchableOpacity style={styles.saveButton} onPress={handleSaveAppointment}>
                <Ionicons name="save" size={24} color="white" />
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>

            <FlatList
                data={appointments}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.appointmentItem}>
                        <Text style={styles.appList}>{`Date: ${item.date}`}</Text>
                        <Text style={styles.appList}>{`Time: ${item.time}`}</Text>
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
    saveButton: {
        backgroundColor: '#A391F5',
        marginTop: 10,
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row', // Add this to align icon and text horizontally
        width: 200,
        borderWidth: 2,
        borderColor: 'white',
    },
    saveButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: 10, // Add some space between icon and text
    },
    deleteButton: {
        backgroundColor: '#A391F5',
        marginTop: 8,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#130632',
    },
    deleteButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    appList: {
        fontWeight: 'bold',
        textAlign: 'center',
    }
});
