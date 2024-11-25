import { Pressable, Text } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

export function BaseButton({ icon, size, color, execute, style }) {
    return (
        <Pressable onPress={execute} style={style}>
            <Ionicons size={size} name={icon} color={color} />
        </Pressable>
    );
};

export function TextButton({ text, size, color, execute, style }) {
    return (
        <Pressable onPress={execute} style={style}>
            <Text style={{ fontSize: size, fontWeight: "bold", color: color }}>{text}</Text>
        </Pressable>
    );
};
