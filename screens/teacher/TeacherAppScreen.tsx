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
            Alert.alert('Başarılı', 'Randevu kaydedildi.');
            fetchAppointments(); // Randevuları güncelle
        } catch (error) {
            console.error(error);
            Alert.alert('Hata', 'Randevu kaydedilirken bir hata oluştu.');
        }
    };

    const fetchAppointments = async () => {
        try {
            const results = await db.getAllAsync('SELECT * FROM Appointments WHERE teacherId = ?', [teacherId]);
            setAppointments(results);
        } catch (error) {
            console.error('Randevuları getirirken bir hata oluştu:', error);
        }
    };

    const handleDeleteAppointment = async (id) => {
        try {
            await db.getAllAsync('DELETE FROM Appointments WHERE id = ?', [id]);
            Alert.alert('Başarılı', 'Randevu silindi.');
            fetchAppointments(); // Randevuları güncelle
        } catch (error) {
            console.error('Randevuyu silerken bir hata oluştu:', error);
            Alert.alert('Hata', 'Randevuyu silerken bir hata oluştu.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Randevu Belirleme</Text>

            <Button title="Tarih Seç" onPress={() => setShowDatePicker(true)} />
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

            <Button title="Saat Seç" onPress={() => setShowTimePicker(true)} />
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

            <Button title="Kaydet" onPress={handleSaveAppointment} />

            <FlatList
                data={appointments}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.appointmentItem}>
                        <Text>{`Tarih: ${item.date}`}</Text>
                        <Text>{`Saat: ${item.time}`}</Text>
                        <TouchableOpacity onPress={() => handleDeleteAppointment(item.id)} style={styles.deleteButton}>
                            <Text style={styles.deleteButtonText}>Sil</Text>
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
