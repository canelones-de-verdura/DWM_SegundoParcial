import { View, Text, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import PicComponent from "../components/pic";
import { useEffect, useState } from "react";
import ApiService from "../services/ApiService";
import { MyModal } from "../components/addModal";
import { BaseButton } from "../components/buttons/ButtonComponent";
import { useRouter } from "expo-router";

import { styles } from "../components/styles/team_styles";

export default function Team() {
    const { teamid } = useLocalSearchParams();

    const router = useRouter();
    const [team, setTeam] = useState(null);
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(false);

    const getTeam = async () => {
        const res = await ApiService.get(teamid);

        if (res.code === 200)
            setTeam(res.data);
    };

    const deleteTeam = async () => {
        const res = await ApiService.delete(teamid);

        if (res.code === 200)
            router.back();
    };

    useEffect(() => {
        getTeam();
    }, [update]);

    if (!team)
        return (
            <View style={styles.Outer}>
                <ActivityIndicator size={50} />
            </View>
        );

    return (
        <View style={styles.Outer}>
            <View style={styles.MainView} >
                <MyModal
                    open={open}
                    setOpen={setOpen}
                    update={update}
                    setUpdate={setUpdate}
                    team={team}
                />
                <View style={styles.Header}>
                    <PicComponent size={200} image={team.logo} />
                    <Text style={styles.TextTitle}>{team.name}</Text>
                </View>
                <Text style={styles.TextDesc}>
                    {team.description}
                    {'\n'}{team.goals} goles.
                    {'\n'}{team.points} puntos.
                </Text>
                <BaseButton
                    icon={"pencil-outline"}
                    size={40}
                    color={"black"}
                    execute={() => setOpen(true)}
                    style={styles.EditButton}
                />
                <BaseButton
                    icon={"trash"}
                    size={40}
                    color={"red"}
                    execute={deleteTeam}
                    style={styles.DeleteButton}
                />
            </View>
        </View>
    );
};
