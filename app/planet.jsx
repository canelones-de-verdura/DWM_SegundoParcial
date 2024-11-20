import { Dimensions, StyleSheet, View, Text, ActivityIndicator, FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import PicComponent from "../components/pic";
import { useEffect, useState } from "react";
import ApiService from "../services/ApiService";
import { MyModal } from "../components/addModal";
import { BaseButton } from "../components/buttons/ButtonComponent";
import { useRouter } from "expo-router";

export default function Planet() {
    const { planetid } = useLocalSearchParams();

    const router = useRouter();
    const [planet, setPlanet] = useState(null);
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(false);

    const getPlanet = async () => {
        const res = await ApiService.get(planetid);

        if (res.code === 200)
            setPlanet(res.data);
    };

    const deletePlanet = async () => {
        const res = await ApiService.delete(planetid);

        if (res.code === 200)
            router.back();
    };

    const renderMoons = (item) => {
        const moon = item.item;

        return (
            <Text style={styles.TextDesc}>{moon}</Text>
        );
    };

    useEffect(() => {
        getPlanet();
    }, [update]);

    if (!planet)
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
                    planet={planet}
                />
                <View style={styles.Header}>
                    <PicComponent size={200} image={planet.image} />
                    <Text style={styles.TextTitle}>{planet.name}</Text>
                </View>
                <Text style={styles.TextDesc}>
                    {planet.description}
                    {' '}
                    {planet.moons > 0 ? planet.moons : "No"}
                    {planet.moons > 1 ? " moons." : " moon."}
                </Text>
                {planet.moon_names.length > 0 ?
                    <FlatList
                        data={planet.moon_names}
                        renderItem={renderMoons}
                        keyExtractor={item => planet.moon_names.indexOf(item)}
                        numColumns={1}
                        contentContainerStyle={styles.MoonList}
                    /> :
                    <></>
                }
                <BaseButton
                    icon={"pencil-outline"}
                    size={40}
                    color={"black"}
                    execute={() => setOpen(true)}
                    style={styles.Button1}
                />
                <BaseButton
                    icon={"trash"}
                    size={40}
                    color={"red"}
                    execute={deletePlanet}
                    style={styles.Button2}
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

    MoonList: {
        width: window.width * .85,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 30,
    },

    PlanetList: {
        width: window.width * .85,
        paddingBottom: 30,
    },

    PlanetCard: {
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

    PlanetName: {
        marginLeft: 20,
        fontWeight: "bold",
    },

    Button1: {
        position: "absolute",
        bottom: 20,
        right: 20,
    },

    Button2: {
        position: "absolute",
        bottom: 20,
        right: 60,
    },
})
