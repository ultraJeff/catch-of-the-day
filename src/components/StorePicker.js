import React, { Component } from 'react';
import { getFunName } from '../helpers';

//Events in React are wrapped in SyntheticEvent class and are done inline

class StorePicker extends Component {
    // constructor() {
    //     super();
    //     //Need this line to bind this as StorePicker inside of goToStore if you use this technique
    //     this.goToStore = this.goToStore.bind(this);
    // }

    goToStore(event) {
        event.preventDefault();
        console.log('You changed the URL');
        //first grab the text from the box
        const storeId = this.storeInput.value;
        console.log(`Going to ${storeId}`);
        //second we're going to transition from / to /store/:storeId
        //need to use ContextTypes (below) to make transitionTo work
        this.context.router.transitionTo(`/store/${storeId}`)
    }

    render() {
        return (
            //This technique of binding this isn't great if there's multiple copies of the element on the page
            //<form className="store-selector" onSubmit={this.goToStore.bind(this)}>
            <form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
                <h2>Please Enter A Store</h2>
                <input type="text" required placeholder="Store Name"
                    defaultValue={getFunName()} ref={(input) => { this.storeInput = input }} />
                <button type="submit">Visit Store --> </button>
            </form>
        )
    }
}

//This makes router available to StorePicker instantly! Wow!
StorePicker.contextTypes = {
    router: React.PropTypes.object
}

export default StorePicker;
