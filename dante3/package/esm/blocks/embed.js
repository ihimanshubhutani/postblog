import {
  c as __makeTemplateObject,
  _ as _assign,
} from "../tslib.es6-e024cfb8.js";
import React from "react";
import { NodeViewWrapper } from "@tiptap/react";
import styled from "@emotion/styled";
import axios from "axios";
import { h as embed } from "../icons-2651a870.js";

var StyleWrapper = styled(NodeViewWrapper)(
  templateObject_1 ||
    (templateObject_1 = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])),
  function (props) {
    return "border: 3px solid ".concat(
      props.selected ? "purple" : "black",
      ";"
    );
  }
);
function picture(embed_data) {
  if (embed_data.images && embed_data.images.length > 0) {
    return embed_data.images[0].url;
  } else if (embed_data.thumbnail_url) {
    return embed_data.thumbnail_url;
  } else if (embed_data.image) {
    return embed_data.image;
  } else {
    return null;
  }
}
function classForImage(embed_data) {
  if (picture(embed_data)) {
    return "";
  } else {
    return "mixtapeImage--empty u-ignoreBlock";
  }
}
function EmbedBlock(props) {
  var _a = React.useState(null),
    error = _a[0],
    setError = _a[1];
  React.useEffect(function () {
    initializeCard();
  }, []);
  function deleteSelf() {
    props.deleteNode();
  }
  function updateData(data) {
    props.updateAttributes({
      embed_data: data,
    });
  }
  function dataForUpdate() {
    return props.node.attrs;
  }
  function initializeCard() {
    if (!dataForUpdate()) {
      return;
    }
    // ensure data isnt already loaded
    // unless @dataForUpdate().endpoint or @dataForUpdate().provisory_text
    if (!dataForUpdate().provisory_text) {
      return;
    }
    return axios({
      method: "get",
      url: ""
        .concat(props.extension.options.endpoint)
        .concat(dataForUpdate().provisory_text, "&scheme=https"),
    })
      .then(function (result) {
        // debugger; // Add this line
        return updateData(result.data); //JSON.parse(data.responseText)
      })
      .catch(function (error) {
        setError(error.response?.data?.error_message);
        return console.log("TODO: error");
      });
  }
  function handleClick(e) {
    //if(!this.props.blockProps.getEditor().props.read_only){
    //  e.preventDefault()
    //}
  }
  function parseEmbedData() {
    if (typeof props.node.attrs.embed_data === "string") {
      try {
        return JSON.parse(props.node.attrs.embed_data);
      } catch (error) {
        return {};
      }
    } else {
      return props.node.attrs.embed_data;
    }
  }
  var embed_data = parseEmbedData();
  return React.createElement(
    StyleWrapper,
    {
      "data-drag-handle": "true",
      selected: props.selected,
      className: "graf graf--mixtapeEmbed ".concat(
        props.selected ? "is-selected is-mediaFocused" : ""
      ),
    },
    React.createElement(
      "span",
      { contentEditable: false },
      picture(embed_data)
        ? React.createElement(
            "a",
            {
              target: "_blank",
              className: "js-mixtapeImage mixtapeImage ".concat(
                classForImage(embed_data)
              ),
              href: embed_data.url,
              style: {
                backgroundImage: "url('".concat(picture(embed_data), "')"),
              },
              rel: "noreferrer",
            },
            " "
          )
        : undefined,
      error ? React.createElement("h2", null, error) : undefined,
      //!this.props.blockProps.getEditor().props.read_only
      props.editor.isEditable
        ? React.createElement(
            "button",
            {
              type: "button",
              className: "graf--media-embed-close",
              onClick: deleteSelf,
            },
            "x"
          )
        : null,
      React.createElement(
        "a",
        {
          className: "markup--anchor markup--mixtapeEmbed-anchor",
          target: "_blank",
          href: embed_data.url,
          onClick: handleClick,
          contentEditable: false,
          rel: "noreferrer",
        },
        React.createElement(
          "strong",
          { className: "markup--strong markup--mixtapeEmbed-strong" },
          embed_data.title
        ),
        React.createElement(
          "em",
          { className: "markup--em markup--mixtapeEmbed-em" },
          embed_data.description
        )
      ),
      React.createElement(
        "span",
        { contentEditable: false },
        embed_data.provider_url || embed_data.url
      )
    )
  );
}
var EmbedBlockConfig = function (options) {
  if (options === void 0) {
    options = {};
  }
  var config = {
    icon: embed,
    name: "EmbedBlock",
    tag: "embed-block",
    component: EmbedBlock,
    widget_options: {
      displayOnInlineTooltip: true,
      insertion: "placeholder",
      insert_block: "embed",
    },
    options: {
      endpoint: "//noembed.com/embed?url=",
      placeholder:
        "Paste a link to embed content from another site (e.g. Twitter) and press Enter",
    },
    attributes: {
      embed_data: {
        default: {},
      },
      provisory_text: { default: null },
    },
    dataSerializer: function (data) {
      return _assign(_assign({}, data), {
        embed_data: JSON.stringify(data.embed_data),
      });
    },
  };
  return Object.assign(config, options);
};
function EmbedBlockRenderer(_a) {
  _a.blockKey;

  console.log("a is logged", _a);
  var data = _a.data;
  var embed_data = data.embed_data;
  return React.createElement(
    "div",
    { className: "graf graf--mixtapeEmbed" },
    React.createElement(
      "span",
      { contentEditable: false },
      picture(embed_data)
        ? React.createElement(
            "a",
            {
              target: "_blank",
              className: "js-mixtapeImage mixtapeImage ".concat(
                classForImage(embed_data)
              ),
              href: embed_data.url,
              style: {
                backgroundImage: "url('".concat(picture(embed_data), "')"),
              },
              rel: "noreferrer",
            },
            " "
          )
        : undefined,
      React.createElement(
        "a",
        {
          className: "markup--anchor markup--mixtapeEmbed-anchor",
          target: "_blank",
          href: embed_data.url,
          rel: "noreferrer",
        },
        React.createElement(
          "strong",
          { className: "markup--strong markup--mixtapeEmbed-strong" },
          embed_data.title
        ),
        React.createElement(
          "em",
          { className: "markup--em markup--mixtapeEmbed-em" },
          embed_data.description
        )
      ),
      React.createElement(
        "span",
        null,
        embed_data.provider_url || embed_data.url
      )
    )
  );
}
var templateObject_1;

export {
  EmbedBlockConfig,
  EmbedBlockRenderer,
  StyleWrapper,
  EmbedBlock as default,
};
