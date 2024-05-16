import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSQLiteContext } from "expo-sqlite/next";

export default function StudentAppScreen() {
    const [teachers, setTeachers] = useState([]);
    const navigation = useNavigation();
    const db = useSQLiteContext();

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try {
            const results = await db.getAllAsync('SELECT id, firstName, lastName FROM Teachers');
            setTeachers(results);
        } catch (error) {
            console.error('Öğretmenleri getirirken bir hata oluştu:', error);
        }
    };

    const handleTeacherPress = (teacherId) => {
        navigation.navigate('SelectApp', { teacherId });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Öğretmenler</Text>
            <FlatList
                data={teachers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.teacherItem} onPress={() => handleTeacherPress(item.id)}>
                        <Text style={styles.teacherName}>{`${item.firstName} ${item.lastName}`}</Text>
                    </TouchableOpacity>
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
    teacherItem: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#f9f9f9',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 4,
    },
    teacherName: {
        fontSize: 18,
    },
});
