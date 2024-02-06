import { c as __makeTemplateObject, _ as _assign } from '../tslib.es6-e024cfb8.js';
import React from 'react';
import axios from 'axios';
import { l as video } from '../icons-2651a870.js';
import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import styled from '@emotion/styled';

function isEmpty(obj) {
  return obj &&
  // 👈 null and undefined check
  Object.keys(obj).length === 0 && obj.constructor === Object;
}

var StyleWrapper = styled(NodeViewWrapper)(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""])));
function VideoBlock(props) {
    React.useEffect(function () {
        if (!isEmpty(props.node.attrs.embed_data)) {
            return;
        }
        // ensure data isnt already loaded
        if (!dataForUpdate().provisory_text) {
            return;
        }
        axios({
            method: "get",
            url: "".concat(props.extension.options.endpoint).concat(dataForUpdate().provisory_text, "&scheme=https"),
        })
            .then(function (result) {
            updateData(result.data);
        })
            .catch(function (error) {
            return console.log("TODO: error");
        });
    }, []);
    function updateData(data) {
        props.updateAttributes({
            embed_data: data,
        });
    }
    function dataForUpdate() {
        return props.node.attrs;
    }
    function renderEmbedHtml() {
        var embed_data = parseEmbedData();
        if (dataForUpdate().mediaRenderHandler) {
            return dataForUpdate().mediaRenderHandler();
        }
        else {
            return embed_data.media
                ? embed_data.media.html
                : embed_data.html;
        }
    }
    function parseEmbedData() {
        if (typeof (props.node.attrs.embed_data) === "string") {
            try {
                return JSON.parse(props.node.attrs.embed_data);
            }
            catch (error) {
                return {};
            }
        }
        else {
            return props.node.attrs.embed_data;
        }
    }
    return (React.createElement(StyleWrapper, { as: "figure", "data-drag-handle": "true", className: "graf--figure graf--iframe graf--first ".concat(props.selected ? "is-selected is-mediaFocused" : ""), tabIndex: "0" },
        React.createElement("div", { className: "iframeContainer", dangerouslySetInnerHTML: { __html: renderEmbedHtml() } }),
        React.createElement(NodeViewContent, { as: "figcaption", className: "imageCaption" }, props.node.content.size === 0 && (React.createElement("span", { className: "danteDefaultPlaceholder" }, props.extension.options.caption)))));
}
var VideoBlockConfig = function (options) {
    if (options === void 0) { options = {}; }
    var config = {
        icon: video,
        name: "VideoBlock",
        tag: "video-block",
        component: VideoBlock,
        atom: false,
        widget_options: {
            displayOnInlineTooltip: true,
            insertion: "placeholder",
            insert_block: "video",
        },
        options: {
            endpoint: "//noembed.com/embed?url=",
            placeholder: "Paste a YouTube, Vine, Vimeo, or other video link, and press Enter",
            caption: "Type caption for embed (optional)",
        },
        attributes: {
            embed_data: {
                default: {},
            },
            provisory_text: { default: null },
        },
        dataSerializer: function (data) {
            return _assign(_assign({}, data), { embed_data: JSON.stringify(data.embed_data) });
        },
    };
    return Object.assign(config, options);
};
function VideoBlockRenderer(_a) {
    _a.blockKey; var data = _a.data;
    var embed_data = data.embed_data, caption = data.caption;
    function renderEmbedHtml() {
        return embed_data.media
            ? embed_data.media.html
            : embed_data.html;
    }
    return (React.createElement("figure", { className: 'graf--figure graf--iframe graf--first' },
        React.createElement("div", { className: "iframeContainer", dangerouslySetInnerHTML: { __html: renderEmbedHtml() } }),
        React.createElement("figcaption", { className: "imageCaption" }, caption &&
            React.createElement("span", { className: "danteDefaultPlaceholder" }, caption))));
}
var templateObject_1;
/*
export const VideoBlockConfig = (options={})=>{
  let config = {
      title: 'insert video',
      editable: true,
      type: 'video',
      icon: video,
      block: VideoBlock,
      renderable: true,
      breakOnContinuous: true,
      wrapper_class: "graf--figure graf--iframe",
      selected_class: " is-selected is-mediaFocused",
      widget_options: {
        displayOnInlineTooltip: true,
        insertion: "placeholder",
        insert_block: "video"
      },
      options: {
        endpoint: '//noembed.com/embed?url=',
        placeholder: 'Paste a YouTube, Vine, Vimeo, or other video link, and press Enter',
        caption: 'Type caption for embed (optional)'
      },

      handleEnterWithoutText(ctx, block) {
        const { editorState } = ctx.state
        return ctx.onChange(addNewBlockAt(editorState, block.getKey()))
      },

      handleEnterWithText(ctx, block) {
        const { editorState } = ctx.state
        return ctx.onChange(addNewBlockAt(editorState, block.getKey()))
      }
  }

  return Object.assign(config, options)
}
*/

export { StyleWrapper, VideoBlockConfig, VideoBlockRenderer, VideoBlock as default };
