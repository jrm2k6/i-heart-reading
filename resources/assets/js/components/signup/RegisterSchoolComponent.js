import React, { Component } from 'react';
import RegisterSchoolForm from './forms/RegisterSchoolForm';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { createSchool, updateSchool,
  ERROR_SCHOOL_CREATED, ERROR_SCHOOL_UPDATED
} from '../../actions/signup/signupSchoolActions';

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
      domainNameSchool: null,
      currentError: null,
      shouldShowError: false
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
    const {
      shouldShowError,
      currentError,
      nameSchool,
      addressSchool,
      domainNameSchool
    } = this.state;

    const errorContainer = (shouldShowError) ? (
      <div className='error-container'>
        {currentError}
      </div>
    ) : null;

    return (
      <div className='register-school-container'>
        {errorContainer}
        <div className='section-header'>
          What school do you represent?
        </div>
        <div className='section-form'>
          <RegisterSchoolForm
            nameSchool={nameSchool}
            addressSchool={addressSchool}
            domainNameSchool={domainNameSchool}
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

  isFailedRequest(res) {
    return res.type === ERROR_SCHOOL_CREATED || res.type === ERROR_SCHOOL_UPDATED;
  }

  getCurrentError(res) {
    let currentError = null;
    if (res.data !== null) {
      const data = res.data;
      const keys = Object.keys(data);

      if (keys.length > 0) {
        const firstKey = keys[0];
        const firstError = data[firstKey];

        if (firstError.length > 0) {
          currentError = firstError[0];
        }
      }
    }

    return currentError;
  }

  handleClick() {
    const { nameSchool, addressSchool, domainNameSchool } = this.state;
    const { currentSchool } = this.props;

    const isValid = nameSchool !== null && addressSchool !== null && domainNameSchool !== null;

    if (isValid) {
      const shouldUpdate = this.props.currentSchool !== null;
      const data = (shouldUpdate) ? Object.assign({}, this.state, {id: currentSchool.id}) : this.state;
      this.props.createOrUpdateSchool(data, shouldUpdate).then(
        res => {
          if (this.isFailedRequest(res)) {
            console.log(this.getCurrentError(res));
            this.setState({
              shouldShowError: true,
              currentError: this.getCurrentError(res)
            });
          } else {
            this.setState({
              shouldShowError: true,
              currentError: null
            }, () => {
              browserHistory.push('signup/contact');
            });
          }
        }
      );
    } else {
      console.log("error");
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterSchoolComponent);
