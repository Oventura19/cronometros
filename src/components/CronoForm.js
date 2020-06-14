import React from 'react';
import { Button, Card , Form, Grid } from 'semantic-ui-react';

const CronoForm = (props) => {
  return (
    <Grid.Row>
      <Card>
        <Card.Content>
          <Form size='large' onSubmit={props.handleUpdate}>
            <Form.Field>
              <label>Título</label>
              <input placeholder={props.title} name='title' onChange={props.handleChange}/>
            </Form.Field>
            <Form.Field>
              <label>Proyecto</label>
              <input placeholder={props.project} name='project' onChange={props.handleChange}/>
            </Form.Field>
            <div className='ui two buttons'>
              <Button type='submit' basic fluid color='blue'>{props.title !== '' ? 'Actualizar' : 'Crear'}</Button>
              {props.title !== '' ? 
              <Button basic fluid color='red'>Cancelar</Button> : 
              <Button basic fluid color='red' onClick={props.handleDelete}>Cancelar</Button>
              }
            </div>
          </Form>
        </Card.Content>
      </Card>
    </Grid.Row>
  )
};

export default CronoForm;