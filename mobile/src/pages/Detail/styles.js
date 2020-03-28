import { StyleSheet } from 'react-native'

//Adicionado com expo install expo-constants
//Serve para alterar as constantes do projeto
import Constants from 'expo-constants';


export default StyleSheet.create({
    container: {
        flex:1, //Ocupará todo espaço
        paddingHorizontal: 24, //paddings nas laterais equivale a padding 0 24px
        paddingTop: Constants.statusBarHeight + 20,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    incident: {
        padding:24,
        borderRadius:8,
        backgroundColor: '#FFF',
        marginBottom:16,
        marginTop:48,
    },
    incidentProperty: {
        fontSize: 14,
        color: "#41414d",
        fontWeight: "bold",
        marginTop:24,
    },
    incidentValue: {
        marginTop:8,
        fontSize:15,
        color:"#737380"
    },

    contactBox: {
        padding:24,
        borderRadius:8,
        backgroundColor: '#FFF',
        marginBottom:16,
    },
    heroeTitle: {
        fontWeight: "bold",
        fontSize:20,
        color:"#13131a",
        lineHeight: 30
    },
    heroeDescription: {
        fontSize:15,
        color:"#737380",
        marginTop:16,
    },
    actions: {
        marginTop:16,
        flexDirection:"row",
        justifyContent: "space-between"
    },
    action: {
        backgroundColor:"#e02041",
        borderRadius:8,
        height:50,
        width:"48%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection:"row", //Alinha o texto e o icone
    },
    actionText: {
        color: "#FFF",
        fontSize:15,
        fontWeight:"bold",
    }

});