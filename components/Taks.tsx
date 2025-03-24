import { TTask, useTasksContext } from "@/provider/TaskProvider";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

export const Task = ({ item }: { item: TTask }) => {
    const {
        taskList,
        toggleTaskCompletion,
        deleteTask,
    } = useTasksContext()

    const params = useLocalSearchParams()

    const [task, setTask] = useState<TTask | undefined>(undefined)

    useEffect(() => {

        if (!params.id || !taskList) return

        const task = taskList.find((task) => task.id === params.id)
        setTask(task)
    }, [taskList, params])

    const toggleTask = () => {
        if (!task) return

        toggleTaskCompletion(task.id)
    }

    const onDeleteTask = () => {
        if (!task) return

        deleteTask(task.id)
    }

    return (
        <View style={styles.task}>
            <Text style={item?.is_toggle && { textDecorationLine: 'line-through' }} >{item?.title}</Text>
            <Text style={item?.is_toggle && { textDecorationLine: 'line-through' }}>{item?.description}</Text>
            <Text style={item?.is_toggle && { textDecorationLine: 'line-through' }}>{item?.category}</Text>
            {/* <Text>{item.description}</Text> */}
            <View style={styles.buttonGroup}>
                <TouchableOpacity onPress={toggleTask} style={styles.button}>
                    <Text>Complete</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onDeleteTask} style={styles.button}>
                    <Text>Delete task</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    task: {
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
    listStyle: {
        flex: 1,
        gap: 5,
        padding: 10,
    },
    button: {
        width: 100,
        padding: 2,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 20,
        alignItems: 'center',
    },
    buttonGroup: {
        flexDirection: 'row',
        gap: 10
    }
});

export default Task;