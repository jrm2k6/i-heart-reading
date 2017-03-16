import React, { Component } from 'react';
import RegisterSchoolForm from './forms/RegisterSchoolForm';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { createSchool, updateSchool } from '../../actions/signup/signupSchoolActions';

const mapStateToProps = (state) => {
  return {
    currentSchool: state.signupReducer.currentSchool
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createOrUpdateSchool: (data, shouldUpdate) => {
      if (shouldUpdate) {
        return dispatch(updateSchool(data))
      } else {
        return dispatch(createSchool(data))
      }
    }
  };
};


class RegisterSchoolComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nameSchool: null,
      addressSchool: null,
      domainNameSchool: null
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { currentSchool } = this.props;
    if (currentSchool) {
      this.setState({
        nameSchool: currentSchool.name,
        addressSchool: currentSchool.address,
        domainNameSchool: currentSchool.domain_name,
      });
    }
  }

  render() {
    return (
      <div className='register-school-container'>
        <div className='section-header'>
          What school do you represent?
        </div>
        <div className='section-form'>
          <RegisterSchoolForm
            nameSchool={this.state.nameSchool}
            addressSchool={this.state.addressSchool}
            domainNameSchool={this.state.domainNameSchool}
            updateNameSchool={(e) => { this.setState({ nameSchool: e.target.value }); }}
            updateAddressSchool={(e) => { this.setState({ addressSchool: e.target.value }); }}
            updateDomainEmailSchool={(e) => { this.setState({ domainNameSchool: e.target.value }); }}
          />
        </div>
        <div className='section-navigation'>
          <button className='section-navigation-btn next-btn'
            onClick={this.handleClick}>
            Next
          </button>
        </div>
      </div>
    );
  }

  handleClick() {
    const { nameSchool, addressSchool, domainNameSchool } = this.state;
    const { currentSchool } = this.props;

    const isValid = nameSchool !== null && addressSchool !== null && domainNameSchool !== null;

    if (isValid) {
      const shouldUpdate = this.props.currentSchool !== null;
      const data = (shouldUpdate) ? Object.assign({}, this.state, {id: currentSchool.id}) : this.state;
      this.props.createOrUpdateSchool(data, shouldUpdate).then(
        res => { browserHistory.push('signup/contact'); }
      );
    } else {
      console.log("error");
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterSchoolComponent);
