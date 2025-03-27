import { TTask, useTasksContext } from "@/provider/TaskProvider";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import Animated, { runOnUI, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const AnimatedView = Animated.createAnimatedComponent(View);

export const Task = ({ item, deleteTask }: { item: TTask | undefined; deleteTask: (id: number) => void }) => {

    const offset = useSharedValue<number>(0);

    const style = useAnimatedStyle(() => ({
        transform: [{ translateX: offset.value }],
    }));

    const OFFSET = 400;

    const deleteAnimation = () => {
        'worklet';
        offset.value = withTiming(OFFSET);
    };

    const onDeleteTask = () => {
        if (!item) return;
        deleteAnimation();
        setTimeout(() => {
            console.log("Deleted retardée d'une seconde.");
            deleteTask(item.id);
        }, 500);
    };
    useEffect(() => {
        runOnUI(deleteAnimation)
    })
    return (
        <AnimatedView style={[styles.task, style]}>
            <Text style={styles.text}>{item?.title}</Text>
            <Text style={styles.text}>{item?.description}</Text>
            <Text style={[styles.text, styles.category]}>{item?.category}</Text>
            <View style={styles.buttonGroup}>
                <TouchableOpacity onPress={onDeleteTask} style={styles.button}>
                    <Text style={styles.text}>Delete task</Text>
                </TouchableOpacity>
            </View>
        </AnimatedView>
    );
};


const styles = StyleSheet.create({
    text: {
        fontSize: 16,
    },
    category: {
        textTransform: "capitalize",
    },
    task: {
        maxHeight: 130,
        width: 350,
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