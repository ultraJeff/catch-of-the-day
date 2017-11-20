import React, { Component } from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends Component {
    constructor() {
        super();

        // Have to do this to use this in class methods
        this.addFish = this.addFish.bind(this);
        this.removeFish = this.removeFish.bind(this);
        this.updateFish = this.updateFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.addToOrder = this.addToOrder.bind(this);
        this.removeFromOrder = this.removeFromOrder.bind(this);

        // getInitialState
        this.state = {
            fishes: {},
            order: {}
        }
    }

    componentWillMount() {// this runs right before the <App> is rendered
        this.ref = base.syncState(`${this.props.params.storeId}/fishes`
        , {
            context: this,
            state: 'fishes'
        });

        // check if there is any order in localstorage
        const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

        if (localStorageRef) {
            // update our App component's order state
            this.setState({
                order: JSON.parse(localStorageRef)
            });
        }
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('Something changed');
        console.log({nextProps, nextState});

        localStorage.setItem(`order-${this.props.params.storeId}`,
            JSON.stringify(nextState.order));
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    addFish(fish) {
        // update our state
        // make a copy of existing fishes state
        const fishes = {...this.state.fishes};
        // add in our new fish
        const timestamp = Date.now();
        fishes[`fish-${timestamp}`] = fish;
        // set state
        this.setState({ fishes: fishes });
    }

    updateFish(key, updatedFish) {
        const fishes = {...this.state.fishes};
        fishes[key] = updatedFish;
        this.setState({ fishes });
    }

    removeFish(key) {
        const fishes = {...this.state.fishes};
        fishes[key] = null;
        this.setState({ fishes });
    }

    loadSamples() {
        this.setState({
            fishes: sampleFishes
        })
    }

    addToOrder(key) {
        // take a copy of our state
        const order = {...this.state.order};
        // update or add the new number of fish ordered
        order[key] = order[key] + 1 || 1;
        // update our state
        this.setState({ order })
    }

    removeFromOrder(key) {
        // take a copy of our state
        const order = {...this.state.order};
        // update or add the new number of fish ordered
        // (not limited by FireBase so we can use delete)
        delete order[key];
        // update our state
        this.setState({ order })
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="list-of-fishes">
                        {/*Object.keys returns array of fishes*/}
                        {
                            Object
                                .keys(this.state.fishes)
                                .map(key => <Fish key={key}
                                    index={key}
                                    details={this.state.fishes[key]}
                                    addToOrder={this.addToOrder} />)
                        }
                    </ul>
                </div>
                <Order
                    fishes={this.state.fishes}
                    order={this.state.order}
                    params={this.props.params}
                    removeFromOrder={this.removeFromOrder}
                />
                <Inventory
                    fishes={this.state.fishes}
                    addFish={this.addFish}
                    removeFish={this.removeFish}
                    updateFish={this.updateFish}
                    loadSamples={this.loadSamples}
                    storeId={this.props.params.storeId}
                />
            </div>
        )
    }
}

App.propTypes = {
    params: React.PropTypes.object.isRequired
}

export default App;
