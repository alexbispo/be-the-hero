import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: 'Man', value: ''};
  }

  setName = () => {
    this.setState({
      name: this.state.value
    });
  }

  handleInputChange = (event) => {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div>
        <input type="text" onKeyUp={this.setName} value={this.state.value} onChange={this.handleInputChange}/>
        <h1>Hello {this.state.name}!</h1>
    </div>
    );
  }
  
}

export default App;
