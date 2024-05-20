import { StyleSheet } from "react-native";

const style = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modal: {
        backgroundColor: 'white',
        borderRadius: 20,
        maxWidth: 350,
    },
    mainView: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10,
        justifyContent: 'space-between',
        width: 300,
    },
    description: { alignItems: 'flex-start', width: 300 },
    abilityCtr: { flexDirection: 'row', columnGap: 10, marginTop: 10 },
    ability: { borderRadius: 20, backgroundColor: 'orange' }
});
export default style;