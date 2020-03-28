import React from 'react';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

//Para chamar outras apps dentro do react native usar o Linking
//useRoute -  serve para buscar informações da página atual

//Joga todas as importaçoes do arquivo para dentro da variavel
import * as MailComposer from 'expo-mail-composer';


//icones
import { Feather, FontAwesome5 } from '@expo/vector-icons'

//Não precisamos colocar o @. O react importa a imagem conforme a tela automático.
import logoImg from '../../assets/logo.png'

//Styles
import styles from './styles';

export default function Detail() {

  const navigation = useNavigation();

  const route = useRoute();

  //Incident que veio como parametro da outra página
  const incident = route.params.incident;

  //Variavel que vai ser usada no body do email
  const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR', {style : 'currency', currency:"BRL"})
  .format(incident.value)}.`

  function backToIncidents() {
    navigation.goBack(); //Função do react navigation
  }

  function sendEmail() {
    //Usar o pacote expo install expo-mail-composer
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}` , //Assunto
      recipients: [incident.email], //Destinatarios
      body: message //Conteudo
    })
  }

  function sendWhatsApp() {
    //Função para enviar mensagem no whatsapp
    Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
  }

  return (
    <View style={styles.container} >
      <View style={styles.header}>
        <Image source={logoImg} />
        <TouchableOpacity onPress={backToIncidents}>
          <Feather name="arrow-left" size={28} color="#E02041" />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
  <Text style={styles.incidentValue}>{incident.name} de {incident.city} - {incident.uf}</Text>

        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentValue}>
          {Intl.NumberFormat('pt-BR', { style: 'currency', currency: "BRL" })
            .format(incident.value)}
        </Text>

      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroeTitle}>Salve o dia!</Text>
        <Text style={styles.heroeTitle}>Seja o herói desse caso.</Text>

        <Text style={styles.heroeDescription}>Entre em contato</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
            <FontAwesome5 name="whatsapp" size={18} color="#FFF" />
            <Text style={[styles.actionText, { paddingLeft: 5 }]}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={sendEmail}>
            <Feather name="mail" size={18} color="#FFF" />
            <Text style={[styles.actionText, { paddingLeft: 5 }]}>E-mail</Text>
          </TouchableOpacity>
        </View>

      </View>



    </View>

  );
}