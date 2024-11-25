import { useState } from "react";
import { Modal, View, Text, Pressable, Alert } from "react-native"
import { InputComponent } from "./input/InputComponent";
import ApiService from "../services/ApiService";

import { styles } from "./styles/modal_styles";

export function MyModal({ open, setOpen, update, setUpdate, team }) {
    const [name, setName] = useState(team ? team.name : "");
    const [description, setDescription] = useState(team ? team.description : "");
    const [image, setImage] = useState(team ? team.logo : "");
    const [goals, setGoals] = useState(team ? team.goals : "");
    const [points, setPoints] = useState(team ? team.points : "");


    const confirm = async () => {
        let res;
        const newteam = {
            name: name,
            description: description,
            logo: image,
            goals: goals,
            points: points
        };

        if (team)
            res = await ApiService.put(
                team.id,
                newteam
            );
        else if (
            name !== "" &&
            description !== "" &&
            image !== "" &&
            goals !== "" &&
            points !== ""
        )
            res = await ApiService.post(newteam);
        else
            Alert.alert("Error", "Empty fields");

        if (res.code === 200 || res.code === 201) {
            setUpdate(!update);
            setOpen(false);
        } else {
            setOpen(false);
            Alert.alert("Error", "Error adding or editing team");
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
                        {team ? "Edit team" : "Add team"}
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

                    <InputComponent updateInput={setGoals} />
                    <Text style={styles.Label}>
                        Goals
                    </Text>

                    <InputComponent updateInput={setPoints} />
                    <Text style={styles.Label}>
                        Points
                    </Text>

                    <Pressable onPress={confirm}>
                        <Text style={styles.Button}>Confirm</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}
