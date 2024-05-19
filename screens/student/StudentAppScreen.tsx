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
            const results = await db.getAllAsync('SELECT teacher_id, name FROM Teachers');
            setTeachers(results);
        } catch (error) {
            console.error('An error occurred while fetching teachers:', error);
        }
    };

    const handleTeacherPress = (teacherId) => {
        navigation.navigate('SelectApp', { teacherId });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Teachers</Text>
            <FlatList
                data={teachers}
                keyExtractor={(item) => item.teacher_id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.teacherItem, { width: `${item.name.length * 10}px` }]}
                        onPress={() => handleTeacherPress(item.teacher_id)}
                    >
                        <Text style={styles.teacherName}>{item.name}</Text>
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
    teacherItem: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginVertical: 8,
        backgroundColor: '#A391F5',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 4,
        alignItems: 'center',
    },
    teacherName: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
    },
});
