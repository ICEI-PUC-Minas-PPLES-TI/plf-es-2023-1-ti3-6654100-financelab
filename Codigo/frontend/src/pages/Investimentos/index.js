import React, { useState, useEffect } from 'react'
import { Container, Table, Button, Modal, Form } from 'react-bootstrap'
import './styles.css'
import api from '../../services/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom'

export default function InvestimentoDois() {
  const [showModal, setShowModal] = useState(false)
  const [showUpModal, setShowUpModal] = useState(false)
  const [precoCompra, setPrecoCompra] = useState('')
  const [precoVenda, setPrecoVenda] = useState('')
  const [descricao, setDescricao] = useState('')
  const [nome, setNome] = useState('')
  const [tiposInvestimento, setTiposInvestimento] = useState([])
  const [listInvestimentos, setListInvestimentos] = useState([])
  const [fetchAgain, setFetch] = useState(false)
  const [upPrecoCompra, setUpPrecoCompra] = useState('')
  const [upPrecoVenda, setUpPrecoVenda] = useState('')
  const [upDescricao, setUpDescricao] = useState('')
  const [upNome, setUpNome] = useState('')

  const [tipoInvestimentoSelecionado, setTipoInvestimentoSelecionado] =
    useState('')
  const handleTipoInvestimentoChange = e => {
    setTipoInvestimentoSelecionado(e.target.value)
  }

  async function handleSave(event) {
    event.preventDefault()

    try {
      await api.post('investimentos', {
        preco_compra: precoCompra,
        preco_venda: precoVenda,
        nome: nome,
        descricao: descricao,
        tipo_investimento_id: tipoInvestimentoSelecionado
      })
      setFetch(!fetchAgain)
      handleCloseModal()
    } catch (err) {
      console.log(err)
    }
  }

  async function deleteInvestimentos(idInvestimento) {
    try {
      await api.delete(`investimentos/${idInvestimento}`)
      window.location.reload()
    } catch (err) {
      console.log('investimento não encontrado')
    }
  }

  async function updateInvestimento(id) {
    try {
      await api.post(`updateInvestimentos/${id}`, {
        preco_compra: upPrecoCompra,
        preco_venda: upPrecoVenda,
        nome: upNome,
        descricao: upDescricao
      })
      window.location.reload()
      console.log('foi')
    } catch (err) {
      console.log('investimento não encontrado')
    }
  }

  useEffect(() => {
    ;(async () => {
      const id = localStorage.getItem('userId')
      const finalResult = await api.get(`tipo/investimento/${id}`)
      setTiposInvestimento(finalResult.data.result)
      console.log(finalResult.data)

      setTipoInvestimentoSelecionado(
        finalResult.data.result.length > 0 ? finalResult.data.result[0].id : ''
      )

      const allInvestimentos = await api.get(`investimentos/all/${id}`)
      setListInvestimentos(allInvestimentos.data.result)
    })()
  }, [fetchAgain])

  const handleCloseModal = () => setShowModal(false)
  const handleShowModal = () => setShowModal(true)
  const handleUpCloseModal = () => setShowUpModal(false)
  const handleUpShowModal = () => setShowUpModal(true)

  return (
    <Container>
      <h1>Seus Investimentos</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Tipo</th>
            <th>Meta Mensal</th>
            <th>Meta Diária</th>
            <th>Preço Compra</th>
            <th>Preço Venda</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {listInvestimentos.map(investment => (
            <tr key={investment.id}>
              <td>{investment.nome}</td>
              <td>{investment.descricao}</td>
              <td>{investment.Tipo}</td>
              <td>{investment.MetaMensal}</td>
              <td>{investment.MetaDiaria}</td>
              <td>{investment.preco_compra}</td>
              <td>{investment.preco_venda}</td>
              <td>
                <Button style={{ marginInline: '20px' }} onClick={handleUpShowModal}>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </Button>
                <Button onClick={() => deleteInvestimentos(investment.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Criar Investimento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="precoCompra">
              <Form.Label>Preço de Compra</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o preço de compra"
                value={precoCompra}
                onChange={e => setPrecoCompra(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="precoVenda">
              <Form.Label>Preço de Venda</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o preço de venda"
                value={precoVenda}
                onChange={e => setPrecoVenda(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="nome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o nome do investimento"
                value={nome}
                onChange={e => setNome(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="descricao">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a descrição"
                value={descricao}
                onChange={e => setDescricao(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="tipoInvestimento">
              <Form.Label>Tipo de Investimento</Form.Label>
              <Form.Control
                as="select"
                value={tipoInvestimentoSelecionado}
                onChange={handleTipoInvestimentoChange}
              >
                {tiposInvestimento.map(tipo => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.Tipo}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Update Investimento */}
      <Modal show={showUpModal} onHide={handleUpCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Criar Investimento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="precoCompra">
              <Form.Label>Preço de Compra</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o preço de compra"
                value={upPrecoCompra}
                onChange={e => setUpPrecoCompra(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="precoVenda">
              <Form.Label>Preço de Venda</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o preço de venda"
                value={upPrecoVenda}
                onChange={e => setUpPrecoVenda(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="nome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o nome do investimento"
                value={upNome}
                onChange={e => setUpNome(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="descricao">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a descrição"
                value={upDescricao}
                onChange={e => setUpDescricao(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="tipoInvestimento">
              <Form.Label>Tipo de Investimento</Form.Label>
              <Form.Control
                as="select"
                value={tipoInvestimentoSelecionado}
                onChange={handleTipoInvestimentoChange}
              >
                {tiposInvestimento.map(tipo => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.Tipo}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUpCloseModal}>
            Fechar
          </Button>
          {listInvestimentos.map(investment => (
            <Button
              key={investment.id}
              variant="primary"
              onClick={() => updateInvestimento(investment.id)}
            >
              Atualizar
            </Button>
          ))}
        </Modal.Footer>
      </Modal>

      <div class="btns">
        <Button variant="primary" onClick={handleShowModal}>
          Criar Investimento
        </Button>
        <Link to="/tipo/investimento">
          <Button variant="primary">Criar Tipo de Investimento</Button>
        </Link>
      </div>
    </Container>
  )
}
