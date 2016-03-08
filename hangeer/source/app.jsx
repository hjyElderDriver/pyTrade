import React from 'react';
import ReactDOM from 'react-dom';

import './style/app.less';

let App = React.createClass({
    returnThis() {
        return 666;
    },
    render() {
        return (<div className="container">
            233 {this.returnThis()}
                </div>);
    }
});

 ReactDOM.render(<App />, document.body);