export default function isFunction( el ) {
    return !!( el && el.constructor && el.call && el.apply );
}