import React from 'react';
import { Link } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import './styles.css';

export default class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ongName: '',
      ongId: '',
      incidents: []
    };
  }

  async componentDidMount() {
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    if (!ongId) {
      return this.props.history.push('/');
    }

    const result = await api.get('/profile', {headers: {'Authorization': ongId}});

    this.setState({
      ongName,
      ongId,
      incidents: result.data
    });
  }

  handleDeleteIncident = async (id) => {
    try {
      if (window.confirm("Você tem certeza que deseja excluir este caso?")) {
        await api.delete(`/incidents/${id}`, {headers: {'Authorization': this.state.ongId}});

        const updatedIncidents = this.state.incidents.filter((e) => e.id !== id );
        this.setState({incidents: updatedIncidents});

        alert('Caso excluido com sucesso!');
      }
    } catch (error) {
      console.error(error);
      alert('Um erro aconteceu, por favor, tente novamente mais tarde.');
    }
  }

  handleLogout = () => {
    localStorage.clear();

    this.props.history.push('/');
  }

  render() {
    if (!this.state.ongName) {
      return (
      <span className="loading">Loading...</span>
      )
    } else {
      return (
        <div className="profile-container">
          <header>
            <img src={logoImg} alt="Be The Hero"/>
            <span>Bem vinda, {this.state.ongName}</span>

            <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
            <button type="button">
              <FiPower size={18} color="#E02041" onClick={this.handleLogout} />
            </button>
          </header>

          <h1>Casos cadastrados</h1>

          <ul>
            {this.state.incidents.map(incident => (
              <li key={incident.id}>
                <strong>CASO:</strong>
                <p>{incident.title}</p>

                <strong>DESCRIÇÂO:</strong>
                <p>{incident.description}</p>

                <strong>VALOR:</strong>
                <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                <button type="button">
                  <FiTrash2 size={20} color="#a8a8b3" onClick={() => this.handleDeleteIncident(incident.id)} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}
