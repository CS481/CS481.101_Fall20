import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Topbar from "../components/Topbar";
import Navbar from "../components/Navbar";
import {RegisterRoutes} from "../util/RouteBuilder";
import CreateStyles from "../util/Stylesheet";
import Resource from "../schema/Resource";


function Playerpage() {
    const Styles = CreateStyles();
    let [state, setState] = React.useState({
        checkbox1: true,
        checkbox2: false,
        checkbox3: false,
    });

    const handleChangeCheck = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    let { checkbox1, checkbox2, checkbox3 } = state;
    let error = [checkbox1, checkbox2, checkbox3].filter((v) => v).length !== 2;

    let [expanded, setExpanded, value] = React.useState(false);

    let [selectedValue, setSelectedValue] = React.useState('a');

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }
    const handleChangeRadio = (event) => {
        setSelectedValue(event.target.value);
    };



    return (
        <div className={Styles.root}>
            <Topbar message="Simulation Player"/>
            <Navbar/> {/* This is necessary for some styling reason I'm too backend to understand */}

            <main className={Styles.content}>
                <div className={Styles.toolbar} /> {/* Why is this necessary */}
                <Card className={Styles.root}>
                    <CardHeader
                    title="Prompt:"
                    />
                    <CardContent>
                        <Typography variant="h2" component="p">
                            {JSON.stringify(Resource.FromJSON('{"name": "yolo", "amount": 1}'))}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <IconButton
                            className={clsx(Styles.expand, {
                                [Styles.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                        <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <form className={Styles.root} noValidate autoComplete="off">
                                <TextField id="response-form" label="response-1" variant="filled" />
                                <TextField id="response-form" label="response-2" variant="filled" />
                                <TextField id="response-form" label="response-3" variant="filled" />
                            </form>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Multiple Choice</FormLabel>
                                <RadioGroup aria-label="options" name="options1" value={value} onChange={handleChangeRadio}>
                                    <FormControlLabel value="firstChoice" control={<Radio />} label="first" />
                                    <FormControlLabel value="secondChoice" control={<Radio />} label="second" />
                                    <FormControlLabel value="thirdChoice" control={<Radio />} label="third" />
                                </RadioGroup>
                            </FormControl>
                            <FormControl component="fieldset" className={Styles.formControl}>
                                <FormLabel component="legend">Checkboxes</FormLabel>
                                <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox checked={checkbox1} onChange={handleChangeCheck} name="checkbox1" />}
                                    label="Checkbox 1"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={checkbox2} onChange={handleChangeCheck} name="checkbox2" />}
                                    label="Checkbox 2"
                                />
                                <FormControlLabel
                                    control={<Checkbox checked={checkbox3} onChange={handleChangeCheck} name="checkbox3" />}
                                    label="Checkbox 3"
                                />
                            </FormGroup>
                            
                        </FormControl>
                        </CardContent>
                    </Collapse>
                </Card>
            </main>
        </div>
    );
}

RegisterRoutes(Playerpage, "/player", "/playerpage", "/Player", "/Playerpage", "/playerPage");
export default Playerpage;