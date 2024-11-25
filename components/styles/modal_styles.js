import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    CenteredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    ModalView: {
        width: "85%",
        maxWidth: "85%",
        margin: 20,
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "black",
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    Label: {
        fontWeight: "normal",
        fontSize: 10,
        alignSelf: "flex-start",
        marginLeft: 10,
        marginBottom: 20,
    },

    Button: {
        fontWeight: "bold",
        marginTop: 20,
        color: "red",
    }
});

