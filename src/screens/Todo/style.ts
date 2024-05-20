import { StyleSheet } from "react-native";

const style = StyleSheet.create({
    safeView: { flex: 1, marginBottom: 29 },
    actionSheetView: { paddingHorizontal: 10, paddingVertical: 20 },
    dropdown: {
        width: 120,
        paddingHorizontal: 5,
        marginLeft: 10,
        marginBottom: 5,
    },
    colorBox: {
        width: 25,
        height: 15,
        marginRight: 20,
    },
    actionOutCtr: { flexDirection: 'row' },
    actionInCtr: { flexDirection: 'column', flex: 1 },
    colorCtr: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10,
        paddingHorizontal: 15,
    },
    list: { flex: 1, paddingTop: 10 },
    deleteBtn: {
        backgroundColor: 'red',
        height: '100%',
        justifyContent: 'center',
        paddingHorizontal: 15,
        borderRadius: 30,
    },
    listItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: 'white',
        borderRadius: 30,
        paddingVertical: 8,
        marginHorizontal: 10,
    },
    dropdown2: {
        width: 20,
        height: 20,
        borderRadius: 20,
        marginRight: 10,
    },
    listItemText:{fontSize: 18, width: 120}
})
export default style