import React, { Fragment } from 'react';
import {
    FormControl,
    FieldSet,
    FormLabel,
    FormGroup,
    FormControlLabel,
    Switch,
    Paper,
    Card
} from '@material-ui/core';
import {withRouter} from "react-router";
import Grid from '@material-ui/core/Grid';

const cardStyle = {
    display: 'block',
    maxWidth: '600px',
    margin: '0 auto',
    marginBottom: '10px',
    marginTop: '10px',
    padding: '10px',
};

class InterestsEditor extends React.Component {
    state = {
        children: true,
        seniors: true,
        animals: true,
        emergency: true,
        homelessness: true,
        medical: true,
        women: true,
        veterans: true,
        environment: true,
        labor: true,
        technology: true,
        funding: true,
        legal: true,
        creative: true,
        teaching: true
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked }) ;   
    };

    renderSwitch(k, i) {
        let checked = this.state[k];
        return (
            <Grid item>
                <FormControlLabel key={i}
                    control={
                        <Switch
                            checked={checked}
                            onChange={this.handleChange(k)}
                            value={k}
                        />
                    }
                    label={k.toUpperCase()}
                />
            </Grid>
        )
    };

    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <Card style={cardStyle}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Cause Areas of Interest</FormLabel>
                            <FormGroup row>
                                <Grid container>
                                    {[
                                        'children', 'animals', 'seniors',
                                        'women', 'emergency', 'veterans',
                                        'homelessness', 'medical', 'environment'
                                    ].map( (interest, i) => {
                                        return this.renderSwitch(interest, i)
                                    })}
                                </Grid>
                            </FormGroup>
                    </FormControl>
                </Card>
                <Card style={cardStyle}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Skills and Contributions</FormLabel>
                        <FormGroup row>
                            {['labor', 'technology', 'funding'].map( (interest, i) => {
                                return this.renderSwitch(interest, i)
                            })}
                        </FormGroup>
                        <FormGroup row>
                            {['creative', 'legal', 'teaching'].map( (interest, i) => {
                                return this.renderSwitch(interest, i)
                            })}
                        </FormGroup>
                    </FormControl>
                </Card>
            </Fragment>
        )
    }
}

export default withRouter(InterestsEditor);
