import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';


//Este componente vai por volta de todas as rotas
import { NavigationContainer } from '@react-navigation/native';


//Pages
import Incidents from './pages/Incidents';
import Detail from './pages/Detail';
/**
No AppStack.navigator para esconder o header que vem por padrão: screenOptions={{ headerShown:false }}

**/

const AppStack = createStackNavigator();

export default function Routes() {
    return(
    <NavigationContainer>
        <AppStack.Navigator screenOptions={{ headerShown:false }}>
            <AppStack.Screen name="Incidents" component={Incidents} /> 
            <AppStack.Screen name="Detail" component={Detail} /> 
        </AppStack.Navigator>
    </NavigationContainer>
    );
};