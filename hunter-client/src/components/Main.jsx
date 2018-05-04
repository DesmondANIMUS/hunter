import LinkStore from '../stores/LinkStore';
import React, { Component } from 'react';
import PropTypes from 'proptypes';
import API from '../API';

let _getAppState = () => {
    return {links: LinkStore.getAll()};
};

class Main extends Component {

    static propTypes = {
        limit: PropTypes.number
    };
    
    static defaultProps = {
        limit: 4
    };

    constructor(props) {
        super(props);
        this.state = _getAppState();
    }
    
    componentDidMount() {
        API.fetchLinks();
        LinkStore.on("change", this.onChange);
    }
    onChange = () => {
        this.setState(_getAppState());
        console.log("4. In View");                
    }        

    render() {
        const {links} = this.state;
        const {limit} = this.props;
        return (
            <div>                          
                <ul>
                    {links.slice(0, limit).map(l => <li key={l._id}><a href={l.url} target="_blank">{l.title}</a></li>)}
                </ul>
            </div>
        );
    }

    componentWillUnmount = () => LinkStore.removeListener("change", this.onChange);
}

export default Main;