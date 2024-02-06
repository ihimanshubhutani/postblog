import {
  c as __makeTemplateObject,
  _ as _assign,
} from "../tslib.es6-e024cfb8.js";
import React from "react";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import axios from "axios";
import styled from "@emotion/styled";
import { j as file } from "../icons-2651a870.js";
import { g as getUrl } from "../blockUtils-55899836.js";

var StyleWrapper = styled(NodeViewWrapper)(
  templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""]))
);
function FileBlock(props) {
  // console.log("IMAGE:", props);
  var imageUrl = props.node.attrs.url || props.node.attrs.src;
  React.useEffect(function () {
    replaceFile();
  }, []);
  function setImage(url) {
    props.updateAttributes({
      url: url,
    });
  }
  function replaceFile() {
    // exit only when not blob and not forceUload
    if (
      !props.node.attrs.url.includes("blob:") &&
      !props.node.attrs.forceUpload
    ) {
      return;
    }
    return handleUpload();
  }
  function startLoader() {
    props.updateAttributes({
      loading: true,
    });
  }
  function stopLoader() {
    props.updateAttributes({
      loading: false,
    });
  }
  function handleUpload() {
    startLoader();
    uploadFile();
  }
  function formatData() {
    var formData = new FormData();
    if (props.node.attrs.file) {
      var formName = props.extension.options.upload_formName || "file";
      formData.append(formName, props.node.attrs.file);
      return formData;
    } else {
      // TODO: check this
      formData.append("url", props.node.attrs.src);
      return formData;
    }
  }
  function uploadFile() {
    // custom upload handler
    if (props.extension.options.upload_handler) {
      return props.extension.options.upload_handler(
        formatData().get("file"),
        props
      );
    }
    if (!props.extension.options.upload_url) {
      stopLoader();
      return;
    }
    //this.props.blockProps.addLock()
    function getUploadUrl() {
      var url = props.extension.options.upload_url;
      if (typeof url === "function") {
        return url();
      } else {
        return url;
      }
    }
    function getUploadHeaders() {
      return props.extension.options.upload_headers || {};
    }
    axios({
      method: "post",
      url: getUploadUrl(),
      headers: getUploadHeaders(),
      data: formatData(),
      onUploadProgress: function (e) {
        console.log("PROCVESSS ", e);
        return updateProgressBar(e);
      },
    })
      .then(function (result) {
        uploadCompleted(result.data.url);
        if (props.extension.options.upload_callback) {
          return props.extension.options.upload_callback(result, props);
        }
      })
      .catch(function (error) {
        //this.uploadFailed()
        console.log("ERROR: got error uploading file ".concat(error));
        if (props.extension.options.upload_error_callback) {
          return props.extension.options.upload_error_callback(error, props);
        }
      });
    return function (json_response) {
      // return uploadCompleted("https://i.imgur.com/XUWx1hA.jpeg");
      return uploadCompleted(json_response.url);
    };
  }
  function uploadCompleted(url) {
    setImage(url);
    //this.props.blockProps.removeLock()
    stopLoader();
  }
  function updateProgressBar(e) {
    var complete = props.node.attrs.loading_progress;
    if (e.lengthComputable) {
      complete = (e.loaded / e.total) * 100;
      complete = complete != null ? complete : { complete: 0 };
      props.updateAttributes({ loading_progress: complete });
      console.log("complete: ".concat(complete));
    }
  }
  return React.createElement(
    StyleWrapper,
    { selected: props.selected, as: "figure", "data-drag-handle": "true" },
    React.createElement(
      "a",
      {
        href: imageUrl,
        target: "blank",
        className:
          "flex items-center border rounded text-sm text-gray-100 bg-gray-500 border-gray-600 p-2 py-2",
      },
      React.createElement(file, null),
      getFileNameFromUrl(imageUrl)
    ),
    React.createElement(
      NodeViewContent,
      { as: "figcaption", className: "imageCaption" },
      props.node.content.size === 0 &&
        React.createElement(
          "span",
          { className: "danteDefaultPlaceholder" },
          "type a caption (optional)"
        )
    )
  );
}
function getFileNameFromUrl(url) {
  if (!url.includes("://")) return url.split("/").at(-1);
  var urlObject = new URL(url);
  var pathname = urlObject.pathname;
  var blobRegex = /^\/([a-zA-Z0-9-_.]+\/){2}([a-zA-Z0-9-_.]+)$/;
  try {
    if (blobRegex.test(pathname)) {
      // Blob URL
      var blobFileName = urlObject.searchParams.get("filename") || "blob-file";
      return blobFileName;
    } else {
      // Regular URL
      var segments = pathname.split("/");
      var fileName = segments[segments.length - 1];
      return fileName;
    }
  } catch (error) {}
}
var FileBlockConfig = function (options) {
  if (options === void 0) {
    options = {};
  }
  var config = {
    name: "FileBlock",
    icon: file,
    tag: "file-block",
    component: FileBlock,
    atom: false,
    draggable: true,
    attributes: {
      url: { default: null },
      src: { default: null },
      width: { default: "" },
      height: { default: "" },
      loading: { default: false },
      loading_progress: { default: 0 },
      caption: { default: null },
      direction: { default: "center" },
      file: { default: null },
      forceUpload: { default: false },
      aspect_ratio: {
        default: {
          width: 200,
          height: 200,
          ratio: 100,
        },
      },
    },
    dataSerializer: function (data) {
      return _assign(_assign({}, data), {
        src: data.url,
        aspect_ratio: JSON.stringify(data.aspect_ratio),
        file: null,
      });
    },
    options: {
      upload_handler: function (file, ctx) {
        console.log("UPLOADED FILE", file);
      },
    },
    parseHTML: [
      {
        tag: "file-block[url]",
      },
    ],
    // renderHTML: function(attributes){},
    widget_options: {
      displayOnInlineTooltip: true,
      insertion: "upload",
      insert_block: "FileBlock",
      file_types: "*",
    },
    keyboardShortcuts: function (editor) {
      return {
        Enter: function (_a) {
          var editor = _a.editor;
          if (editor.isActive("FileBlock")) {
            //editor.commands.selectNodeForward()
            editor.commands.insertContent({
              type: "paragraph",
            });
            editor
              .chain()
              .focus()
              //.insertContent("<strong>It's happening</strong>")
              .toggleNode("paragraph", "paragraph", {})
              .run();
            return true;
          }
        },
      };
    },
  };
  return Object.assign(config, options);
};
function FileBlockRenderer(_a) {
  var blockKey = _a.blockKey,
    data = _a.data,
    domain = _a.domain;
  var url = data.url,
    caption = data.caption;
  return React.createElement(
    "figure",
    { key: blockKey, className: "graf graf--figure" },
    React.createElement(
      "a",
      {
        href: url,
        target: "blank",
        className:
          "flex items-center border rounded text-sm text-gray-100 bg-gray-500 border-gray-600 p-2 py-2",
      },
      React.createElement(file, null),
      getFileNameFromUrl(getUrl(url, domain))
    ),
    caption &&
      caption !== "type a caption (optional)" &&
      React.createElement(
        "figcaption",
        { className: "imageCaption" },
        React.createElement(
          "span",
          null,
          React.createElement("span", { "data-text": "true" }, caption)
        )
      )
  );
}
var templateObject_1;

export {
  FileBlockConfig,
  FileBlockRenderer,
  StyleWrapper,
  FileBlock as default,
};
