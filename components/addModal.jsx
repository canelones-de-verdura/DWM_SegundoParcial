import { useState } from "react";
import { Modal, StyleSheet, View, Text, Pressable, Alert } from "react-native"
import { InputComponent } from "./input/InputComponent";
import ApiService from "../services/ApiService";

export function MyModal({ open, setOpen, update, setUpdate, planet }) {
    const [name, setName] = useState(planet ? planet.name : "");
    const [description, setDescription] = useState(planet ? planet.description : "");
    const [image, setImage] = useState(planet ? planet.image : "");
    const [moons, setMoons] = useState(planet ? planet.moons : "");
    const [moon_names, setMoonNames] = useState(planet ? planet.moon_names : "");


    const confirm = async () => {
        let res;
        const newplanet = {
            name: name,
            description: description,
            image: image,
            moons: moons,
            moon_names: moon_names,
        };

        if (planet)
            res = await ApiService.put(
                planet.id,
                newplanet
            );
        else if (
            name !== "" &&
            description !== "" &&
            image !== "" &&
            moons !== ""
        )
            res = await ApiService.post(newplanet);
        else
            Alert.alert("Error", "Empty fields");

        if (res.code === 200 || res.code === 201) {
            setUpdate(!update);
            setOpen(false);
        } else {
            setOpen(false);
            Alert.alert("Error", "Error adding or editing planet");
        }
    };


    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={open}
            onRequestClose={() => setOpen(false)}
        >
            <View style={styles.CenteredView}>
                <View style={styles.ModalView}>
                    <Text style={{ fontWeight: "bold", fontSize: 18, paddingBottom: 20 }}>
                        {planet ? "Edit planet" : "Add planet"}
                    </Text>

                    <InputComponent updateInput={setName} />
                    <Text style={styles.Label}>
                        Name
                    </Text>

                    <InputComponent updateInput={setImage} />
                    <Text style={styles.Label}>
                        Photo (paste URL)
                    </Text>

                    <InputComponent updateInput={setDescription} />
                    <Text style={styles.Label}>
                        Description
                    </Text>

                    <InputComponent updateInput={setMoons} />
                    <Text style={styles.Label}>
                        Moons amount
                    </Text>

                    <InputComponent updateInput={setMoonNames} />
                    <Text style={styles.Label}>
                        Moons
                    </Text>

                    <Pressable onPress={confirm}>
                        <Text style={styles.Button}>Confirm changes</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    CenteredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    ModalView: {
        width: "90%",
        maxWidth: "90%",
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

