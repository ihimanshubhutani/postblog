import { c as __makeTemplateObject } from '../tslib.es6-e024cfb8.js';
import React from 'react';
import { NodeViewWrapper } from '@tiptap/react';
import styled from '@emotion/styled';
import { g as divider } from '../icons-2651a870.js';

var StyleWrapper = styled(NodeViewWrapper)(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""])));
function DividerBlock(props) {
    return (React.createElement(StyleWrapper, { "data-drag-handle": "true", selected: props.selected, className: "graf graf--divider is-selected" },
        React.createElement("span", null)));
}
var DividerBlockConfig = function (options) {
    if (options === void 0) { options = {}; }
    var config = {
        icon: divider,
        name: "DividerBlock",
        tag: "divider-block",
        atom: true,
        component: DividerBlock,
        attributes: {},
        widget_options: {
            displayOnInlineTooltip: true,
            insertion: "insertion",
            insert_block: "divider-block",
        },
        priority: 1,
        parseHTML: [
            {
                tag: "divider-block",
            },
            {
                tag: "HR",
            },
        ],
        addInputRules: function () {
            return [/^(?:---|—-|___\s|\*\*\*\s)$/];
        },
    };
    return Object.assign(config, options);
};
function DividerBlockRenderer(_a) {
    _a.blockKey; _a.data; _a.domain;
    return (React.createElement("div", { className: "graf graf--divider is-selected" },
        React.createElement("span", null)));
}
var templateObject_1;

export { DividerBlockConfig, DividerBlockRenderer, StyleWrapper, DividerBlock as default };
