import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import api from '../../services/api'

import './tipoInvestimento.css'



export default function TipoInvestimento() {
    const [tipo, setTipo] = useState('');
    const [metaDiaria, setMetaDiaria] = useState('');
    const [metaMensal, setMetaMensal] = useState('');
    const navigate = useNavigate()
    
    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const id = localStorage.getItem('userId')

            await api.post('tipo/investimento', {
                Tipo: tipo,
                MetaDiaria: metaDiaria,
                MetaMensal: metaMensal,
                usuario_id: id
            });
            
            alert('Tipo de Investimento Cadastrado com sucesso')
            navigate('/investimento2');
        } catch (err) {
            console.log(err);
        }

    }
    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Row>
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="tipo">
                            <Form.Label>Tipo</Form.Label>
                            <Form.Control type="text" placeholder="Digite o tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="metaDiaria">
                            <Form.Label>Meta Diária</Form.Label>
                            <Form.Control type="number" placeholder="Digite a meta diária" value={metaDiaria} onChange={(e) => setMetaDiaria(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="metaMensal">
                            <Form.Label>Meta Mensal</Form.Label>
                            <Form.Control type="number" placeholder="Digite a meta mensal" value={metaMensal} onChange={(e) => setMetaMensal(e.target.value)} />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Salvar
              </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}