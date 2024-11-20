import { Pressable } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

export function BaseButton({ icon, size, color, execute, style }) {
    return (
        <Pressable onPress={execute} style={style}>
            <Ionicons size={size} name={icon} color={color}/>
        </Pressable>
    );
};
