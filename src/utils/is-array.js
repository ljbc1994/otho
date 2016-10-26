/*
 *
 */
export default function isArray( el ) {
    return Object.prototype.toString.call( el ) === '[object Array]';
}