import React, {useEffect, useState} from 'react'
import { Container, Table, Button, Card, Form } from 'react-bootstrap';
import {url} from '../../../utils/constants'
import Menu from '../../../components/menu'
import Rodape from '../../../components/rodape'
import Titulo from '../../../components/titulo';


const CrudCategorias = () => {
    const [id, setId] = useState(0);
    const [nome, setNome] = useState('');
    const [urlImagem, setUrlImagem] = useState('');
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        listar();
    },[]);

    const listar = () => {
        fetch( url + '/categorias' ,{
            method : 'GET'
        })
        .then(response => response.json())
        .then(data => {
            setCategorias(data.data)
            
            limparCampos()
        })
        .catch(err => console.log(err));
    }

    const editar = (event) => {
        event.preventDefault()

        fetch(`${url}/categorias/${event.target.value}`)
            .then(response => response.json())
            .then(dado => {
              setId(dado.data.id);
              setNome(dado.data.nome);
              setUrlImagem(dado.data.urlImagem);
            })

    }

    const remover = (event) => {
        event.preventDefault()

        fetch(url + '/categorias' + event.target.value, {
            method : 'DELETE',
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-nyous')
            }
        })
        .then(response => response.json())
        .then(dados => {
            alert('Categoria Removido!');
            listar();
        })
        .catch(err => console.log(err))
    }

    const uploadFile = (event) => {
        event.preventDefault();

        let formdata = new FormData();

        formdata.append('arquivo', event.targrt.files[0])

        fetch(`${url}/upload`, {
            method : 'POST',
            body : formdata
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setUrlImagem(data.url);
        })
        .catch(err => console.log(err))
    }

    const salvar = (event) => {
        event.preventDefault()

        const categoria = {
          nome : nome,
          urlImagem : urlImagem
        }

        let method = (id === 0 ? 'POST' : 'PUT')
        let urlRequest = (id === 0 ? `${url}/categorias` : `${url}/categorias/${id}`);

        fetch(urlRequest, {
          method : method,
          body : JSON.stringify(categoria),
          headers : {
            'content-type' : 'application/json',
            'authorization' : 'Bearer ' + localStorage.getItem('token-nyous')
          }
        })
          .then(response => response.json())
          .then(dados => {
              alert('categoria Salvo!');

              listar();
          })
    }

    const limparCampos = () => {
        setId(0);
        setNome('');
        setUrlImagem('');
    }

    return(
        <div>
            <Menu />
            <Container>
                <Titulo titulo="Categorias" chamada="Grencie sua categorias"/>

                <Card>
                    <Card.Body>
                        <Form onSubmit={event => salvar(event)}>
                            <Form.Group controlId='FormBasicNome'>
                                <Form.Label>
                                    Nome
                                </Form.Label>
                                <Form.Control type='text' valeu={nome} onChange={event => setNome(event.target.value)} placeholder='Inavação,tecnologia, Startups, ...'>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.File id='filecategoria' label='Imagem da categoria' onChange={event => {uploadFile(event)}} />
                                {urlImagem && <img src={urlImagem} style={{ width : '120px'}} />}
                            </Form.Group>
                            <Button type='submit'>Salvar</Button>
                        </Form>
                    </Card.Body>
                </Card>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Imagem</th>
                        <th>Nome</th>
                        <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categorias.map((item, index) => {
                                return(
                                    <tr key={index}>
                                        <td><img src={item.urlImagem} style={{width : '120px'}}/></td>
                                        <td>{item.nome}</td>
                                        <td> 
                                            <Button variant="dark" value={item.id} onClick={event => editar(event)}>Editar</Button>
                                            <Button variant="danger" value={item.id} onClick={event => remover(event)}  style={{marginLeft : '40px'}}>Remover</Button>
                                        </td>

                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Container>         
            <Rodape />
        </div>
    )

};

export default CrudCategorias