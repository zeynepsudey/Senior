import { View, Text, StyleSheet } from "react-native";
import * as React from 'react';

export default function StudentAppList() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Randevularım</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});