import ServerActions from './actions/ServerActions';
import {URL} from './Constants';
import {get} from 'jquery';

let API = {
    fetchLinks() {
        console.log("1. In API");
        get(URL, {
            query: `{
                links {
                    _id,
                    title,
                    url
                }
            }`
        }).done(res => ServerActions.recieveLinks(res.data.links));
    }
};

export default API;