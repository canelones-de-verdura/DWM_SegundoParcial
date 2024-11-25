import { Text, View, FlatList, Platform, Pressable, ActivityIndicator } from "react-native";
import ApiService from "../services/ApiService";
import { useEffect, useState } from "react";
import PicComponent from "../components/pic";
import { useRouter } from "expo-router";
import { MyModal } from "../components/addModal";
import { BaseButton, TextButton } from "../components/buttons/ButtonComponent";
import { useIsFocused } from "@react-navigation/native";

import { styles } from "../components/styles/index_styles";

export default function Index() {
    const router = useRouter();
    const focused = useIsFocused();
    const [teams, setTeams] = useState(null);
    const [sorted, setSorted] = useState(false);
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(false);

    const getTeams = async () => {
        const res = await ApiService.get(null);

        if (res.code === 200)
            setTeams(res.data);
    };

    const goToTeamDetails = (team) => {
        router.push({
            pathname: "/team",
            params: {
                teamid: team.id,
            }
        });
    };

    const orderTeams = () => {
        if (!sorted) {
            const sortedPlanets = [...teams].sort((a, b) => b.points - a.points);
            setTeams(sortedPlanets);
        } else {
            setUpdate(!update);
        }
        setSorted(!sorted);
    };

    const renderTeamCard = (item) => {
        const planet = item.item;

        return (
            <Pressable onPress={() => goToTeamDetails(planet)}>
                <View style={styles.TeamCard}>
                    <PicComponent size={100} image={planet.logo} />
                    <Text style={styles.TeamName}>{planet.name}</Text>
                </View>
            </Pressable>
        );
    };

    useEffect(() => {
        getTeams();
    }, [update, focused]);

    if (!teams)
        return (
            <View style={styles.Outer}>
                <View style={styles.MainView}>
                    <ActivityIndicator size={50} />
                </View>
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
                    planet={null}
                />
                {teams.length > 0 ?
                    <FlatList
                        data={teams}
                        renderItem={renderTeamCard}
                        keyExtractor={item => item.id}
                        numColumns={1}
                        contentContainerStyle={styles.TeamList}
                    /> :
                    <Text style={styles.TextError}>No teams yet.</Text>
                }

                <TextButton
                    text={
                        Platform.OS === "ios" ?
                            "Crear equipo" :
                            "Nuevo equipo"
                    }
                    color={
                        Platform.OS === "ios" ?
                            "black" :
                            "white"
                    }
                    size={16}
                    style={Platform.OS === "ios" ?
                        styles.ButtonIOS :
                        styles.ButtonAndroid
                    }
                    execute={() => setOpen(true)}
                />

                <BaseButton
                    icon={"filter"}
                    size={60}
                    color={
                        Platform.OS === "ios" ?
                            "black" :
                            "white"
                    }
                    execute={orderTeams}
                    style={Platform.OS === "ios" ?
                        styles.SortButtonIOS :
                        styles.SortButtonAndroid
                    }
                />
            </View>
        </View>
    );
};
