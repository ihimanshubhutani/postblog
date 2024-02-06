import { D as DanteEditor, V as VideoRecorderRenderer, a as VideoRecorderBlockConfig } from './index-8a81369c.js';
export { R as MediaRecorder, b as VideoRecorderBlock, e as extensionFactory } from './index-8a81369c.js';
import { _ as _assign, a as __extends } from './tslib.es6-e024cfb8.js';
import React, { useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import theme from './styled/themes/default.js';
import EditorContainer from './styled/base.js';
export { default as darkTheme } from './styled/themes/dark.js';
export { i as Icons } from './icons-2651a870.js';
export { default as Styled } from './styled/index.js';
import { ImageRenderer, ImageBlockConfig } from './blocks/image.js';
export { default as ImageBlock } from './blocks/image.js';
import { EmbedBlockRenderer, EmbedBlockConfig } from './blocks/embed.js';
export { default as EmbedBlock } from './blocks/embed.js';
import { VideoBlockRenderer, VideoBlockConfig } from './blocks/video.js';
export { default as VideoBlock } from './blocks/video.js';
import { PlaceholderBlockConfig } from './blocks/placeholder.js';
export { default as PlaceholderBlock } from './blocks/placeholder.js';
import { GiphyBlockConfig } from './blocks/giphy/giphyBlock.js';
export { default as GiphyBlock } from './blocks/giphy/giphyBlock.js';
import { AudioRecorderRenderer, AudioRecorderBlockConfig } from './blocks/audioRecorder.js';
export { default as AudioRecorderBlock } from './blocks/audioRecorder.js';
import { FileBlockRenderer, FileBlockConfig } from './blocks/file.js';
export { default as FileBlock } from './blocks/file.js';
import { DividerBlockRenderer, DividerBlockConfig } from './blocks/divider.js';
export { default as DividerBlock } from './blocks/divider.js';
import { CodeBlockConfig } from './blocks/code.js';
export { default as CodeBlock } from './blocks/code.js';
export { MenuBarConfig } from './popovers/menuBar.js';
export { AddButtonConfig } from './popovers/addButton.js';
import { SpeechToTextBlockConfig } from './blocks/speechToText.js';
export { default as SpeechToTextBlock } from './blocks/speechToText.js';
import '@tiptap/react';
import 'lowlight/lib/core';
import './plugins/tipTapPlaceholder.js';
import '@tiptap/core';
import 'prosemirror-view';
import 'prosemirror-state';
import './plugins/colorStyle.js';
import '@tiptap/extension-text-style';
import '@tiptap/starter-kit';
import '@tiptap/extension-code-block-lowlight';
import '@tiptap/extension-focus';
import '@tiptap/extension-link';
import '@tiptap/extension-dropcursor';
import './styled/menu.js';
import '@emotion/styled';
import 'polished';
import 'prop-types';
import 'axios';
import 'use-countdown-timer';
import './blocks/videoRecorder/styled.js';
import './blockUtils-55899836.js';
import './blocks/mediumImage.js';
import 'medium-zoom';
import './blocks/giphy/giphy.js';
import './popovers/image.js';
import './popovers/color.js';
import 'react-colorful';

// A new Y document
//const ydoc = new Y.Doc()
// Registered with a WebRTC provider
//const provider = new WebrtcProvider('example-document', ydoc)
function Editor(props) {
    var _a = useState(null); _a[0]; _a[1];
    var _b = useState(false); _b[0]; _b[1];
    return (React.createElement(ThemeProvider, { theme: props.theme || theme },
        React.createElement(EditorContainer, null,
            React.createElement(DanteEditor
            //fixed={fixed}
            , _assign({}, props)))));
}

function Renderer(_a) {
    var raw = _a.raw; _a.html; var theme$1 = _a.theme, domain = _a.domain;
    var convertNodeToElement = function (node) {
        switch (node.type) {
            case 'heading':
                switch (node.attrs.level) {
                    case 1:
                        return React.createElement("h1", { className: "graf graf--h" }, traverseNodes(node.content));
                    case 2:
                        return React.createElement("h2", { className: "graf graf--h" }, traverseNodes(node.content));
                    case 3:
                        return React.createElement("h3", { className: "graf graf--h" }, traverseNodes(node.content));
                }
            case 'blockquote':
                return React.createElement("blockquote", null, traverseNodes(node.content));
            case 'ImageBlock':
                return (React.createElement(ImageRenderer, { blockKey: node.id, data: node.attrs, domain: domain }));
            case 'AudioRecorderBlock':
                return (React.createElement(AudioRecorderRenderer, { blockKey: node.id, data: node.attrs, domain: domain }));
            case 'DividerBlock':
                return React.createElement(DividerBlockRenderer, { blockKey: node.id, data: node.attrs });
            case 'EmbedBlock':
                return React.createElement(EmbedBlockRenderer, { blockKey: node.id, data: node.attrs });
            case 'VideoBlock':
                return React.createElement(VideoBlockRenderer, { blockKey: node.id, data: node.attrs });
            case 'FileBlock':
                return (React.createElement(FileBlockRenderer, { blockKey: node.id, data: node.attrs, domain: domain }));
            case 'VideoRecorderBlock':
                return React.createElement(VideoRecorderRenderer, { blockKey: node.id, data: node.attrs, domain: domain });
            case 'paragraph':
                return React.createElement("p", { className: "graf graf--p", key: node.id }, traverseNodes(node.content));
            case 'bulletList':
                return React.createElement("ul", { className: "graf graf--ul", key: node.id }, traverseNodes(node.content));
            case 'listItem':
                return React.createElement("li", { className: "graf graf--li", key: node.id }, traverseNodes(node.content));
            case 'codeBlock':
                return React.createElement("pre", { className: "graf graf--pre", key: node.id }, traverseNodes(node.content));
            case 'text':
                var textElement = React.createElement(React.Fragment, { key: node.id }, node.text);
                if (node.marks && node.marks.length > 0) {
                    return node.marks.reduce(function (element, mark) {
                        return handleMark(element, mark, node);
                    }, textElement);
                }
                return textElement;
            // Add cases for other node types as needed
            default:
                console.warn("no handler for node", node);
                return null;
        }
    };
    var handleMark = function (element, mark, node) {
        switch (mark.type) {
            case 'textStyle':
                var color = mark.attrs.color;
                return React.createElement("span", { key: node.id, style: { color: color } }, element);
            case 'bold':
                return React.createElement("strong", { key: node.id }, element);
            case 'italic':
                return React.createElement("em", { key: node.id }, element);
            case 'code':
                return React.createElement("code", { key: node.id, className: "graf code" }, element);
            case 'link':
                var _a = mark.attrs, href = _a.href, target = _a.target;
                return React.createElement("a", { className: "graf markup--anchor markup--anchor-readOnly", target: target, rel: "noopener noreferrer nofollow", href: href }, element);
            default:
                console.warn("no handler for mark", mark);
                return element;
        }
    };
    var traverseNodes = function (nodes) {
        if (!nodes)
            return null;
        return nodes.map(function (node) {
            //console.log(node)
            return convertNodeToElement(node);
        });
    };
    var renderedContent = traverseNodes(raw.content);
    return (React.createElement(ThemeProvider, { theme: theme$1 || theme },
        React.createElement(EditorContainer, null,
            React.createElement(ErrorBoundary, null,
                React.createElement("div", null, renderedContent)))));
}
var ErrorBoundary = /** @class */ (function (_super) {
    __extends(ErrorBoundary, _super);
    function ErrorBoundary(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { hasError: false, error: null, errorInfo: null };
        return _this;
    }
    ErrorBoundary.prototype.componentDidCatch = function (error, errorInfo) {
        this.setState({ hasError: true, error: error, errorInfo: errorInfo });
    };
    ErrorBoundary.prototype.render = function () {
        var _a;
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (React.createElement("div", null,
                React.createElement("h1", null, "Something went wrong."),
                React.createElement("details", { style: { whiteSpace: 'pre-wrap' } },
                    this.state.error && this.state.error.toString(),
                    React.createElement("br", null), (_a = this.state.errorInfo) === null || _a === void 0 ? void 0 :
                    _a.componentStack)));
        }
        // @ts-ignore
        return this.props.children;
    };
    return ErrorBoundary;
}(React.Component));

var defaultPlugins = [
    ImageBlockConfig(),
    CodeBlockConfig(),
    DividerBlockConfig(),
    EmbedBlockConfig(),
    PlaceholderBlockConfig(),
    VideoBlockConfig(),
    GiphyBlockConfig(),
    VideoRecorderBlockConfig(),
    SpeechToTextBlockConfig(),
    AudioRecorderBlockConfig(),
    FileBlockConfig()
];

export { AudioRecorderBlockConfig, CodeBlockConfig, DanteEditor as Dante, DividerBlockConfig, EmbedBlockConfig, FileBlockConfig, GiphyBlockConfig, ImageBlockConfig, PlaceholderBlockConfig, Renderer, SpeechToTextBlockConfig, VideoBlockConfig, VideoRecorderBlockConfig, Editor as default, defaultPlugins, theme as defaultTheme };
