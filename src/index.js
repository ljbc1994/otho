import Handler from './components/handler';
import defaultOptions from './config/options';
import extend from './utils/extend';

export function load( userOptions ) {
        
    let options = extend( defaultOptions, userOptions );

    return new Handler( options ).init();
        
};

