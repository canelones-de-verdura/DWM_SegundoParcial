import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: "Eliminatorias 2024" }} />
            <Stack.Screen name="team" options={{ title: "Details" }} />
        </Stack>
    );
}
