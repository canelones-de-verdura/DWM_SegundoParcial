import { StyleSheet } from "react-native"
import { window } from "./window"

export const styles = StyleSheet.create({
    Outer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    MainView: {
        flex: 1,
        width: window.width * .85,
        maxHeight: window.height * .80,

        justifyContent: "flex-start",
        alignItems: "center",

        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "black",
    },

    Header: {
        padding: 10,
    },

    TextTitle: {
        fontWeight: "bold",
        fontSize: 32,
        paddingTop: 20,
        alignSelf: "center"
    },

    TextDesc: {
        fontWeight: "regular",
        fontStyle: "italic",
        color: "grey",
        padding: 10,
    },

    TeamCard: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",

        margin: 10,
        padding: 10,

        backgroundColor: "white",

        borderWidth: 1,
        borderRadius: 20,
        borderColor: "black",
    },

    TeamName: {
        marginLeft: 20,
        fontWeight: "bold",
    },

    EditButton: {
        position: "absolute",
        bottom: 20,
        right: 20,
    },

    DeleteButton: {
        position: "absolute",
        bottom: 20,
        right: 60,
    },
})
