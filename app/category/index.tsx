import { useTasksContext } from "@/provider/TaskProvider";
import { Link } from "expo-router";
import { FlatList, Text, View, StyleSheet } from "react-native";
import Animated, { useSharedValue } from "react-native-reanimated"

const AllCategory = () => {




    const {
        taskList
    } = useTasksContext()
    const categories = [...new Set(taskList.map(task => task.category))];
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Categories</Text>
            <FlatList data={categories} keyExtractor={(item, index) => index.toString()} renderItem={({ item }) => <Link href={`/category/${item}`} style={styles.category}><Text style={styles.text}>{item}</Text></Link>}></FlatList>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        textTransform: "capitalize",
    },
    title: {
        fontSize: 30
    },
    container: {
        flex: 1,
        padding: 5,
        width: "100%",
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