import './styles.css';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

//import heroesImage from  '../../assets/heroes.png'
import logo from '../../assets/logo.svg'

//Importando api
import api from '../../services/api';
export default function Register() {

    //Serve para fazer a navegação
    const history = useHistory();

    //state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [uf, setUf] = useState('');
    const [city, setCity] = useState('');

    async function handleRegister(e) {
        e.preventDefault();//previne de atualizar a página

        const data = {
            name,
            email,
            whatsapp,
            uf,
            city
        };

        //Enviando para api
        //1º Parametro: rota
        //2º Parametro: dados(por padrão o axios já envia no formato json)
        //Colocamos na const callBackPost para ter a resposta do post
        try {
            const callbackPost = await api.post('ongs', data);
            alert(`Seu ID de acesso: ${callbackPost.data.id}`);

            //Envia para rota raiz
            history.push('/');
        }
        catch (err) {
            alert('Erro no cadastro. Tente novamente.');
        }
    }


    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logo} alt="Be The Heroes" />
                    <h1>Faça seu Cadastro</h1>
                    <p>Entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                    <Link to="/" className="back-link">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)} //Atualizando o valor do input
                    />
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input
                        placeholder="whatsapp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />

                        <input
                            placeholder="UF"
                            style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="button">
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
}

