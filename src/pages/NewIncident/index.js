import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';
import Logo from '../../assets/logo.svg';


export default function NewIncident(){

    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const history = useHistory();

    const ongId = localStorage.getItem('ongId');

    async function handleNewIncident(e){
        e.preventDefault();

        const data = {
            titulo,
            descricao,
            valor,
        };
        
        try {
            const response = await api.post('incidents',data, {
                headers: {
                    Authorization: ongId,
                }
            });
            alert(`Cadastro realizado com sucesso. Caso No.${response.data.id}`)
            history.push('/profile');
        } catch (error) {
            alert('Erros ao cadastrar novo Caso. Tente novamente.')
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={Logo} alt="Be the Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver.</p>
                    <Link className="back-link" to='/profile'>
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input placeholder="Titulo do Caso"
                        value={titulo}
                        onChange={e => setTitulo(e.target.value)}
                    />
                    <textarea placeholder="Descrição"
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)}
                    />
                    <input placeholder="Valor em Reais"
                        value={valor}
                        onChange={ e => setValor(e.target.value)}
                    />
                    <div className="botoes-incident">
                        <button className="button" type="submit">Cadastrar</button>
                        <button className="btn-cancelar" type="button">
                            <Link className="" to='/profile'>Cancelar</Link>
                        </button>
                    </div>
                    
                </form>
            </div>
        </div>
    );
}