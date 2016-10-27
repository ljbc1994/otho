import Handler from './components/handler';
import defaultOptions from './config/options';
import extend from './utils/extend';

/*
  Notes:
  - This part is going to change significantly to support
    several types of module loading.
*/
let Otho = {
    
    load: function( userOptions ) {
        
        let options = extend( defaultOptions, userOptions );
        
        return new Handler( options ).init();
        
    }
    
};

window.Otho = Otho;