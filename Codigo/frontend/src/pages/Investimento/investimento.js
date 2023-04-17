import React from 'react';
import ReactDOM from 'react-dom';
import CRUDTable,
{
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm,
} from 'react-crud-table';

// Component's Base CSS
import './investimento.css';
export default function Investimento() {


let tasks = [
  {
    id: 1,
    valor: '100',
    roi:'150',
    tipo:'Bolsa',
    esperado:'125',
  },
  {
    id: 2,
    valor: '200',
    roi:'212',
    tipo:'Bolsa',
    esperado:'222',
  },
];

const SORTERS = {
  NUMBER_ASCENDING: mapper => (a, b) => mapper(a) - mapper(b),
  NUMBER_DESCENDING: mapper => (a, b) => mapper(b) - mapper(a),
  STRING_ASCENDING: mapper => (a, b) => mapper(a).localeCompare(mapper(b)),
  STRING_DESCENDING: mapper => (a, b) => mapper(b).localeCompare(mapper(a)),
};

const getSorter = (data) => {
  const mapper = x => x[data.field];
  let sorter = SORTERS.STRING_ASCENDING(mapper);

  if (data.field === 'id') {
    sorter = data.direction === 'ascending' ?
      SORTERS.NUMBER_ASCENDING(mapper) : SORTERS.NUMBER_DESCENDING(mapper);
  } else {
    sorter = data.direction === 'ascending' ?
      SORTERS.STRING_ASCENDING(mapper) : SORTERS.STRING_DESCENDING(mapper);
  }

  return sorter;
};


let count = tasks.length;
const service = {
  fetchItems: (payload) => {
    let result = Array.from(tasks);
    result = result.sort(getSorter(payload.sort));
    return Promise.resolve(result);
  },
  create: (task) => {
    count += 1;
    tasks.push({
      ...task,
      id: count,
    });
    return Promise.resolve(task);
  },
  update: (data) => {
    const task = tasks.find(t => t.id === data.id);
    task.valor = data.valor;
    task.roi = data.roi;
    task.tipo = data.tipo;
    task.esperado = data.esperado;
    return Promise.resolve(task);
  },
  delete: (data) => {
    const task = tasks.find(t => t.id === data.id);
    tasks = tasks.filter(t => t.id !== task.id);
    return Promise.resolve(task);
  },
};

const styles = {
  container: { margin: 'auto', width: 'fit-content' },
};

const Example = () => (
  <div style={styles.container}>
    <CRUDTable
      caption="Investimentos"
      fetchItems={payload => service.fetchItems(payload)}
    >
      <Fields>
        <Field
          name="id"
          label="Id"
          hideInCreateForm
          readOnly
        />
        <Field
          name="valor"
          label="Valor"
          placeholder="Valor"
        />
        <Field
          name="roi"
          label="ROI"
          placeholder="ROI"
        />
        <Field
          name="tipo"
          label="Tipo"
          placeholder="Tipo"
        />
        <Field
          name="esperado"
          label="Valor esperado"
          placeholder="Valor esperado"
        />
      </Fields>
      <CreateForm
        title="Criar investimento"
        message="Criar investimento"
        trigger="Criar investiemnto"
        onSubmit={task => service.create(task)}
        submitText="Create"
      />

      <UpdateForm
        title="Update investimento"
        message="Update investimento"
        trigger="Update"
        onSubmit={task => service.update(task)}
        submitText="Update"
      />

      <DeleteForm
        title="Delete"
        message="Tem certeza que quer deletar?"
        trigger="Delete"
        onSubmit={task => service.delete(task)}
        submitText="Delete"
      />
    </CRUDTable>
  </div>
);

Example.propTypes = {};

ReactDOM.render(
  <Example />,
  document.getElementById('root')
);
}
