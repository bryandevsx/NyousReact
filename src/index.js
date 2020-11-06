import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './pages/home';
import Login   from './pages/login';
import Cadastrar  from './pages/cadastrar';
import Eventos from './pages/eventos';
import NaoEncontrada  from './pages/naoencontrada';
import Dashboard from './pages/admin/dashboard';
import CrudCategorias from './pages/admin/crudcategorias';
import CrudEventos from './pages/admin/crudeventos';
import jwt_decode from 'jwt-decode'


import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import SemPermissao from './pages/sempermissao';

const RotaPrivada = ({componet : Componet, ...rest}) => (
  <Route
    {...rest}
    render={ props => 
        localStorage.getItem('token-nyous') !== null ?
          (<Componet {...props}/>) : 
          (<Redirect to={{ pathname : '/login', state :{from : this.props.location}}} />)
    }
  />
);

const RotaPrivadaAdm = ({componet : Componet, ...rest}) => (
  <Route
    {...rest}
    render={ props => 
        localStorage.getItem('token-nyous') !== null && jwt_decode(localStorage.getItem('token-nyous')).role === 'Admin' ?
          (<Componet {...props}/>) : 
          (<Redirect to={{ pathname : '/login', state :{from : this.props.location}}} />)
    }
  />
);

// Define as rotas da aplicação
const routing = (
  <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/cadastrar" component={Cadastrar}/>
        <RotaPrivada path="/eventos" component={Eventos}/>
        <RotaPrivadaAdm path="/admin/dashboard" component={Dashboard}/>
        <RotaPrivadaAdm path="/admin/categorias" component={CrudCategorias}/>
        <RotaPrivadaAdm path="/admin/eventos" component={CrudEventos}/>
        <Route path="/naoencontrada" component={NaoEncontrada}/>
        <Route path="/sempermissao" component={SemPermissao}/>
      </Switch>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
