import { c as __makeTemplateObject } from '../../tslib.es6-e024cfb8.js';
import React from 'react';
import { NodeViewWrapper } from '@tiptap/react';
import styled from '@emotion/styled';
import { m as giphyLogo } from '../../icons-2651a870.js';
import App from './giphy.js';
import 'axios';

var PoweredBy = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\n  font-size: 10px;\n  display: flex;\n  justify-content: space-around;\n  justify-items: center;\n  p {\n    margin: 0px;\n  }\n\n"], ["\n\n  font-size: 10px;\n  display: flex;\n  justify-content: space-around;\n  justify-items: center;\n  p {\n    margin: 0px;\n  }\n\n"])));
var Modal = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 10;\n  //background-color: ", ";\n  position: fixed;\n  justify-content: center;\n  align-items: center;\n  display: flex;\n"], ["\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 10;\n  //background-color: ", ";\n  position: fixed;\n  justify-content: center;\n  align-items: center;\n  display: flex;\n"])), function (props) { return props.theme.dante_control_color; });
var ModalWrapper = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  padding: 1.5rem;\n  overflow: hidden;\n  max-width: 28rem;\n  margin-top: 2rem;\n  margin-bottom: 2rem;\n  display: inline-block;\n  border-radius: 0.3rem;\n  position: relative;\n  box-shadow: 1px 2px 7px 0px #27262673;\n  border: 1px solid #2f2f2f3b;\n  display: flex;\n  flex-direction: column;\n  background-color: ", ";\n  .close {\n    align-self: flex-end;\n    width: 20px;\n    height: 20px;\n  }\n  input {\n    padding: 0.2em;\n    border: 1px solid #ccc;\n    width: 100%;\n  }\n"], ["\n  padding: 1.5rem;\n  overflow: hidden;\n  max-width: 28rem;\n  margin-top: 2rem;\n  margin-bottom: 2rem;\n  display: inline-block;\n  border-radius: 0.3rem;\n  position: relative;\n  box-shadow: 1px 2px 7px 0px #27262673;\n  border: 1px solid #2f2f2f3b;\n  display: flex;\n  flex-direction: column;\n  background-color: ", ";\n  .close {\n    align-self: flex-end;\n    width: 20px;\n    height: 20px;\n  }\n  input {\n    padding: 0.2em;\n    border: 1px solid #ccc;\n    width: 100%;\n  }\n"])), function (props) { return props.theme.dante_inversed_color; });
var GiphyLogo = function () {
    return (React.createElement("svg", { width: "20", height: "20", viewBox: "0 1 20 20", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement("g", { id: "Page-1", fill: "none", fillRule: "evenodd" },
            React.createElement("g", { id: "giphy-ar21", transform: "translate(-8 -6)" },
                React.createElement("g", { id: "Group", transform: "translate(8.569 6.763)" },
                    React.createElement("path", { d: "M6.68649946,11.474 L9.32049946,11.474 C9.32649946,11.552 9.32649946,11.618 9.32649946,11.708 C9.32649946,13.196 8.18649946,14.09 6.95649946,14.09 C5.61249946,14.09 4.59849946,13.04 4.59849946,11.762 C4.59849946,10.436 5.66649946,9.476 6.97449946,9.476 C8.03649946,9.476 8.94849946,10.19 9.19449946,11.048 L7.92249946,11.048 C7.74849946,10.736 7.42449946,10.472 6.94449946,10.472 C6.38649946,10.472 5.73249946,10.886 5.73249946,11.762 C5.73249946,12.692 6.39249946,13.094 6.95049946,13.094 C7.51449946,13.094 7.89249946,12.812 8.01249946,12.38 L6.68649946,12.38 L6.68649946,11.474 Z M10.2894998,14 L10.2894998,9.56 L11.4234998,9.56 L11.4234998,14 L10.2894998,14 Z M12.6025002,14 L12.6025002,9.56 L15.0265002,9.56 L15.0265002,10.556 L13.6885002,10.556 L13.6885002,11.312 L14.9785002,11.312 L14.9785002,12.308 L13.6885002,12.308 L13.6885002,14 L12.6025002,14 Z", id: "GIF", fill: "#00000070" }),
                    React.createElement("polygon", { id: "Path", fill: "#00000070", transform: "rotate(-1.52 1.653 11.39)", points: "0.52516176 2.58609459 2.78104613 2.58609459 2.78104613 20.1949155 0.52516176 20.1949155" }),
                    React.createElement("polygon", { id: "Path", fill: "#00000070", transform: "rotate(-1.52 17.506 13.227)", points: "16.3763287 6.67947428 18.6350224 6.67947428 18.6350224 19.7737175 16.3763287 19.7737175" }),
                    React.createElement("polygon", { id: "Path", fill: "#00000070", transform: "rotate(-1.52 9.813 21.107)", points: "0.78567191 19.9778258 18.841174 19.9778258 18.841174 22.2365195 0.78567191 22.2365195" }),
                    React.createElement("polygon", { id: "Path", fill: "#00000070", transform: "rotate(-1.52 5.902 1.342)", points: "0.259918091 0.212569605 11.544958 0.212569605 11.544958 2.47126329 0.259918091 2.47126329" }),
                    React.createElement("polygon", { id: "Path", fill: "#00000070", points: "11.6923919 6.82945814 18.4628543 6.64966162 18.4038586 4.39377726 16.1451649 4.45277299 16.0861692 2.19688863 13.8302848 2.25588436 13.7712891 0 11.5125954 0.0589957305" }),
                    React.createElement("polygon", { id: "Path", fill: "#00000070", transform: "rotate(-1.52 17.365 7.809)", points: "16.2354766 6.67956253 18.4941703 6.67956253 18.4941703 8.93825622 16.2354766 8.93825622" }))))));
};
var GiphyBlock = function (props) {
    React.useState(true)[0];
    var getAspectRatio = function (w, h) {
        var maxWidth = 1000;
        var maxHeight = 1000;
        var ratio = 0;
        var width = w; // Current image width
        var height = h; // Current image height
        // Check if the current width is larger than the max
        if (width > maxWidth) {
            ratio = maxWidth / width; // get ratio for scaling image
            height = height * ratio; // Reset height to match scaled image
            width = width * ratio; // Reset width to match scaled image
            // Check if current height is larger than max
        }
        else if (height > maxHeight) {
            ratio = maxHeight / height; // get ratio for scaling image
            width = width * ratio; // Reset width to match scaled image
            height = height * ratio; // Reset height to match scaled image
        }
        var fill_ratio = (height / width) * 100;
        var result = { width: width, height: height, ratio: fill_ratio };
        // console.log result
        return result;
    };
    var selectImage = function (giphyblock) {
        var _a = giphyblock.images.original, url = _a.url, height = _a.height, width = _a.width;
        props.editor.commands.insertContent({
            type: 'ImageBlock',
            attrs: {
                url: url,
                aspect_ratio: getAspectRatio(width, height),
                forceUpload: true,
            },
            content: [
                {
                    type: 'text',
                    text: 'Giphy image',
                },
            ],
        });
    };
    var selfDestroy = function () {
        props.deleteNode();
    };
    return (React.createElement(NodeViewWrapper, { className: "dante-giphy-wrapper" },
        React.createElement("div", { contentEditable: false, "data-drag-handle": "true" },
            React.createElement(Modal, null,
                React.createElement(ModalWrapper, null,
                    React.createElement("button", { className: "close", onClick: selfDestroy },
                        React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
                            React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" }))),
                    React.createElement(App, { apiKey: props.extension.config.addOptions.key, handleSelected: function (data) {
                            selectImage(data);
                        } }),
                    React.createElement(PoweredBy, null,
                        React.createElement("p", null, "Powered by Giphy"),
                        React.createElement(GiphyLogo, null)))))));
};
var GiphyBlockConfig = function (options) {
    if (options === void 0) { options = {}; }
    var config = {
        icon: giphyLogo,
        name: "GiphyBlock",
        tag: "giphy-block",
        component: GiphyBlock,
        atom: true,
        widget_options: {
            displayOnInlineTooltip: true,
            insertion: "insertion",
            insert_block: "GiphyBlock",
        },
        options: {
            placeholder: "Search any gif on giphy",
            key: "97g39PuUZ6Q49VdTRBvMYXRoKZYd1ScZ",
        },
        attributes: {
            forceUpload: { default: false }
        },
    };
    return Object.assign(config, options);
};
var templateObject_1, templateObject_2, templateObject_3;
/*
export const GiphyBlockConfig = (options = {}) => {
  const config = {
    title: "add an image",
    type: "giphy",
    icon: GiphyLogo,
    block: GiphyBlock,
    editable: false,
    renderable: true,
    breakOnContinuous: true,
    wrapper_class: "graf graf--figure",
    selected_class: "is-selected is-mediaFocused",
    widget_options: {
      displayOnInlineTooltip: true,
      insertion: "insertion",
      insert_block: "giphy",
      // insertion: "func",
      // funcHandler: options.handleFunc,
    },
    options: {
      placeholder: "Search any gif on giphy",
    },
  };

  return Object.assign(config, options);
};*/

export { GiphyBlockConfig, GiphyBlock as default };
