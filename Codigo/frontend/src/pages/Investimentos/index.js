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
  const [quantidade, setQuantidade] = useState('')
  const [precoVenda, setPrecoVenda] = useState('')
  const [descricao, setDescricao] = useState('')
  const [nome, setNome] = useState('')
  const [tiposInvestimento, setTiposInvestimento] = useState([])
  const [listInvestimentos, setListInvestimentos] = useState([])
  const [fetchAgain, setFetch] = useState(false)
  const [upPrecoCompra, setUpPrecoCompra] = useState('')
  const [upPrecoVenda, setUpPrecoVenda] = useState('')
  const [upQuantidade, setUpQuantidade] = useState('');
  const [upDescricao, setUpDescricao] = useState('')
  const [upNome, setUpNome] = useState('')
  const [tipoInv, setTipoInv] = useState('Bolsa')
  // const [upTipoInvestimentoSelecionado, setUpTipoInvestimentoSelecionado] = useState('')

  const [tipoInvestimentoSelecionado, setTipoInvestimentoSelecionado] =
    useState('')
  const handleTipoInvestimentoChange = e => {
    setTipoInvestimentoSelecionado(e.target.value)
  }

  const handleTipoInv = e => {
    setTipoInv(e.target.value)
  }

  async function handleSave(event) {
    event.preventDefault()
    const userId = localStorage.getItem('userId')
    try {
      await api.post('investimentos', {
        preco_compra: precoCompra,
        preco_venda: precoVenda,
        quantidade: quantidade,
        nome: nome,
        descricao: descricao,
        tipo_investimento: tipoInv,
        usuario_id: userId
      })
      setFetch(!fetchAgain)
      handleCloseModal()
    } catch (err) {
      console.log(err)
    }
    console.log('foi');
    console.log(tipoInv
    );
  }

  async function deleteInvestimentos(idInvestimento) {
    try {
      await api.delete(`investimentos/${idInvestimento}`)
      window.location.reload()
    } catch (err) {
      console.log('investimento não encontrado')
    }
  }

  async function updateInvestimento() {
    setUpDescricao(descricao)
    const id = localStorage.getItem('investimentoId')
    try {
      await api.post(`updateInvestimentos/${id}`, {
        preco_compra: upPrecoCompra,
        preco_venda: upPrecoVenda,
        nome: upNome,
        descricao: upDescricao,
        quantidade: upQuantidade
      })
      window.location.reload()
      console.log('foi')
    } catch (err) {
      console.log('investimento não encontrado')
    }
  }

  useEffect(() => {
    ; (async () => {
      const id = localStorage.getItem('userId')

      // const finalResult = await api.get(`tipo/investimento/${id}`)
      // setTiposInvestimento(finalResult.data.result)
      // console.log(finalResult.data.result[0])

      // setTipoInvestimentoSelecionado(
      //   finalResult.data.result.length > 0 ? finalResult.data.result[0].id : ''
      // )

      const allInvestimentos = await api.get(`investimentos/all/${id}`)
      let filtered = allInvestimentos.data.result.filter(each => !each.preco_venda);
      setListInvestimentos(filtered)
    })()
  }, [fetchAgain])

  const handleCloseModal = () => setShowModal(false)
  const handleShowModal = () => setShowModal(true)
  const handleUpCloseModal = () => setShowUpModal(false)
  const handleUpShowModal = async id => {
    setShowUpModal(true)
    const investimento = await api.get(`investimento/${id}`)
    setUpNome(investimento.data[0].nome)
    setUpPrecoCompra(investimento.data[0].preco_compra)
    setUpPrecoVenda(investimento.data[0].preco_venda)
    setUpDescricao(investimento.data[0].descricao)
    setUpQuantidade(investimento.data[0].quantidade)
    // setUpTipoInvestimentoSelecionado()
    console.log(investimento.data[0])
  }

  // async function handleUpModal(id) {

  // }

  return (
    <Container>
      <h1>Seus Investimentos</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Tipo</th>
            {/* <th>Meta Mensal</th>
            <th>Meta Diária</th> */}
            <th>Preço Compra</th>
            <th>Preço Venda</th>
            <th>Quantidade</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {listInvestimentos.map(investment => (
            <tr key={investment.id}>
              <td>{investment.nome}</td>
              <td>{investment.descricao}</td>
              <td>{investment.tipo_investimento}</td>
              {/* <td>{investment.MetaMensal}</td>
              <td>{investment.MetaDiaria}</td> */}
              <td>{investment.preco_compra}</td>
              <td>{investment.preco_venda}</td>
              <td>{investment.quantidade}</td>

              <td>
                <Button
                  style={{ marginInline: '20px' }}
                  onClick={() => {
                    handleUpShowModal(investment.id)
                    // handleUpModal(investment.id)
                    localStorage.setItem('investimentoId', investment.id)
                  }}
                >
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
            <Form.Group controlId="quantidade">
              <Form.Label>Quantidade</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a quantidade"
                value={quantidade}
                onChange={e => setQuantidade(e.target.value)}
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
                value={tipoInv}
                onChange={handleTipoInv}
              >
                {/* {tiposInvestimento.map(tipo => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.Tipo}
                  </option>
                ))} */}
                <option value="Bolsa">Bolsa</option>
                <option value="RendaFixa">Renda Fixa</option>
                <option value="FundoImobiliario">Fundo Imobiliario</option>
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
          <Modal.Title>Atualizar Investimento</Modal.Title>
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
            <Form.Group controlId="quantidade">
              <Form.Label>Quantidade</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a quantidade"
                value={upQuantidade}
                onChange={e => setUpQuantidade(e.target.value)}
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
              <Form.Label>AATipo de Investimento</Form.Label>
              <Form.Control
                as="select"
                value={tipoInvestimentoSelecionado}
                onChange={handleTipoInvestimentoChange}
              >
                {/* {tiposInvestimento.map(tipo => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.Tipo}
                  </option>
                ))} */}
                <option value="Bolsa">Bolsa</option>
                <option value="RendaFixa">Renda Fixa</option>
                <option value="FundoImobiliario">Fundo Imobiliario</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUpCloseModal}>
            Fechar
          </Button>
          {/* {listInvestimentos.map(investment => (

          ))} */}
          <Button
            // key={investment.id}
            variant="primary"
            onClick={() => updateInvestimento()}
          >
            Atualizar
          </Button>
        </Modal.Footer>
      </Modal>

      <div class="btns">
        <Button variant="primary" onClick={handleShowModal}>
          Criar Investimento
        </Button>
        <Link to="/tipoInvestimento">
          <Button variant="primary">Criar Tipo de Investimento</Button>
        </Link>
      </div>
    </Container>
  )
}
