import './styles.css';
import React, { useState } from 'react';
import { Link, useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

//import heroesImage from  '../../assets/heroes.png'
import logo from '../../assets/logo.svg'

//API
import api from '../../services/api';

export default function NewIncident() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ong_id = localStorage.getItem('ong_id');

    const history = useHistory();

    async function handleNewIncident (e) {
        e.preventDefault();
        const data = {
            title,
            description,
            value
        };

        try {
            await api.post('incidents', data, {
                headers: {
                    authorization: ong_id
                }
            });
            history.push('/profile');
        } catch (err) {
            alert('Erro ao cadastrar um caso. Tente novamente!');
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logo} alt="Be The Heroes" />
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreve o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link to="/profile" className="back-link">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para Home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Título do caso" 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    
                    <textarea 
                        placeholder="Descrição"
                        value={description} 
                        onChange={e => setDescription(e.target.value)}
                    />
                    
                    <input 
                        placeholder="Valor em reais"
                        value={value} 
                        onChange={e => setValue(e.target.value)}
                    />
                    
                    
                    <button type="submit" className="button">
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
}

