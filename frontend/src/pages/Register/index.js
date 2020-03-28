import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import './styles.css';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      whatsapp: '',
      city: '',
      uf: ''
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post('/ongs', this.state);

      alert(`Seu ID é: ${response.data.id}`);

      this.props.history.push('/');
    } catch (error) {
      console.error(error);
      alert('Um erro aconteceu, tente novamente mais tarde!');
    }
  }

  handleChangeName = (event) => {
    this.setState({name: event.target.value});
  }

  handleChangeEmail = (event) => {
    this.setState({email: event.target.value});
  }

  handleChangeWhatsApp = (event) => {
    this.setState({whatsapp: event.target.value});
  }

  handleChangeCity = (event) => {
    this.setState({city: event.target.value});
  }

  handleChangeUf = (event) => {
    this.setState({uf: event.target.value});
  }

  render() {
    return (
      <div className="register-container">
        <div className="content">
          <section>
            <img src={logoImg} alt="Be The Hero"/>

            <h1>Cadastro</h1>
            <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

            <Link to="/" className="back-link">
              <FiArrowLeft size={16} color="#E02041" />
              Não tenho cadastro
            </Link>
          </section>

          <form onSubmit={this.handleSubmit}>
            <input type="text" name="name" placeholder="Nome da ONG" value={this.state.name} onChange={this.handleChangeName}/>
            <input type="email" placeholder="E-mail" value={this.state.email} onChange={this.handleChangeEmail} />
            <input type="text" placeholder="WhatsApp" value={this.state.whatsapp} onChange={this.handleChangeWhatsApp} />

            <div className="input-group">
              <input type="text" placeholder="Cidade" value={this.state.city} onChange={this.handleChangeCity} />
              <input type="text" placeholder="UF" style={{ width: 80 }} value={this.state.uf} onChange={this.handleChangeUf} />
            </div>

            <button type="submit" className="button">Cadastrar</button>
          </form>
        </div>
      </div>
    );
  }
}
