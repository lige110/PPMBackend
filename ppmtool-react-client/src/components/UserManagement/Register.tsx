import classNames from "classnames";
import React, { ChangeEvent, FormEvent } from "react";
import { connect } from "react-redux";
import { createNewUser } from "../../actions/securityActions";

interface IMyComponentState {
  username: string;
  fullName: string;
  password: string;
  confirmPassword: string;
  errors: any;
}

class Register extends React.Component<any, IMyComponentState> {
  constructor(props: any) {
    super(props);

    this.state = {
      username: "",
      fullName: "",
      password: "",
      confirmPassword: "",
      errors: {},
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
      this.setState({ ...this.state, errors: nextProps.errors });
    }
  }

  public onChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    const key = e.target.name;
    const value = e.target.value;

    this.setState({ ...this.state, [key]: value });
  }

  public onSubmit(e: FormEvent) {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      fullName: this.state.fullName,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };
    this.props.createNewUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your Account</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classNames("form-control form-control-lg", {
                      "is-invalid": errors.fullName,
                    })}
                    placeholder="Full Name"
                    name="fullName"
                    value={this.state.fullName}
                    onChange={this.onChange}
                  />
                  {errors.fullName && (
                    <div className="invalid-feedback">{errors.fullName} </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={classNames("form-control form-control-lg", {
                      "is-invalid": errors.username,
                    })}
                    placeholder="Name"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                  />
                  {errors.username && (
                    <div className="invalid-feedback">{errors.username} </div>
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
                    <div className="invalid-feedback">{errors.password} </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classNames("form-control form-control-lg", {
                      "is-invalid": errors.confirmPassword,
                    })}
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={this.state.confirmPassword}
                    onChange={this.onChange}
                  />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">
                      {errors.confirmPassword}
                    </div>
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
  errors: state.errors,
  security: state.security,
});

export default connect(mapStateToProps, { createNewUser })(Register);
