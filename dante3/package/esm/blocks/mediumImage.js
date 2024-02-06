import { f as __rest, _ as _assign } from '../tslib.es6-e024cfb8.js';
import React from 'react';
import mediumZoom from 'medium-zoom';

function ReactMediumZoom(props) {
    var imgRef = React.useRef();
    var zoom = React.useRef(mediumZoom({
        margin: 40,
        background: '#000'
    }));
    React.useEffect(function () {
        if (!props.isEditable) {
            imgRef.current && zoom.current.attach(imgRef.current);
        }
        if (props.isEditable) {
            imgRef.current && zoom.current.detach(imgRef.current);
        }
    }, [props.isEditable]);
    var imgProps = __rest(props, []);
    return React.createElement("img", _assign({ ref: imgRef }, imgProps));
}

export { ReactMediumZoom as default };
