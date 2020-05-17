import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import './styles.css';
import '../../global.css';
import Logo from '../../assets/logo.svg'
import api from '../../services/api';




export default function Register(){

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            nome,
            email,
            whatsapp,
            cidade,
            uf,
        };

        try {
            const response = await api.post('ongs', data);            
            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/');

        } catch (error) {
            alert('Erro no cadastro! Tente novamente mais tarde');
        }

        
    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={Logo} alt="Be the Hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                    <Link className="back-link" to='/'>
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para Logon
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome da ONG"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />
                    <input 
                    placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />
                    <div className="input-group">
                        <input placeholder="Cidade"
                            value={cidade}
                            onChange = { e => setCidade(e.target.value)}
                        />
                        <input placeholder="UF" style={{width: 80}}
                            value={uf}
                            onChange = { e => setUf(e.target.value)}
                        />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}