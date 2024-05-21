import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSQLiteContext } from "expo-sqlite/next";

export default function StudentAppList({ route }) {
    const { studentId } = route.params;
    const [appointments, setAppointments] = useState([]);
    const db = useSQLiteContext();

    useEffect(() => {
        fetchStudentAppointments();
    }, []);

    const fetchStudentAppointments = async () => {
        try {
            const results = await db.getAllAsync('SELECT * FROM Appointments WHERE appointment_id = ?', [studentId]);
            setAppointments(results);
        } catch (error) {
            console.error('An error occurred while fetching student appointments:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Appointments</Text>
            <FlatList
                data={appointments}
                keyExtractor={(item) => item.appointment_id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.appointmentItem}>
                        <Text style={styles.appList}>{`Date: ${item.date}`}</Text>
                        <Text style={styles.appList}>{`Time: ${item.time}`}</Text>
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
    appList: {
        fontWeight: 'bold',
        textAlign: 'center',
    }
});
