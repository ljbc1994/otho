import Handler from './components/handler';
import defaultOptions from './app/options';
import extend from './utils/extend';

let Otho = {
    
    load: function( userOptions ) {
        
        let options = extend( defaultOptions, userOptions );
        
        console.log(options);
        
        return new Handler( options ).init();
        
    }
    
};

window.Otho = Otho;