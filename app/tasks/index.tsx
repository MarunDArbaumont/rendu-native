import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useTasksContext } from '@/provider/TaskProvider'
import { router } from 'expo-router';

const AddTask = () => {

    const {
        taskList,
        addTask,
    } = useTasksContext()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const onValidTask = useCallback(() => {

        if (!title || !description) return

        const newTask = {
            id: "'id" + taskList.length + 1,
            title,
            description,
            is_toggle: false
        }

        addTask(newTask)

        router.back()
    }, [title, description])

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.title}>Add Task</Text>
                <View>
                    <Text>Title</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Title"
                        value={title}
                        onChangeText={setTitle}
                    />
                </View>
                <View>
                    <Text>Description</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Description"
                        value={description}
                        onChangeText={setDescription}
                    />
                </View>
                <TouchableOpacity onPress={onValidTask} style={styles.button}>
                    <Text>Submit Task</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    title: {
        fontSize: 30
    },
    container: {
        flex: 1,
    },
    form: {
        flex: 1,
        padding: 10,
        gap: 5
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5
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



export default AddTask