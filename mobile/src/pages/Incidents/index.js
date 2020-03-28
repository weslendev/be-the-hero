import React, {useEffect , useState} from 'react';
import  { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//icones
import { Feather } from '@expo/vector-icons'

//Não precisamos colocar o @. O react importa a imagem conforme a tela automático.
import logoImg from '../../assets/logo.png'

//Styles
import styles from './styles';

//api
import api from '../../services/api';

export default function Incidents() {
    const navigation = useNavigation();
    
    const[incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);

    //Controlar Paginação que começa em 1
    const [page, setPage] = useState(1);

    //Controlar a busca de dados de novos, para evitar que os dados em tela sejam recarregados
    const [loading, setLoading] = useState(false);

    function navigateToDetail( incident ) {
        //Recebe como parametro a propriedade NAME da nossa rota
        navigation.navigate('Detail', { incident }); //recebe como 2 argumento os dados que queremos usar
                                          //na próxima página.
    }

    async function loadIncidents (){

        //Se loading for true, evita que outra request seja feita
        if(loading){
            return;
        }
        
        //Não buscar mais informações caso já carregou todas
        if(total > 0 && incidents.length == total){
            return;
        }

        setLoading(true);
        
            const response = await api.get('incidents', {
                params: { page }
            });

            //Anexando 2 vetores em um unico vetor
            setIncidents([...incidents, ...response.data]);

            setTotal(response.headers['X-Total-Count']); //veio com os headers
           setPage(page + 1); //Pular para próxima página
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    },[])

  return (
    <View style={styles.container} >
        <View style={styles.header}>
            <Image source={logoImg} />
            <Text style={styles.headerText}>
                Total de  <Text style={styles.headerTextBold}>{total} caso(s)</Text>
            </Text>
        </View>

        <Text style={styles.title}>Bem-Vindo!</Text>
        <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>
        
        {/*Usar FlatList - para fazer a listagem*/}
        <FlatList 
            data={incidents} //Array com os dados
            style={styles.incidentList}
            keyExtractor={incident => String(incident.id)} //Equivalente ao key do reactJS
            showsVerticalScrollIndicator={false} //remove o indicador do scroll
            onEndReached={loadIncidents} //quando o scroll chegar ao fim, recarregar mais
            onEndReachedThreshold={0.2}//quando tiver 20%d  do final da lista carrega mais
            //Função responsável por renderizar cada item, usamos chaves pq irá retornar um jsx
            renderItem={({ item:incident }) => ( 
                <View  style={styles.incident}>
                    <Text style={styles.incidentProperty}>ONG:</Text>
                    <Text style={styles.incidentValue}>{incident.name}</Text>

                    <Text style={styles.incidentProperty}>CASO:</Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>

                    <Text style={styles.incidentProperty}>Valor:</Text>
                    <Text style={styles.incidentValue}>
                        {Intl.NumberFormat('pt-BR', {style : 'currency', currency:"BRL"})
                        .format(incident.value)}
                    </Text>
                    {/*Sempre que precisar passar parametros para uma funcao usar arrow function antes */}
                    <TouchableOpacity style={styles.detailButton} onPress={() =>navigateToDetail(incident)}>
                        <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                        {/*Icone*/}
                        <Feather name="arrow-right" size={16} color="#E02041" />
                    </TouchableOpacity>
                </View>                 

            )} 
        />

            </View>

  );
}