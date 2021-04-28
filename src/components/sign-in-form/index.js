import React from 'react';
import axios from 'axios';
import UserAgreementModal from '../user-agreement-modal';
import classNames from 'classnames';
import config from '../../config/default.json';
import {bindActionCreators} from "redux";
import {hideSpinner, showSpinner} from "../../features/spinner/spinnerSlice";
import {connect} from "react-redux";
import { signIn } from "../../features/account/accountSlice";

class SignInForm extends React.Component {

  constructor(props) {
    super(props);

    // Конструктор — это единственное место, где вы можете присвоить значение this.state напрямую.
    this.state = {
      isFormHandling: false,
      errors: null, // validation errors
      isFormValidated: false
    }

    // для ES6 классов нужна привязка контекста или нужно использовать стрелки в обработчиках
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  resetForm() {
    this.setState({
      errors: null,
      isFormValidated: false
    });

    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
  }

  handleSubmit(event) {
    this.setState({
      isFormHandling: true
    });

    event.preventDefault();
    event.stopPropagation();

    const formElem = document.getElementById('signInForm');

    const isFormValid = formElem.checkValidity();
    this.setState({
      isFormValidated: true
    });

    if (isFormValid !== false) {
      const formData = new FormData(formElem);
      this.props.showSpinner({text: 'Form sending...'});

      // пока API нет
      this.setState((state, props) => ({
        isFormHandling: false
      }));
      this.resetForm();
      this.props.hideSpinner();
      this.props.signIn({
        user: 1,
        accessToken: 'wefwefwef',
        refreshToken: 'ffff546'
      });

      // TODO: когда будет API отправляем запрос
      // axios.post('/api/tokens', {
      //     email: formData.get('email'),
      //     password: formData.get('password'),
      //   })
      //   .then(
      //     (response) => {
      //       if (response.status === 201) {
      //         // state компонента можно поменять только так
      //         this.setState((state, props) => ({
      //           isFormHandling: false
      //         }));
      //         this.resetForm();
      //         this.props.hideSpinner();
      //         this.props.signIn({
      //           user: response.data.user,
      //           accessToken: response.data.accessToken,
      //           refreshToken: response.data.refreshToken
      //         });
      //        }
      //     },
      //     // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
      //     // чтобы не перехватывать исключения из ошибок в самих компонентах.
      //     (error) => {
      //       this.props.hideSpinner();
      //       this.setState({
      //         isFormHandling: false
      //       });
      //       this.setState((state, props) => ({
      //         errors: error.response.data.errors
      //       }));
      //     });
    } else {
      this.setState({
        isFormHandling: false
      });
    }
  }

  render() {

    // валидация смешанная client + server
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

    const formClasses = classNames('form-signin', 'm-auto', 'w-100', {
      'was-validated': this.state.isFormValidated
    });

    return (
      <>
        <div className="row mt-3 row-cols-1">
          <form className={formClasses} id="signInForm" noValidate onSubmit={this.handleSubmit}>

            <div className="form-label-group">
              <input type="email" id="email" name="email" className={emailClass} placeholder="Email"
                     required
                     autoFocus=""/>
              <label htmlFor="email">Email</label>
              <div className="invalid-feedback">
                {emailErrorText}
              </div>
            </div>

            <div className="form-label-group">
              <input type="password" id="password" name="password"
                     className={passwordClass} placeholder="Password" required/>
              <label htmlFor="password">Password</label>
              <div className="invalid-feedback">
                {passwordErrorText}
              </div>
            </div>

            <button className="btn btn-lg btn-primary btn-block" type="submit" disabled={this.state.isFormHandling}>
              Sign In
            </button>
          </form>
        </div>
      </>
    );
  }

  componentDidMount() {
    console.log('sign in form did mount');
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // вызывается дважды, потому что два setState выше!
    console.log('sign in form did update');
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signIn, showSpinner, hideSpinner }, dispatch)
}

export default connect(
  null,
  mapDispatchToProps
)(SignInForm);
