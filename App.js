import React, { Component } from "react";

import Buscador from "./componentes/Buscador";
import Resultado from "./componentes/Resultado";

class App extends Component {
  state = {
    termino: "",
    imagenes: [],
    pagina: "",
  };

  //botones ANTERIOR Y SIGUIENTE
  paginaanterior = () => {
    let pagina = this.state.pagina;

    //leer si la pagina es 1 , ya no ir hacia atras
    if (pagina === 1) return null;

    //sumar uno ala pagina actual

    pagina -= 1;

    //agregar el cambio al state

    this.setState(
      {
        pagina,
      },
      () => {
        this.consultarApi();
      }
    );
    //console.log(pagina);
  };
  paginasiguiente = () => {
    //leer el state de la pagina actual

    let pagina = this.state.pagina;

    //sumar uno ala pagina actual

    pagina += 1;

    //agregar el cambio al state

    this.setState(
      {
        pagina,
      },
      () => {
        this.consultarApi();
      }
    );
    //console.log(pagina);
  };
  consultarApi = () => {
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=1732750-d45b5378879d1e877cd1d35a6&q=${termino}&per_page=30&page=${pagina}`;

    //leemos el JSON
    fetch(url)
      .then((respuesta) => respuesta.json())
      .then((resultado) => this.setState({ imagenes: resultado.hits }));
  };

  datosBusqueda = (termino) => {
    this.setState(
      {
        termino: termino,
        pagina: 1,
      },
      () => {
        this.consultarApi();
      }
    );
  };
  render() {
    return (
      <div className="App container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de imagenes</p>
          <Buscador datosBusqueda={this.datosBusqueda} />
        </div>
        <div className="row justify-content-center">
          <Resultado
            imagenes={this.state.imagenes}
            paginaanterior={this.paginaanterior}
            paginasiguiente={this.paginasiguiente}
          />
        </div>
      </div>
    );
  }
}
export default App;
