import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import gotService from '../../services/gotService'; 
import './app.css'


export default class App extends Component {

    constructor() {
        super();
        this.updateChar();
    }
    
    RandomChar = new RandomChar();
    gotService = new gotService();
    
    state = {
        showView: true
    }

    resetRandom = () => {
        this.setState(({showView}) => {
            return {
                showView: !showView
            };
        });
    };

    updateChar = () => {
        const id = Math.round(Math.random() * 1000 + 100);
        // макс и мин значение 
        this.gotService.getCharacter(id)
            .then((this.onCharLoaded))
            .catch(this.onError)
    }

    render() {
        const {showView} = this.state 
        let classNames = 'random-block rounded';
        
        if (showView) {
            classNames += ' hide';
        } 
        
        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            <RandomChar classNames={classNames}/>
                        </Col>
                    </Row>
                    <button
                        className="btn btn-dark" 
                        type='button'
                        onClick={ this.resetRandom }>Random Char
                    </button>
                    <Row>
                        <Col md='6'>
                            <ItemList />
                        </Col>
                        <Col md='6'>
                            <CharDetails />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
    
};

