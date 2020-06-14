import React from 'react';
import { Button, Card, Icon, Grid } from 'semantic-ui-react';

class CronoCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      elapsed: '00:00:00'
    }
  }

  componentWillReceiveProps(nextProps) {
    const ms = this.props.counter;
    const seconds = Math.floor((ms / 100) % 60);
    const minutes = Math.floor((ms / 100 / 60) % 60);
    const hours = Math.floor(ms / 100 / 60 / 60);

    const humanized = [
      this.pad(hours.toString(), 2),
      this.pad(minutes.toString(), 2),
      this.pad(seconds.toString(), 2),
    ].join(':');
    
    this.setState({elapsed:humanized})
  }

  pad(numberString, size) {
    let padded = numberString;
    while (padded.length < size) padded = `0${padded}`;
    return padded;
  }

  render() {
    return (
      <Grid.Row>
        <Card>
          <Card.Content>
            <Card.Header textAlign='left'>{this.props.title}</Card.Header>
            <Card.Meta textAlign='left'>{this.props.project}</Card.Meta>
            <Card.Description style={{fontSize: '25px'}}> <strong>{this.state.elapsed}</strong> </Card.Description>
            <Card.Description textAlign='right'>
              <Icon onClick={this.props.handleDelete} link name='trash alternate'/>
              <Icon onClick={this.props.handleEdit} link name='edit'/>
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            {this.props.active ? 
            <Button onClick={this.props.handleStop}basic fluid color='red'>Parar</Button>
            :
            <Button onClick={this.props.handleStart} basic fluid color='green'>Iniciar</Button>
            }
          </Card.Content>
        </Card>
      </Grid.Row>
    )
  }
}

export default CronoCard;