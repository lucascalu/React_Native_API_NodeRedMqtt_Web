// App.js
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

export default function App() {
  const [valorVariavel, setValorVariavel] = useState('');

  const fetchVariavel = async () => {
    try {
      const response = await fetch('http://ip-do-seu-servidor-node:3000');
      const data = await response.json();
      setValorVariavel(data.minhaVariavel);
    } catch (error) {
      console.error('Erro ao buscar valor da variável:', error);
    }
  };

  useEffect(() => {
    // Busca o valor da variável inicialmente
    fetchVariavel();

    // Define um intervalo para buscar o valor da variável a cada 5 segundos
    const interval = setInterval(() => {
      fetchVariavel();
    }, 5000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Valor da variável: {valorVariavel}</Text>
    </View>
  );
}
