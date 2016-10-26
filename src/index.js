import Handler from './components/handler';
import defaultOptions from './app/options';
import extend from './utils/extend';

let Otho = {
    
    load: function( userOptions ) {
        
        let options = extend( defaultOptions, userOptions );
        
        return new Handler( options ).init();
        
    }
    
};

window.Otho = Otho;