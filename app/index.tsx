import Task from "@/components/Taks";
import { TTask, useTasksContext } from "@/provider/TaskProvider";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";

export default function Index() {

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

  return (
    <View
      style={styles.view}
    >
      <FlatList
        style={styles.listStyle}
        data={taskList}
        renderItem={({ item }) => <Task item={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
