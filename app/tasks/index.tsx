import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useTasksContext } from '@/provider/TaskProvider'
import { router } from 'expo-router';
import Dropdown from '@/components/DropdownCategory';

const AddTask = () => {

    const {
        taskList,
        addTask,
    } = useTasksContext()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")

    const onValidTask = useCallback(() => {

        if (!title || !description || !category) return

        const newTask = {
            id: "'id" + (taskList.length + 1),
            title,
            description,
            category,
            is_toggle: false
        }

        addTask(newTask)

        router.back()
    }, [title, description, category])

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.title}>Add Task</Text>
                <View style={styles.innerFrom}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Title"
                        value={title}
                        onChangeText={setTitle}
                    />
                </View>
                <View style={styles.innerFrom}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Description"
                        value={description}
                        onChangeText={setDescription}
                    />
                </View>
                <View style={styles.innerFrom}>
                    <Text style={styles.label}>Category</Text>
                    <Dropdown data={[
                        { value: "clean", label: "Clean" },
                        { value: "food", label: "Food" },
                        { value: "other", label: "Other" },
                    ]}
                        onChange={setCategory}
                        placeholder="Category"
                    />
                </View>
                <TouchableOpacity onPress={onValidTask} style={styles.button}>
                    <Text style={styles.label}>Submit Task</Text>
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
        gap: 16
    },
    innerFrom: {
        gap: 8,
    },
    label: {
        fontSize: 16,
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        backgroundColor: "#fff",
        height: 50,
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