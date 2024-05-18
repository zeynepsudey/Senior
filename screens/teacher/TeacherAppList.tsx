import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSQLiteContext } from "expo-sqlite/next";

export default function TeacherAppList({ teacherId }) {
    const [selectedAppointments, setSelectedAppointments] = useState([]);
    const db = useSQLiteContext();

    useEffect(() => {
        fetchSelectedAppointments();
    }, []);

    const fetchSelectedAppointments = async () => {
        try {
            const result = await db.getAllAsync('SELECT * FROM Appointments WHERE teacherId = ?', [teacherId]);
            setSelectedAppointments(result);
        } catch (error) {
            console.error('Öğretmenin seçili randevularını getirirken bir hata oluştu:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Öğretmenin Randevuları</Text>
            <FlatList
                data={selectedAppointments}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.appointmentItem}>
                        <Text>{`Tarih: ${item.date}`}</Text>
                        <Text>{`Saat: ${item.time}`}</Text>
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
    },
});