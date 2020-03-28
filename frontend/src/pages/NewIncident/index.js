import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import './styles.css';

export default class NewIncident extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      value: ''
    };
  }

  componentDidMount() {
    if (!localStorage.getItem('ongId')) {
      this.props.history.push('/');
      return;
    }
  }

  handleTitleChanges = (event) => {
    this.setState({title: event.target.value});
  }

  handleDescriptionChanges = (event) => {
    this.setState({description: event.target.value});
  }

  handleValueChanges = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const ongId = localStorage.getItem('ongId');

    try {
      await api.post('/incidents', this.state, {
        headers: {
          'Authorization': ongId
        }
      });

      alert('Novo caso cadastrado com sucesso!');

      this.props.history.push('/profile');

    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro, por favor, tente novamente mais tarde.');
    }
  }

  render() {
    return (
      <div className="new-incident-container">
        <div className="content">
          <section>
            <img src={logoImg} alt="Be The Hero"/>

            <h1>Cadastrar novo caso</h1>
            <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

            <Link to="/profile" className="back-link">
              <FiArrowLeft size={16} color="#E02041" />
              Voltar para home
            </Link>
          </section>

          <form onSubmit={this.handleSubmit}>
            <input type="text"
              placeholder="Título do caso"
              value={this.state.title}
              onChange={this.handleTitleChanges}/>

            <textarea
              placeholder="Descrição"
              value={this.state.description}
              onChange={this.handleDescriptionChanges} />

            <input type="text"
              placeholder="Valor em reais"
              value={this.state.value}
              onChange={this.handleValueChanges}/>

            <button type="submit" className="button">Cadastrar</button>
          </form>
        </div>
      </div>
    );
  }
}
