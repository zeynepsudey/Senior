import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as React from 'react';
import { Students, Teachers } from "../types";
import { useSQLiteContext } from "expo-sqlite/next";

export default function Home({ navigation }) {
    const [students, setStudents] = React.useState<Students[]>([]);
    const [teachers, setTeachers] = React.useState<Teachers[]>([]);

    const db = useSQLiteContext();

    React.useEffect(() => {
        db.withTransactionAsync(async () => {
            await getData();
        });
    }, [db]);

    async function getData() {
       const result = await db.getAllAsync(`SELECT * FROM Students`);
       //console.log(result);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}></Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#130632',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#A391F5',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        alignSelf: 'center', // Butonu yatay merkezleme
        width: 100, // Butonun genişliği
        borderWidth: 1,
        borderColor: 'white',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
