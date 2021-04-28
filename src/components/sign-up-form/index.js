import React from 'react';
import axios from 'axios';
import classNames from 'classnames';
import config from '../../config/default.json';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showAlert } from "../../features/alert/alertSlice";
import { showSpinner, hideSpinner } from "../../features/spinner/spinnerSlice";

class SignUpForm extends React.Component {

  constructor(props) {
    super(props);

    // Конструктор — это единственное место, где вы можете присвоить значение this.state напрямую.
    this.state = {
      isFormHandling: false,
      errors: null, // validation errors обрабатываем в компонентах
      isFormValidated: false
    }

    // для ES6 классов нужна привязка контекста или нужно использовать стрелки в обработчиках
    this.handleSubmit = this.handleSubmit.bind(this);
    // для обычных вызовов работает и без привязки
    // this.resetForm = this.resetForm.bind(this);
  }

  resetForm() {
    this.setState({
      errors: null,
      isFormValidated: false
    });

    document.getElementById('displayName').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('acceptUserAgreement').checked = false;
  }

  handleSubmit(event) {
    this.setState({
      isFormHandling: true
    });

    event.preventDefault();
    event.stopPropagation();

    const formElem = document.getElementById('signUpForm');
    const isFormValid = formElem.checkValidity();
    this.setState({
      isFormValidated: true
    });

    if (isFormValid !== false) {
      this.props.showSpinner({text: 'Form sending...'});
      const formData = new FormData(formElem);
      axios.post('/api/users', {
          displayName: formData.get('displayName'),
          email: formData.get('email'),
          password: formData.get('password'),
          acceptUserAgreement: !!formData.get('acceptUserAgreement')
        })
        .then(
          (response) => {
            if (response.status === 201) {
              this.props.showAlert({type: 'success', title: config.signUp.alert.title, text: config.signUp.alert.text});
              this.resetForm();
            }
          },
          (error) => {
            this.setState((state, props) => ({
              errors: error.response.data.errors
            }));
          })
        .finally(() => {
          this.setState({
            isFormHandling: false
          });
          this.props.hideSpinner();
        });
    } else {
      this.setState({
        isFormHandling: false
      });
    }
  }

  render() {

    // валидация смешанная client + server
    const displayNameClass = classNames({
      'form-control': true,
      'is-invalid': this.state.errors && this.state.errors.displayName
    });

    const displayNameErrorText = (this.state.errors && this.state.errors.displayName) ? this.state.errors.displayName : config.signUp.validation.displayName;

    const emailClass = classNames({
      'form-control': true,
      'is-invalid': this.state.errors && this.state.errors.email
    });

    const emailErrorText = (this.state.errors && this.state.errors.email) ? this.state.errors.email : config.signUp.validation.email;

    const passwordClass = classNames({
      'form-control': true,
      'is-invalid': this.state.errors && this.state.errors.password
    });

    const passwordErrorText = (this.state.errors && this.state.errors.password) ? this.state.errors.password : config.signUp.validation.password;

    const acceptUserAgreementClass = classNames({
      'custom-control-input': true,
      'is-invalid': this.state.errors && this.state.errors.acceptUserAgreement
    });

    const acceptUserAgreementErrorText = (this.state.errors && this.state.errors.acceptUserAgreement) ? this.state.errors.acceptUserAgreement : config.signUp.validation.acceptUserAgreement;

    const formClasses = classNames('form-signin', 'm-auto', 'w-100', {
      'was-validated': this.state.isFormValidated
    });

    return (
      <>
        <div className="row mt-3 row-cols-1">
          <form className={formClasses} id="signUpForm" noValidate onSubmit={this.handleSubmit}>
            <div className="form-label-group">
              <input type="text" id="displayName" name="displayName" className={displayNameClass}
                     placeholder="Display Name" required
                     autoFocus="" data-toggle="tooltip" data-placement="right" data-testid="displayNameInput" title="Tooltip on right"
              />
              <label htmlFor="displayName">Display Name</label>
              <div className="invalid-feedback">
                {displayNameErrorText}
              </div>
            </div>

            <div className="form-label-group">
              <input type="email" id="email" name="email" className={emailClass} placeholder="Email"
                     required
                     autoFocus="" data-testid="emailInput" />
              <label htmlFor="email">Email</label>
              <div className="invalid-feedback">
                {emailErrorText}
              </div>
            </div>

            <div className="form-label-group">
              <input type="password" id="password" name="password"
                     className={passwordClass} placeholder="Password" required data-testid="passwordInput" />
              <label htmlFor="password">Password</label>
              <div className="invalid-feedback">
                {passwordErrorText}
              </div>
            </div>

            <div className="form-label-group">
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className={acceptUserAgreementClass} id="acceptUserAgreement" name="acceptUserAgreement" required data-testid="acceptUserAgreementCheckbox" />
                <label className="custom-control-label" htmlFor="acceptUserAgreement">I accept <a
                  href="#" data-toggle="modal" data-target="#userAgreementModal">User
                  Agreement</a></label>
                <div className="invalid-feedback">
                  {acceptUserAgreementErrorText}
                </div>
              </div>
            </div>

            <button className="btn btn-lg btn-primary btn-block" type="submit" disabled={this.state.isFormHandling} data-testid="submitButton">
              Sign Up
            </button>
          </form>
        </div>
      </>
    );
  }
}

// const mapStateToProps = (state /*, ownProps*/) => {
//   return {
//     alert: state.alert
//   }
// }

// const mapDispatchToProps = { showAlert }
// const mapDispatchToProps = dispatch => {
//   return {
//     // dispatching plain actions
//     showAlert: () => dispatch(showAlert({type: 'success', title: 'Check you email!', text: 'Click on link in email to verify your account.'})),
//   }
// }

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ showAlert, showSpinner, hideSpinner }, dispatch)
}

// mapStateToProps

export default connect(
  null,
  mapDispatchToProps
)(SignUpForm);
