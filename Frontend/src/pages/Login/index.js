import './styles.css';
import React, {useState} from 'react';


import { Link, useHistory} from 'react-router-dom';
import heroesImage from  '../../assets/heroes.png'
import logo from '../../assets/logo.svg'
import {FiLogIn} from 'react-icons/fi'

//Api
import api from '../../services/api';

/** 
 * Criando um componente
 * ----------------------
 * 1º)Importar o React
 * 2º)Exportar o componente
 * 3°)Para ter o autocomplete das tags jsx CTRL + SHIFT + P -> (preferences)settings.json e adicionar
 * "emmet.syntaxProfiles":{"javascript":"jsx"},
 * "emmet.includeLanguages":{"javascript":"javascriptreact"}
 **/

 export default function Login() {

    //State
    const [id, setId] = useState('' );

    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const callBackPost = await api.post('session', { id });

            //Guardar no storage do navegador
            localStorage.setItem('ong_id', id);
            localStorage.setItem('ong_name', callBackPost.data.name);
            history.push('profile');

        } catch (err) {
            alert('Falha no Login, tente novamente');
        }
    }

     return(
        <div className="login-container">
            <section className="form">
                <img src={logo} alt="Be The Heroe" />
                <form onSubmit={handleLogin}>
                    <h1>Faça seu Login</h1>
                    <input 
                        type="text" 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>
                    <Link to="register" className="back-link">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImage} alt="Heroes png"/>
        </div>
     );
 }

 