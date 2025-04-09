import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";

export default function App() {
  const [numeroSorteado, setNumeroSorteado] = useState(Math.floor(Math.random() * 100) + 1); 
  const [tentativa, setTentativa] = useState('');
  const [tentativasRestantes, setTentativasRestantes] = useState(5);  
  const [message, setMessage] = useState("Tente adivinhar o número!");
  const [textButton, setTextButton] = useState("Verificar");

  function gerarNovoJogo() {
    setNumeroSorteado(Math.floor(Math.random() * 100) + 1); 
    setTentativasRestantes(5);
    setTentativa('');
    setMessage("Tente adivinhar o número!");
    setTextButton("Verificar");
  }

  function verificarTentativa() {
    const numeroChutado = parseInt(tentativa);
    
    if (isNaN(numeroChutado)) {
      setMessage("Por favor, insira um número válido.");
      return;
    }

    if (tentativasRestantes > 1) {
      if (numeroChutado < numeroSorteado) {
        setTentativasRestantes(tentativasRestantes - 1);
        setMessage(`Seu chute foi baixo! Tente novamente. Tentativas restantes: ${tentativasRestantes - 1}`);
      } else if (numeroChutado > numeroSorteado) {
        setTentativasRestantes(tentativasRestantes - 1);
        setMessage(`Seu chute foi alto! Tente novamente. Tentativas restantes: ${tentativasRestantes - 1}`);
      } else {
        setMessage(`Parabéns! Você acertou o número ${numeroSorteado}!`);
        setTextButton("Jogar novamente");
      }
    } else {
      if (numeroChutado === numeroSorteado) {
        setMessage(`Parabéns! Você acertou o número ${numeroSorteado}!`);
      } else {
        setMessage(`Você esgotou suas tentativas! O número era ${numeroSorteado}.`);
      }
      setTextButton("Jogar novamente");
    }

    setTentativa('');
  }

  function handlePlayAgain() {
    gerarNovoJogo();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Adivinhe o Número</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.subTitle}> </Text>

        <TextInput
          style={styles.input}
          value={tentativa}
          onChangeText={setTentativa}
          placeholder='Insira o número aqui'
          keyboardType='numeric'
        />

        <TouchableOpacity 
          style={styles.button}
          onPress={textButton === "Verificar" ? verificarTentativa : handlePlayAgain}
        >
          <Ionicons name="search" size={24} color="#edf2f4" />
          <Text style={styles.text}>{textButton}</Text>
        </TouchableOpacity>

        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{message}</Text>
        </View>

      </View>
      <StatusBar style='light' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#008B8B',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 130,
    backgroundColor: '#008B8B',
    borderBottomStartRadius: 25,
    borderBottomEndRadius: 25,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  content: {
    flex: 1,
    padding: 40,
    width: '100%',
    backgroundColor: '#E0FFFF'
  },
  subTitle: {
    textAlign: 'center',
    fontSize: 24,
    color: '#008B8B',
    fontWeight: 'bold',
    marginBottom: 40,
  },
  label: {
    color: '#fff',
    fontSize: 18,
  },
  input: {
    height: 45,
    width: '100%',
    fontSize: 18,
    borderColor: '#008B8B',
    borderBottomWidth: 2
  },
  button: {
    width: "100%",
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#008B8B',
    borderRadius: 15,
    marginTop: 40,
    marginBottom: 10,
  },
  text: {
    color: '#edf2f4',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  resultContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  resultText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold'
  }
});
