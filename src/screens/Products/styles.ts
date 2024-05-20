import { StyleSheet } from "react-native";

const style = StyleSheet.create({
    main: { flex: 1, justifyContent: 'center' },
    card: {
        backgroundColor: 'white',
        width: 185,
        paddingBottom: 15,
        margin: 5,
        borderRadius: 20,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    image:{borderTopLeftRadius: 20, borderTopRightRadius: 20,marginBottom:10},
    star:{color:"orange"}
})
export default style;