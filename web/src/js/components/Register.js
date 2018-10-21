import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { requiredMessage, isEmailMessage, minStringLengthMessage } from "../form_utils";
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import {attemptRegister, loginSuccess} from '../actions/users';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '../materials/Snackbar';
import {withRouter} from "react-router";

const styles = theme => ({
    wrapper: {
        marginTop: 15,
        maxWidth: 400,
        margin: "0 auto"
    },
    paper: {
        padding: theme.spacing.unit * 2,
    },
});


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone_number: '',
            is_ngo: false,
            email: '',
            password: '',
            errors: [],
        }
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value })
    }

    onSubmit = () => {
        this.props.onRegister(
            this.state.email,
            this.state.password,
            this.state.phone_number,
            this.state.is_ngo,
        ).then((result) => {
            if (result.data.success) {
                this.props.loginSuccess(this.state.email, result.data.id);

                this.setState({
                    errors: []
                });
            }
            else {
                this.setState({
                    errors: [
                        "Failed to register"
                    ]
                });
            }
        });
    };

    renderErrors = () => {
        return this.state.errors.map((error, index) => {
            return (
                <Snackbar
                    key={`error-${index}`}
                    variant="error"
                    className={this.props.classes.margin}
                    message={error}
                />
            );
        });
    };

    render() {
        const {classes, user} = this.props;

        return (
            <div className={classes.wrapper}>
                <Paper elevation={4} className={classes.paper}>
                    <div>
                        {this.renderErrors()}
                        <ValidatorForm onSubmit={this.onSubmit}>
                            <div>
                                <TextValidator
                                    name={"email"}
                                    label={"Email"}
                                    onChange={(e) => this.handleChange(e)}
                                    value={this.state.email}
                                    validators={["required", "isEmail"]}
                                    errorMessages={[requiredMessage, isEmailMessage]}
                                    margin="normal"
                                />
                            </div>
                            <div>
                                <TextValidator
                                    name={"password"}
                                    label={"Password"}
                                    type={"password"}
                                    onChange={(e) => this.handleChange(e)}
                                    value={this.state.password}
                                    validators={["required", "minStringLength:6"]}
                                    errorMessages={[requiredMessage, minStringLengthMessage(6)]}
                                    margin="normal"
                                />
                            </div>
                            <div>
                                <TextValidator
                                    name={"phone_number"}
                                    label={"Phone Number"}
                                    onChange={(e) => this.handleChange(e)}
                                    value={this.state.phone_number}
                                    validators={["required"]}
                                    errorMessages={[requiredMessage]}
                                    margin={"normal"}
                                />
                            </div>
                            <Button type="submit" variant="contained" color="primary"
                                    disabled={user.isFetching}
                            >
                                Register {
                                user.isFetching ?
                                    <CircularProgress size={25} className={classes.progress} /> :
                                    undefined
                            }
                            </Button>
                        </ValidatorForm>
                    </div>
                </Paper>
            </div>
        );
    }
}

const RegisterContainer = connect(
    (state, ownProps) => {
        return {
            user: state.users.user
        };
    },
    (dispatch, ownProps) => {
        return {
            onRegister: (email, password, phone_number, is_ngo) => {
                return dispatch(attemptRegister({email, password, phone_number, is_ngo}));
            },
            loginSuccess: (email_address, id) => {
                return dispatch(loginSuccess({email_address, id}));
            }
        }
    },
)(Register);

export default withRouter(withStyles(styles)(RegisterContainer));
