import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useSQLiteContext } from "expo-sqlite/next";

export default function SelectApp({ route }) {
    const { teacherId } = route.params;
    const [appointments, setAppointments] = useState([]);
    const db = useSQLiteContext();

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const results = await db.getAllAsync('SELECT * FROM Appointments WHERE teacherId = ?', [teacherId]);
            setAppointments(results);
        } catch (error) {
            console.error('Randevuları getirirken bir hata oluştu:', error);
        }
    };

    const handleSelectAppointment = async (appointmentId) => {
        try {
            // İlgili randevuyu seç
            // Burada seçilen randevuyu kaydetmek için uygun bir yol belirtmelisiniz
            console.log(`Randevu seçildi: ${appointmentId}`);

            // Uyarı mesajını göster
            Alert.alert(
                "UYARI",
                "Seçiminiz 'Randevularım' sekmesine başarıyla kaydedildi. Randevunuzu en geç randevu tarihinize 24 saat kala iptal edebilirsiniz. Randevu tarihine 24 saatten az kalan randevular iptal edilemez."
            );
        } catch (error) {
            console.error('Randevuyu işaretlerken bir hata oluştu:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Öğretmenin Randevuları</Text>
            <FlatList
                data={appointments}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.appointmentItem}>
                        <Text>{`Tarih: ${item.date}`}</Text>
                        <Text>{`Saat: ${item.time}`}</Text>
                        <TouchableOpacity onPress={() => handleSelectAppointment(item.id)}>
                            <Text style={styles.selectButton}>Seç</Text>
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
    },
    selectButton: {
        color: 'blue',
        textAlign: 'center',
        marginTop: 8,
    },
});
