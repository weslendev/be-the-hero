import React from 'react';

//Rotas
import Routes from './src/routes';

//Intl: instalar com yarn add intl (no react-native não temos por default)
//Chamar aqui no App, que estara disponivel em toda aplicação.
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

export default function App() {
  return (
    <Routes />
  );
}
