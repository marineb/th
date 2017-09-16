import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Footer from './components/footer';

import Home from './pages/home';
import Congratulations from './pages/congratulations';

export default class App extends Component {
    render() {
        return (
            <div className="container">
                <div className="page">
                    <div className="content">
                        <Router>
                            <Home path="/" />
                            <Congratulations path="/congratulations" />
                        </Router>

                        <div className="legalities">
                            Le calcul effectué est purement anonyme et n’a qu’une valeur indicative.
                            Il dépend uniquement des éléments en notre possession et ne préjuge en rien
                            du montant qui sera finalement retenu par l’administration fiscale.
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        )
    }
};
