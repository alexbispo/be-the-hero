import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default class Logon extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: ''
    };
  }

  componentDidMount() {
    if (localStorage.getItem('ongId')) {
      return this.props.history.push('/profile');
    }
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post('/sessions', this.state);

      localStorage.setItem('ongId', response.data.id);
      localStorage.setItem('ongName', response.data.name);

      this.props.history.push('/profile');
    } catch (error) {
      if (error.response.status >= 500) {
        console.error(error);
        alert('Um erro aconteceu, por favor tente novamente mais tarde.');
      } else {
        alert(error.response.data.error);
      }
    }
  }

  handleIdChange = (event) => {
    this.setState({ id: event.target.value});
  }

  render() {
    return (
      <div className="logon-container">
        <section className="form">
          <img src={logoImg} alt="Be The Hero"/>

          <form onSubmit={this.handleSubmit}>
            <h1>Faça seu logon</h1>

            <input type="text" placeholder="Sua ID" value={this.state.id} onChange={this.handleIdChange}/>

            <button type="submit" className="button">Entrar</button>

            <Link to="/register" className="back-link">
              <FiLogIn size={16} color="#E02041" />
              Não tenho cadastro
            </Link>
          </form>
        </section>

        <img src={heroesImg} alt="Heroes"/>
      </div>
    );
  }
}
