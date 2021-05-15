import classNames from "classnames";
import React, { ChangeEvent, FormEvent } from "react";
import { connect } from "react-redux";
import { login } from "../../actions/securityActions";

interface IMyComponentState {
  username: string;
  password: string;
  errors: any;
  security: object;
}

class Login extends React.Component<any, IMyComponentState> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errors: {},
      security: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.security.validToken) {
      this.props.history.push("/dashboard");
    }
  }

  public componentWillReceiveProps(nextProps: any) {
    if (nextProps.errors) {
      const value = nextProps.errors;
      this.setState({ ...this.state, errors: value });
    }

    if (nextProps.security.validToken) {
      this.props.history.push("/dashboard");
    }
  }

  onSubmit(e: FormEvent) {
    e.preventDefault();
    const LoginRequest = {
      username: this.state.username,
      password: this.state.password,
    };

    this.props.login(LoginRequest);
  }

  public onChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    const key = e.target.name;
    const value = e.target.value;

    this.setState({ ...this.state, [key]: value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classNames("form-control form-control-lg", {
                      "is-invalid": errors.username,
                    })}
                    placeholder="Email Address"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                  />
                  {errors.username && (
                    <div className="invalid-feedback"> {errors.username} </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classNames("form-control form-control-lg", {
                      "is-invalid": errors.password,
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    <div className="invalid-feedback"> {errors.password} </div>
                  )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  security: state.security,
  errors: state.errors,
});

export default connect(mapStateToProps, { login })(Login);
