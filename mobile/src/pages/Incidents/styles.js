import { StyleSheet } from 'react-native';

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

    headerText: {
        fontSize:15,
        color: "#737380"
    },
    headerTextBold:{
        fontWeight: "bold"
    },
    title: {
        fontSize:30,
        marginBottom:16,
        marginTop:48,
        color: "#13131a",
        fontWeight: "bold"
    },

    description: {
        fontSize: 16,
        lineHeight:24,
        color:"#737380"
    },

    incidentList: {
        marginTop: 32,
    },
    incident: {
        padding:24,
        borderRadius:8,
        backgroundColor: '#FFF',
        marginBottom:16
    },

    incidentProperty: {
        fontSize: 14,
        color: "#41414d",
        fontWeight: "bold",
    },
    incidentValue: {
        marginTop:8,
        fontSize:15,
        marginBottom:24,
        color:"#737380"
    },

    detailButton :{
        flexDirection:"row", //Alinha o texto e o icone
        justifyContent:"space-between" //joga cada componente o máximo para esquerda e direita
    },
    detailsButtonText: {
        color: "#e02041",
        fontSize: 15,
        fontWeight: "bold"
    }


});