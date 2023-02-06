import React, { useState } from 'react';
import { Alert, View, ScrollView, Text, StatusBar, Image, Button, StyleSheet, TextInput } from 'react-native';


export default function App(){
  const [PersonagemValue, setPersonagemValue] = useState(null)
  const [PersonagemEscolhido, setPersonagemEscolhido] = useState(null);
  const consultaPersonagem = async ()=>{
    const endpoint = `https://rickandmortyapi.com/api/character/${PersonagemValue}`
   
  try{
    const resposta = await fetch(endpoint);
    const json = await resposta.json();
   
   
    setPersonagemEscolhido({
      id:json.id,
      nome:json.name,
      status: json.status,
      species: json.species,
      Genero: json.gender,
      Origem: json.origin.name,
      img:json.image,

    });
  } catch (err){
    Alert.alert('Erro','Não foi possível carregar os dados do Pokemon');
   
  }
}

return (
  <View style={styles.container}>
    <StatusBar
    backgroundColor="#00ba16"
    />
    <ScrollView>
      <View style={styles.topo}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: 'https://logosmarcas.net/wp-content/uploads/2022/01/Rick-And-Morty-Logo.png',
        }}
      />
      </View>

        <View style={styles.cardContainer}>
          <TextInput
          value={PersonagemValue}
          onChangeText={setPersonagemValue}
          placeholder='Informe o ID do personagem'
          />
          <Button title='Buscar Personagem' onPress={consultaPersonagem}/>
          <Button title='Gerar aleatório' onPress={() => {
           setPersonagemValue(Math.floor(Math.random() * 827))
           consultaPersonagem()
          }}/>

        </View>


        {PersonagemEscolhido != null && (
          
          <View style={styles.CharacterBox}>
            <Image resizeMode="stretch" source={{uri:PersonagemEscolhido.img}} style={styles.CharacterImg}></Image> 
            <Text style={styles.CharacterName}> id: {PersonagemEscolhido.id}</Text>
            <Text style={styles.CharacterName}> Nome: {PersonagemEscolhido.nome}</Text>
            <Text style={styles.Characterinfo}> Status: {PersonagemEscolhido.status}</Text>
            <Text style={styles.Characterinfo}> Espécie: {PersonagemEscolhido.species}</Text>
            <Text style={styles.Characterinfo}> Genero: {PersonagemEscolhido.Genero}</Text>
            <Text style={styles.Characterinfo}> Origem: {PersonagemEscolhido.Origem}</Text> 
          </View>
        )}

        
    </ScrollView>
  </View>


 )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
    tinyLogo: {
      height: 150,
      width: 300,
    },
  topo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 130,
    marginBottom: 50,
    backgroundColor: '#00f71d'
  },
  topoTitulo: {
    fontSize: 22,
    marginBottom: 0,
    color: '#000',
    textAlign: 'center',
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: "#d5d5d5",
    borderRadius: 4,
    marginBottom: 10,
    marginHorizontal: 20,
    padding: 10,
  },
  cardTitle: {
    fontSizze: 22,
    marginBottom: 20,
    textAlign: "center",
    color: "#656565"
  },
  CharacterBox: {
    alignItems: "center"
  },
  CharacterName: {
    fontSize: 22,
  },
  Characterinfo: {
    fontSize: 18,
  },
  CharacterImg: {
    width: 200,
    height: 200,
  },

})
