import logo from './logo.svg';
import './App.css';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';

import { useState, useEffect } from 'react';

import {
  Grid,
  Table,
  TableHeaderRow,
  Toolbar,
  SearchPanel,
  TableEditRow,
  TableEditColumn,
  TableInlineCellEditing,
} from '@devexpress/dx-react-grid-bootstrap4'
import {
  SearchState,
  IntegratedFiltering,
  EditingState,
} from '@devexpress/dx-react-grid'
import { Form, Field } from 'react-final-form'

function App() {
  const columns = [
    { name: 'name', title: 'Name' },
    { name: 'age', title: 'Age' },
    { name: 'position', title: 'Position' },
    { name: 'city', title: 'City' },
  ]
  const rows = [
    { name: 'Person 1', age: 21, position: 'Web Developer', city: 'HCM' },
    { name: 'Person 2', age: 12, position: 'Web Developer', city: 'HCM' },
  ]

  const [data, setData] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [editingRowId, setEditingRowId] = useState([])

  const onSubmit = (values) => {
    const updateData = [...data, values]
    setData(updateData)
  }

  const onEditData = ({ changed, deleted }) => {
    let changeRows = []
    if (changed) {
      changeRows = data.map((row, idx) => (idx === parseInt(Object.keys(changed)[0], 10) ? {...row, ...changed[idx]} : row))
    }
    if (deleted) {
      changeRows = data.filter((row, idx) => idx !== deleted[0])
    }
    setData(changeRows)
  }

  const fieldMandatory = value => value ? undefined : 'This field is mandatory'
  const ageValidation = value => parseInt(value, 10) > 8 ? undefined : 'Age must be greater than 8'

  const renderFieldName = ({input, meta}) => (
    <div>
      <div className='form-inline'>
        <label className='col-4'>Name</label>
        <input {...input} className='form-control col-8' type='text' />
      </div>
      {meta.error && meta.touched && <p className='text-danger text-right'><small>{meta.error}</small></p>}
    </div>
  )

  const renderFieldAge = ({input, meta}) => (
    <div>
      <div className='form-inline'>
        <label className='col-4'>Age</label>
        <input {...input} className='form-control col-8' type='number' />
      </div>
      {meta.error && meta.touched && <p className='text-danger text-right'><small>{meta.error}</small></p>}
    </div>
  )

  const renderForm = ({ handleSubmit, form, submitting, pristine }) => (
    <form
      onSubmit={event => {
        handleSubmit(event)
        form.reset()
      }}
    >
      <div className='form-inline mb-3'>
        <Field
          name='name'
          render={renderFieldName}
          validate={fieldMandatory}
        />
      </div>
      <div className='form-inline mb-3'>
        <Field
          name='age'
          render={renderFieldAge}
          validate={ageValidation}
        />
      </div>
      <div className='form-inline mb-3'>
        <label className='col-4'>Position</label>
        <Field
          className='form-control col-8'
          name='position'
          component='input'
          type='text'
        />
      </div>
      <div className='form-inline mb-3'>
        <label className='col-4'>City</label>
        <Field
          className='form-control col-8'
          name='city'
          component='select'
          type='text'
          initialValue={'HCM'}
        >
          <option value="HCM">HCM</option>
          <option value="Hà Nội">Hà Nội</option>
          <option value="Cần Thơ">Cần Thơ</option>
          <option value="Đà Nẵng">Đà Nẵng</option>
        </Field>
      </div>
      <div className='text-center'>
        <button className='btn btn-primary' type='submit' disabled={submitting || pristine}>
          Submit
        </button>
      </div>
    </form>
  )

  return (
    <div className='row'>
      <div className='col-md-4'>
        <div className='card d-flex align-items-center justify-content-center p-3'>
          <h3 className='text-center'>Input data here!</h3>
          <Form
            onSubmit={onSubmit}
            render={renderForm}
          />
        </div>
      </div>
      <div className='col-md-8'>
        <Grid
          columns={columns}
          rows={data}
        >
          <SearchState
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <EditingState
            editingRowIds={editingRowId}
            onEditingRowIdsChange={setEditingRowId}
            onCommitChanges={onEditData}
          />
          <IntegratedFiltering />
          <Table />
          <TableHeaderRow />
          <TableEditRow />
          <TableEditColumn showEditCommand showDeleteCommand />
          <Toolbar />
          <SearchPanel />
        </Grid>
      </div>
    </div>
  );
}

export default App;
