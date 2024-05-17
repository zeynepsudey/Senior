import { View, Text, Button, StyleSheet } from "react-native";
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
            <Button
                title="Login"
                onPress={() => navigation.navigate('Login')}
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
});
