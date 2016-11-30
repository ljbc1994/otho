/**
 * @function
 * Determines whether the supplied element is a node list.
 * See http://stackoverflow.com/questions/7238177/how-to-detect-htmlcollection-nodelist-in-javascript for a detailed description.
 * @param nodes - The nodes to check.
 * @returns {Boolean} - Whether the element is a node list
 */
export default function isNodeList( nodes ) {
    
    var stringRepr = Object.prototype.toString.call(nodes);

    return typeof nodes === 'object' &&
        /^\[object (HTMLCollection|NodeList|Object)\]$/.test(stringRepr) &&
        (typeof nodes.length === 'number') &&
        (nodes.length === 0 || (typeof nodes[0] === "object" && nodes[0].nodeType > 0));
    
}
