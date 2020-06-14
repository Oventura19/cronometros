import React from 'react';
import { Grid, Icon, Container } from 'semantic-ui-react';
import CronoForm from './CronoForm';
import CronoCard from './CronoCard';

class Cronos extends React.Component {
  constructor(props) {
    super(props);
    this.newCrono = this.newCrono.bind(this);
    this.editCrono = this.editCrono.bind(this);
    this.deleteCrono = this.deleteCrono.bind(this);
    this.buttonStart = this.buttonStart.bind(this);
    this.buttonStop = this.buttonStop.bind(this);

    this.state = {
      cronos: [
        {
          title: 'Autoaprendizaje',
          project: 'Programación React & Redux',
          id: 0,
          edit: false,
          formTitle: '',
          formProject: '',
          active: false,
          counter: 0
        }, 
        {
          title: 'Proyecto React & Redux',
          project: 'Ejercicio Cronómetros',
          id: 1, 
          edit: false,
          formTitle: '',
          formProject: '',
          active: false,
          counter: 0
        }
      ],
      timing: []
    }
  }

  newCrono() {
    const numberOfCronos = this.state.cronos.length;
    const newId = numberOfCronos !== 0 ? (this.state.cronos[numberOfCronos-1].id) + 1 : 0;
    const crono = {
      title: '', 
      project: '', 
      id: newId, 
      edit: true,
      formTitle: '',
      formProject: '',
      active: false,
      counter: 0
    };
    this.setState({
      cronos: this.state.cronos.concat(crono)
    });
  };

  deleteCrono(id) {
    if (window.confirm('¿Estás seguro de eliminar este Cronómetro?')) {
      const timings = this.state.timing.map((timing) => {
        if(timing.id === id) {
          return {
            ...timing,
            interval: clearInterval(timing.interval)
          }
        } else {
          return timing
        }
      })

      this.setState({
        cronos: this.state.cronos.filter(crono => id !== crono.id),
        timing: timings.filter(timing => id !== timing.id) 
      });
    };
  };

  editCrono(id) {
    const cronos = this.state.cronos.map((crono) => {
      if (crono.id === id) {
        return {
          ...crono,
          edit: true
        }
      } else {
        return crono
      }
    })

    this.setState({
      cronos: cronos
    });
  };

  buttonStart(id,counter) {
    const cronos = this.state.cronos.map((crono) => {
      if (crono.id === id) {
        return {
          ...crono,
          active: true
        }
      } else {
        return crono
      }
    })

    this.setState({
      cronos: cronos,
      timing: this.state.timing.concat({
        id: id,
        interval: setInterval(() => {this.tick(id,counter)},10)
      })
    })
  }

  tick(id) { 
    const cronos = this.state.cronos.map((crono) => {
      if (crono.id === id) {
        return {
          ...crono,
          counter: crono.counter + 1
        }
      } else {
        return crono
      }
    })

    this.setState({
      cronos: cronos
    });
  }

  buttonStop(id) {
    const timings = this.state.timing.map((timing) => {
      if (timing.id === id) {
        return {
          ...timing,
          interval: clearInterval(timing.interval)
        }
      } else {
        return timing
      }
    })

    const cronos = this.state.cronos.map((crono) => {
      if (crono.id === id) {
        return {
          ...crono,
          active: false
        }
      } else {
        return crono
      }
    })

    this.setState({
      cronos: cronos,
      timing: timings
    });
  }

  changeProperties = (id) => (e) => {
    const cronos = this.state.cronos.map((crono) => {
      if (crono.id === id && e.target.name === 'title') {
        return {
          ...crono,
          formTitle: e.target.value
        }
      } else if (crono.id === id && e.target.name === 'project'){
        return {
          ...crono,
          formProject: e.target.value
        }
      } else {
        return crono
      }
    })

    this.setState({
      cronos: cronos
    });
  }

  updateCrono = (id) => (e) => {
    e.preventDefault();
    const cronos = this.state.cronos.map((crono) => {
      if (crono.id === id) {
        return {
          ...crono,
          title: crono.formTitle === '' ? crono.title : crono.formTitle,
          project: crono.formProject === '' ? crono.project : crono.formProject,
          edit: false
        }
      } else {
        return crono
      }
    })

    this.setState({
      cronos: cronos
    });
  }

  render() {
    return (
      <Container>
        <Grid container centered columns={3} >
        {this.state.cronos.map(crono =>
          crono.edit ? 
            <CronoForm 
            key={crono.id}
            title={crono.title}
            project={crono.project}
            handleChange={this.changeProperties(crono.id)}
            handleUpdate={this.updateCrono(crono.id)}
            handleDelete={() => this.deleteCrono(crono.id)}/>  :
            <CronoCard 
            key={crono.id}
            title={crono.title}
            project={crono.project}
            active={crono.active}
            counter={crono.counter}
            handleDelete={() => this.deleteCrono(crono.id)}
            handleEdit={() => this.editCrono(crono.id)}
            handleStart={() => this.buttonStart(crono.id,crono.counter)}
            handleStop={() => this.buttonStop(crono.id)}/>
        )}
        <Grid.Row>
          <Icon
          onClick={this.newCrono}
          link size='big' 
          name="add square"
          />
        </Grid.Row>
      </Grid>
      </Container>
    )
  }
}

export default Cronos;