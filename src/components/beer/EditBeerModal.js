import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Form, Icon, Modal } from 'semantic-ui-react';
import ReactFilestack from 'filestack-react';
import styles from './beerStyles';
import { patchBeer } from '../../actions/beers';
// import api from '../../api/adapter';

class EditBeerModal extends React.Component {
  state = {
    modalOpen: false,
    beerID: this.props.beer.id,
    name: this.props.beer.name,
    breweryID: this.props.beer.brewery.id,
    abv: this.props.beer.abv,
    style: this.props.beer.style,
    img_url: this.props.beer.img_url || ''
  }

  onError = (error) => {
    console.error('error', error);
  };

  onSuccess = (result) => {
    this.setState({
      img_url: result.filesUploaded[0].url
    });
  }; // works

  onInputChange = (name, value) => {
    this.setState({
      [name]: value
    });
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  saveBeer = () => {
    const beer = {
      id: this.state.beerID,
      name: this.state.name,
      brewery_id: this.state.breweryID,
      abv: this.state.abv,
      style: this.state.style,
      img_url: this.state.img_url
    };

    this.props.patchBeer(beer).then(() => {
      this.setState({ modalOpen: false });
    });
  }

  render() {
    const basicOptions = {
      accept: 'image/*',
      fromSources: ['local_file_system'],
      maxSize: 1024 * 1024,
      maxFiles: 1,
    };

    return (
      <Modal
        trigger={<Icon
          name="edit"
          className="right floated"
          onClick={this.handleOpen}
        />}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        closeOnDimmerClick={false}
      >
        <Modal.Header>Edit Beer</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Name:"
                name="name"
                value={this.state.name}
                onChange={(event, { value }) => { this.onInputChange(event.target.name, value); }}
              />
              <Form.Select
                fluid
                search
                label="Brewery:"
                name="breweryID"
                value={this.state.breweryID}
                options={this.props.breweriesArray}
                onChange={(event, { value }) => { this.onInputChange(event.target.name, value); }}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="ABV:"
                name="abv"
                value={this.state.abv}
                onChange={(event, { value }) => { this.onInputChange(event.target.name, value); }}
              />
              <Form.Select
                fluid
                search
                label="Style:"
                name="style"
                value={this.state.style}
                options={styles}
                onChange={(event, { value }) => { this.onInputChange('style', value); }}
              />
              <ReactFilestack
                apikey={process.env.REACT_APP_FILESTACK_KEY_BEERS}
                buttonText="Upload image"
                buttonClass="ui medium button blue fluid no-bottom-margin"
                options={basicOptions}
                onSuccess={this.onSuccess}
                onError={this.onError}
              />
            </Form.Group>
            <Button color="red" onClick={this.handleClose}>Cancel</Button>
            <Button color="blue" floated="right" onClick={this.saveBeer}>Save</Button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

// const mapStateToProps = state => ({
//   return: {
//     breweriesArray: state.breweriesArray
//   }
// });

EditBeerModal.propTypes = {
  beer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    abv: PropTypes.number.isRequired,
    style: PropTypes.string.isRequired,
    brewery: PropTypes.shape({ id: PropTypes.number.isRequired }).isRequired,
    img_url: PropTypes.string.isRequired
  }).isRequired,
  breweriesArray: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default connect(undefined, { patchBeer })(EditBeerModal);
// export default EditBeerModal;
