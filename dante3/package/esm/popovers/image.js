import React from 'react';
import { AnchorStyle } from '../styled/menu.js';
import { E as imageLeft, F as imageCenter, G as imageFill, H as imageWide } from '../icons-2651a870.js';
import '../tslib.es6-e024cfb8.js';
import '@emotion/styled';
import 'polished';

function ImageTooltip(_a) {
    _a.item; var handleClick = _a.handleClick;
    var buttons = [
        { type: "left", icon: imageLeft },
        { type: "center", icon: imageCenter },
        { type: "fill", icon: imageFill },
        { type: "wide", icon: imageWide },
    ];
    var image_popover = React.useRef(null);
    React.useEffect(function () {
        //getPosition()
    }, []);
    function directionClick(e, item) {
        e.preventDefault();
        handleClick(item.type);
    }
    return (React.createElement(AnchorStyle, { ref: image_popover, className: "dante-popover popover--Aligntooltip popover--top \n      popover--animated" },
        React.createElement("div", { className: "popover-inner" },
            React.createElement("ul", { className: "dante-menu-buttons" }, buttons.map(function (item, i) {
                return (React.createElement("li", { key: "menu-".concat(item.type), className: "dante-menu-button align-center", onMouseDown: function (e) { return directionClick(e, item); } },
                    React.createElement("span", { className: "tooltip-icon dante-icon" }, item.icon())));
            }))),
        React.createElement("div", { className: "popover-arrow", "data-popper-arrow": true })));
}
var DanteImagePopoverConfig = function (options) {
    if (options === void 0) { options = {}; }
    var config = {
        ref: 'image_popover',
        component: ImageTooltip
    };
    return Object.assign(config, options);
};

export { DanteImagePopoverConfig, ImageTooltip as default };
