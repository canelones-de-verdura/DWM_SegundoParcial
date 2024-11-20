import { StyleSheet, Text, View, FlatList, Platform, Dimensions, Pressable, ActivityIndicator } from "react-native";
import ApiService from "../services/ApiService";
import { useEffect, useState } from "react";
import PicComponent from "../components/pic";
import { useRouter } from "expo-router";
import { MyModal } from "../components/addModal";
import { BaseButton } from "../components/buttons/ButtonComponent";
import { useIsFocused } from "@react-navigation/native";

export default function Index() {
    const router = useRouter();
    const focused = useIsFocused();
    const [planets, setPlanets] = useState(null);
    const [sorted, setSorted] = useState(false);
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(false);

    const getPlanets = async () => {
        const res = await ApiService.get(null);

        if (res.code === 200)
            setPlanets(res.data);
    };

    const goToPlanetDetails = (planet) => {
        router.push({
            pathname: "/planet",
            params: {
                planetid: planet.id,
            }
        });
    };

    const orderPlanets = () => {
        if (!sorted) {
            const sortedPlanets = [...planets].sort((a, b) => b.moons - a.moons);
            setPlanets(sortedPlanets);
        } else {
            setUpdate(!update)
        }
        setSorted(!sorted)
    };

    const renderPlanetCard = (item) => {
        const planet = item.item;

        return (
            <Pressable onPress={() => goToPlanetDetails(planet)}>
                <View style={styles.PlanetCard}>
                    <PicComponent size={100} image={planet.image} />
                    <Text style={styles.PlanetName}>{planet.name}</Text>
                </View>
            </Pressable>
        );
    };

    useEffect(() => {
        getPlanets();
    }, [update, focused]);

    if (!planets)
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
                {planets.length > 0 ?
                    <FlatList
                        data={planets}
                        renderItem={renderPlanetCard}
                        keyExtractor={item => item.id}
                        numColumns={1}
                        contentContainerStyle={styles.PlanetList}
                    /> :
                    <Text style={styles.TextError}>No planets yet.</Text>
                }

                <BaseButton
                    icon={"add"}
                    size={60}
                    color={"white"}
                    execute={() => setOpen(true)}
                    style={Platform.OS === "ios" ? styles.ButtonIOS : styles.ButtonAndroid}
                />

                <BaseButton
                    icon={"filter"}
                    size={60}
                    color={"white"}
                    execute={orderPlanets}
                    style={styles.SortButton}
                />
            </View>
        </View>
    );
};

const window = Dimensions.get("window");

const styles = StyleSheet.create({
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

    PlanetList: {
        width: window.width * .85,
        paddingBottom: 30,
    },

    PlanetCard: {
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

    PlanetName: {
        marginLeft: 20,
        fontWeight: "bold",
    },

    ButtonAndroid: {
        backgroundColor: "lightblue",
        borderRadius: 60,

        position: "absolute",
        bottom: 20,
        right: 20,
    },

    ButtonIOS: {
        backgroundColor: "lightgreen",
        borderRadius: 60,

        position: "absolute",
        bottom: 20,
        right: 20,
    },

    SortButton: {
        backgroundColor: "lightblue",
        borderRadius: 60,

        position: "absolute",
        bottom: 100,
        right: 20,
    },
})
