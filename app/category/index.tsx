import { useTasksContext } from "@/provider/TaskProvider";
import { Link } from "expo-router";
import { FlatList, Text, View, StyleSheet, TouchableOpacity } from "react-native";

const AllCategory = () => {
    const {
        taskList
    } = useTasksContext()
    const categories = [...new Set(taskList.map(task => task.category))];
    return (
        <View style={styles.container}>
            <FlatList data={categories} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) => <Link href={`/category/${item}`} style={styles.category}><Text>{item}</Text></Link>}></FlatList>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5
    },
    category: {
        flex: 1,
        padding: 10,
        marginBottom: 5,
        marginTop: 5,
        gap: 5,
        backgroundColor: '#fff',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'black',
    },
});



export default AllCategory