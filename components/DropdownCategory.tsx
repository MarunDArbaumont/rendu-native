import { View, Text, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback, Platform } from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { FlatList } from "react-native";
type OptionItem = {
    value: string;
    label: string;
};

interface DropDownProps {
    data: OptionItem[];
    onChange: (item: string) => void;
    placeholder: string;
}
export default function Dropdown({
    data,
    onChange,
    placeholder,
}: DropDownProps) {

    const [expanded, setExpanded] = useState(false);

    const [value, setValue] = useState("");

    const toggleExpanded = useCallback(() => setExpanded(!expanded), [expanded]);

    const buttonRef = useRef<View>(null);

    const [top, setTop] = useState(0)

    const onSelect = useCallback((item: OptionItem) => {
        onChange(item.value);
        setValue(item.label);
        setExpanded(false);
    }, [onChange]);
    return (
        <View
            ref={buttonRef}
            onLayout={(event) => {
                const layout = event.nativeEvent.layout;
                const topOffset = layout.y;
                const heightOfComponent = layout.height;

                const finalValue =
                    topOffset + heightOfComponent + (Platform.OS === "android" ? -32 : 3);

                setTop(finalValue);
            }}
        >
            <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={toggleExpanded}
            >
                <Text style={styles.text}>{value || placeholder}</Text>
                <AntDesign name={expanded ? "caretup" : "caretdown"} />
            </TouchableOpacity>
            {expanded ? (
                <Modal visible={expanded} transparent>
                    <TouchableWithoutFeedback onPress={() => setExpanded(false)}>
                        <View style={styles.backdrop}>
                            <View
                                style={[
                                    styles.options,
                                    {
                                        top,
                                    },
                                ]}
                            >
                                <FlatList
                                    keyExtractor={(item) => item.value}
                                    data={data}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            style={styles.optionItem}
                                            onPress={() => onSelect(item)}
                                        >
                                            <Text>{item.label}</Text>
                                        </TouchableOpacity>
                                    )}
                                    ItemSeparatorComponent={() => (
                                        <View style={styles.separator} />
                                    )}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        padding: 20,
        justifyContent: "center",
        flex: 1,
        alignItems: "center",

    },
    separator: {
        height: 4,
    },
    optionItem: {
        height: 40,
        justifyContent: "center",
    },
    options: {
        position: "absolute",
        backgroundColor: "#fff",
        width: "100%",
        padding: 10,
        borderRadius: 6,
        maxHeight: 250,
        borderWidth: 1,
        borderBlockColor: "#000",
    },
    text: {
        fontSize: 15,
        opacity: 0.8
    },
    button: {
        height: 50,
        justifyContent: "space-between",
        backgroundColor: "#fff",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        paddingHorizontal: 8,
        borderRadius: 8,
        borderColor: 'black',
        borderWidth: 1,
    }
})