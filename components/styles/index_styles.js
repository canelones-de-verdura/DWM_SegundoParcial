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
        width: window.width,
        height: window.height,

        justifyContent: "center",
        alignItems: "center",
    },

    TextTitle: {
        fontWeight: "bold",
        fontSize: 32,
        padding: 10,
    },

    TextError: {
        fontWeight: "bold",
        color: "grey",
    },

    TeamList: {
        width: window.width * .85,
        paddingBottom: 30,
    },

    TeamCard: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",

        marginTop: 10,
        marginBottom: 10,
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

    ButtonAndroid: {
        padding: 10,
        backgroundColor: "lightblue",
        borderRadius: 20,

        position: "absolute",
        bottom: 20,
        left: 20,
    },

    ButtonIOS: {
        padding: 10,
        backgroundColor: "lightgreen",
        borderRadius: 20,

        position: "absolute",
        bottom: 20,
        right: 20,
    },

    SortButtonAndroid: {
        backgroundColor: "lightblue",
        borderRadius: 60,

        position: "absolute",
        bottom: 80,
        left: 20,
    },

    SortButtonIOS: {
        backgroundColor: "lightgreen",
        borderRadius: 60,

        position: "absolute",
        bottom: 80,
        right: 20,
    },
})
