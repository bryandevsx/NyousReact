import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Menu from '../../components/menu';
import Rodape from '../../components/rodape';
import logo from '../../assets/img/logo.png'
import { Form, Container, Button } from 'react-bootstrap';
import './index.css';
import {url} from '../../utils/constants'


const Login = () => {

    let history = useHistory();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('')
    
    const logar = (event) => {
        event.preventDefault();
    
        console.log(` ${email} - ${senha} `)
    
        fetch( url + '/login' ,{
            method : 'POST',
            body : JSON.stringify({
                email : email,
                senha : senha
            }),
            headers : {
                'content-type' : 'application/json'
            }
        })
        .then(response => {
            if(response.ok){
                return response.json();
            }
            alert('Dados invalidos')
        })
        .then(data => {           
            localStorage.setItem('token-nyous', data.token);
            
            let usuario = jwt_decode(data.token);

            if(usuario.role === 'adm'){
                history.push('/admin/dashboard')
            }else{
                history.push('/eventos')
            }
            
            console.log(usuario);

            history.push('/eventos');
        })
        .catch(err => console.log(err))
    }

    return(
        <div>
            <Menu />
            <Container className='form-height'>
                <Form className='form-signin' onSubmit={event => logar(event)} >
                    <div className="text-center">
                        <img src={logo} alt="Nyous" style={{width : "64px"}}/>
                    </div>
                    <br/>
                    <small>Informe os dados Abaixo</small>
                    
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Informe o email" value={email} onChange={event => setEmail(event.target.value)} required />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control type="password" placeholder="Informe a senha" value={senha} onChange={event => setSenha(event.target.value)} required />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Enviar
                        </Button>
                        <br/><br/>
                        <a href="/cadastrar" style={{marginTop: '30px'}}>Não tenho conta!</a>
                </Form>
            </Container>
            <Rodape />
        </div>
    )
}


export default Login;