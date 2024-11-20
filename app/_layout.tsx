import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: "Planetario UCU" }} />
            <Stack.Screen name="planet" options={{ title: "Details" }} />
        </Stack>
    );
}
