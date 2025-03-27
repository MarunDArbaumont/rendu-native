import Task from "@/components/Taks"
import { TTask, useTasksContext } from "@/provider/TaskProvider"
import { router, useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { Text, TouchableOpacity, View, StyleSheet } from "react-native"

const Category = () => {

    const { taskList, deleteTask } = useTasksContext()

    const params = useLocalSearchParams()

    const [categoryTasks, setCategoryTasks] = useState<TTask[]>([])

    useEffect(() => {

        if (!params.category || !taskList) return

        const filteredTasks = taskList.filter((task) => task.category === params.category)
        setCategoryTasks(filteredTasks)
    }, [taskList, JSON.stringify(params)])

    const goBack = () => {
        router.navigate("/category")
    }

    return (
        <View
            style={styles.view}
        >
            <Text style={styles.title}>{params.category}</Text>
            <TouchableOpacity onPress={goBack} style={styles.button}>
                <Text>Go back</Text>
            </TouchableOpacity>
            <View style={styles.listStyle}>
                {categoryTasks.length > 0 ? (
                    categoryTasks.map((task) => <Task key={task.id} item={task} deleteTask={deleteTask} />)
                ) : (
                    <Text>No tasks found for this category</Text>
                )}
            </View>

        </View>
    )

}
const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        textTransform: "capitalize",
    },
    view: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        width: "100%",
        paddingVertical: 16,
        paddingHorizontal: 8,
    },
    listStyle: {
        flex: 1,
        gap: 5,
    },
    button: {
        width: 100,
        padding: 2,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 20,
        alignItems: 'center',
    }
});


export default Category