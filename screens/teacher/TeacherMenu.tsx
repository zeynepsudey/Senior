import { View, StyleSheet } from "react-native";
import * as React from 'react';
import TeacherAppScreen from '../teacher/TeacherAppScreen'; // Eğer aynı dosya içinde değilse dosya yolunu doğru şekilde ayarlayın

export default function TeacherMenu({ navigation, route }) {
    const { teacherId } = route.params;

    return (
        <View style={styles.container}>
            <TeacherAppScreen teacherId={teacherId} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
