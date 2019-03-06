import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TextInput,
  Picker,
} from 'react-native';
import gql from "graphql-tag";

import { TextButton } from '../components';
import { colors } from '../resources';


// Get all the locations
const GET_LOCATIONS = gql`
  { 
    centerLocations
	  {
  	  name
    }
  }
`;

const centerLocations = () => (
  <Query query={GET_LOCATIONS}>
    {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return `Error! ${error.message}`;

      return <locationList locations = {data.locations} />      
    }}
  </Query>
);


// Used for the login screen.
export default class VerificationField extends Component {
  static propTypes = {
    width: PropTypes.number, // Width of fields and the button
    captureView: PropTypes.func, // When the user starts inputting, this function will be called to move the view to an appropriate location
    incorrectLogin: PropTypes.bool, // True when a login failed
    onSubmit: PropTypes.func.isRequired, // Called when user submits
    resetLoginColor: PropTypes.func // Called to reset an incorrect login when the user changes a field
  };
  static defaultProps = {
    width: 300,
    captureView: () => {},
    incorrectLogin: false,
  };
  
  constructor() {
    super();
    
    this.state = {
      centerLocations = centerLocations,
      email: 'dr.li@ardentacademy.com',
      password: 'ardent-staff',
    };
  }
  
  render() {
    const { email, password } = this.state;
    const { width, onSubmit, captureView, incorrectLogin } = this.props;
    let selectLocations = this.state.centerLocations.map((key) => {
      return (<Picker.Item label={this.props.options[key]} value={key} key={key}/>
    )});

    return (
      <View>
        <Picker
          style={{
          height: 40,
          width,
          backgroundColor: incorrectLogin ? 'rgb(255, 221, 221)' : 'white',
          borderWidth: 0.5,
          borderColor: incorrectLogin ? 'red' : 'rgb(130, 130, 130)',
          alignSelf: 'center',
          marginBottom: 10,
          shadowColor: 'black',
          shadowOpacity: 0.1,
          shadowRadius: 6,
        }}
          selectedValue={this.state.selected}
          onValueChange={(centerLocations) => ( this.setState({selected:centerLocations}))}>
          {selectLocations}
        </Picker>
        <TextInput
          style={{
            height: 40,
            width,
            fontSize: 20,
            backgroundColor: incorrectLogin ? 'rgb(255, 221, 221)' : 'white',
            borderWidth: 0.5,
            borderColor: incorrectLogin ? 'red' : 'rgb(130, 130, 130)',
            borderRadius: 5,
            alignSelf: 'center',
            textAlign: 'center',
            marginBottom: 10,
            shadowColor: 'black',
            shadowOpacity: 0.1,
            shadowRadius: 6,
          }}
          placeholder='SOLVE EMAIL'
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={(text) => {
            this.setState({ email: text });
            this.props.resetLoginColor();
          }}
          keyboardType='email-address'
          value={email}
          onFocus={captureView}
          underlineColorAndroid='transparent'
          selectTextOnFocus={false}
        />
        <TextInput
          style={{
            height: 40,
            width,
            fontSize: 20,
            backgroundColor: incorrectLogin ? 'rgb(255, 221, 221)' : 'white',
            borderWidth: 0.5,
            borderColor: incorrectLogin ? 'red' : 'rgb(130, 130, 130)',
            borderRadius: 5,
            alignSelf: 'center',
            textAlign: 'center',
            shadowColor: 'black',
            shadowOpacity: 0.1,
            shadowRadius: 6,
          }}
          placeholder='SOLVE PASSWORD'
          secureTextEntry={true}
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={(text) => {
            this.setState({ password: text });
            this.props.resetLoginColor();
          }}
          value={password}
          onFocus={captureView}
          onSubmitEditing={() => onSubmit(email, password)}
          underlineColorAndroid='transparent'
          selectTextOnFocus={true}
        />
        <TextButton
          title='LOG IN'
          style={{
            backgroundColor: colors.orange,
            borderWidth: 0.5,
            borderColor: 'rgb(130, 130, 130)',
            borderRadius: 5,
            color: 'white',
            height: 40,
            width,
            fontSize: 20,
            margin: 10,
            shadowColor: 'black',
            shadowOpacity: 0.1,
            shadowRadius: 6,
          }}
          onPress={() => onSubmit(email, password)}
        />
      </View>
    );
  }
}