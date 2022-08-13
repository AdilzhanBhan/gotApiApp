import React, {Component} from 'react';
import './randomChar.css';
import Spinner from 'reactstrap/lib/Spinner';
import ErrorMessage from '../errorMessage/'
import gotService from '../../services/gotService'; 

export default class RandomChar extends Component {

    gotService = new gotService();

    constructor() {
        super();
        this.updateChar();
    }

    state = {
        char: {},
        loading: true
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
            error: false
        })
    }

    updateChar = () => {
        const id = Math.round(Math.random() * 1000 + 100);
        // макс и мин значение 
        this.gotService.getCharacter(id)
            .then((this.onCharLoaded))
            .catch(this.onError)
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false

        })
    }

    render() {
        const {char, loading, error} = this.state
        const {classNames} = this.props

        const errorMessage = error ? <ErrorMessage/> : null
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;

        return (
            <div className={classNames}>
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}

const View = ({char}) => {
    const {name, gender, born, died, culture} = char
    return (
        <>        
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}