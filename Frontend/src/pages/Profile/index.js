import './styles.css';
import React, { useEffect, useState } from 'react';
import { Link, useHistory} from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

//import heroesImage from  '../../assets/heroes.png'
import logo from '../../assets/logo.svg'


//API
import api from '../../services/api';



export default function Profile() {
    //State
    const [incidents, setIncidents] = useState([]);

    const history = useHistory();
    
    const name = localStorage.getItem('ong_name');
    const ong_id = localStorage.getItem('ong_id')

    //Use effect recebe 2 parametros
    //1- Qual função vai ser disparada
    //2- Quando vai ser executada
    //Toda vez que o valor do array mudar, executa a função novamente
    //Se o array ficar vazio, executa uma única vez no fluxo do componente
    useEffect(() => {
        api.get('profile', {
            headers: {
                authorization: ong_id
            }
        }).then(response => { //Retorno da request
            setIncidents(response.data);
        }).catch(err => {
            console.log(err);
        })
    }, [ong_id]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    authorization: ong_id
                } 
            });

            //Atulizar lista logo ao excluir
            setIncidents(incidents.filter(incident => incident.id != id))
        } catch (err) {
            alert('Erro ao deletar um caso. Tente Novamente!');
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logo} alt="Be The Heroes" />
                <span>Bem vinda, {name} </span>
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {
                    incidents.map(incident => (
                        <li key={incident.id}>
                            <strong>CASO:</strong>
                            <p>{incident.title}</p>

                            <strong>DESCRIÇÃO:</strong>
                            <p>{incident.description}</p>

                            <strong>VALOR:</strong>
                            <p>{Intl.NumberFormat('pt-br', { style:"currency", currency:"BRL" })
                            .format(incident.value)}</p>
                            
                            {/*
                                Usar o formato de arrow function quando precisar executar uma
                                função com parametros
                            */}
                            <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                                <FiTrash2 size={20} color="#a8a8b3" />
                            </button>
                        </li>

                    ))

                }
            </ul>

        </div>
    );
}

