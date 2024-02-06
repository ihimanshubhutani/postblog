import { a as __spreadArray } from './tslib.es6-bd4d49eb.js';
import React, { Component } from 'react';
import { mergeAttributes, ReactNodeViewRenderer, NodeViewWrapper, NodeViewContent, useEditor, EditorContent } from '@tiptap/react';
import { lowlight } from 'lowlight/lib/core';
import { Placeholder } from './plugins/tipTapPlaceholder.js';
import { Color } from './plugins/colorStyle.js';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Focus from '@tiptap/extension-focus';
import { _ as _defineProperty, a as _inherits, b as _createSuper, c as _createClass, d as _classCallCheck, e as _assertThisInitialized, f as _slicedToArray } from './color-79a05c0a.js';
import { Node, nodeInputRule } from '@tiptap/core';
import { AddButtonConfig } from './popovers/addButton.js';
import { MenuBarConfig } from './popovers/menuBar.js';
import './styled/base.js';
import './styled/menu.js';
import { ImageBlockConfig } from './blocks/image.js';
import { EmbedBlockConfig } from './blocks/embed.js';
import { VideoBlockConfig } from './blocks/video.js';
import { PlaceholderBlockConfig } from './blocks/placeholder.js';
import PropTypes from 'prop-types';
import { v as videoRecorderIcon } from './icons-e0e9ef90.js';
import axios from 'axios';
import { useCountdownTimer } from 'use-countdown-timer';
import { VideoContainer, StatusBar, VideoBody, EditorControls, RecButton, SecondsLeft, Button, VideoPlayer } from './blocks/videoRecorder/styled.js';
import { DividerBlockConfig } from './blocks/divider.js';
import { CodeBlockConfig } from './blocks/code.js';
import { GiphyBlockConfig } from './blocks/giphy/giphyBlock.js';
import { SpeechToTextBlockConfig } from './blocks/speechToText.js';

function extensionFactory(options) {
  return Node.create({
    name: options.name,
    group: options.group || "block",
    content: "inline*",
    selectable: true,
    draggable: true,
    atom: options.atom || false,
    addOptions: options.options || {},
    // priority: options.priority || 1, // somehow this option breaks the addKeyboardShortcut
    onBeforeCreate: function onBeforeCreate(_ref) {
      var editor = _ref.editor;
      // Before the view is created.
      options.onBeforeCreate && options.onBeforeCreate(editor);
    },
    onCreate: function onCreate(_ref2) {
      var editor = _ref2.editor;
      // The editor is ready.
      options.onCreate && options.onCreate(editor);
    },
    onUpdate: function onUpdate(_ref3) {
      var editor = _ref3.editor;
      // The content has changed.
      options.onUpdate && options.onUpdate(editor);
    },
    onSelectionUpdate: function onSelectionUpdate(_ref4) {
      var editor = _ref4.editor;
      // The selection has changed.
      options.onSelectionUpdate && options.onSelectionUpdate(editor);
    },
    onTransaction: function onTransaction(_ref5) {
      var editor = _ref5.editor;
        _ref5.transaction;
      // The editor state has changed.
      options.onTransaction && options.onTransaction(editor);
    },
    onFocus: function onFocus(_ref6) {
      var editor = _ref6.editor;
        _ref6.event;
      // The editor is focused.
      options.onFocus && options.onFocus(editor);
    },
    onBlur: function onBlur(_ref7) {
      var editor = _ref7.editor;
        _ref7.event;
      // The editor isn’t focused anymore.
      options.onBlur && options.onBlur(editor);
    },
    onDestroy: function onDestroy() {
      // The editor is being destroyed.
      options.onDestroy && options.onDestroy();
    },
    addKeyboardShortcuts: function addKeyboardShortcuts() {
      if (!options.keyboardShortcuts) return {};
      return options.keyboardShortcuts && options.keyboardShortcuts(this.editor);
    },
    addCommands: function addCommands() {
      return _defineProperty({}, "insert".concat(options.name), function insert(attributes) {
        return function (_ref8) {
          var chain = _ref8.chain;
          return chain().insertContent({
            type: options.name,
            attrs: {
              url: ""
            }
          }).run();
          //.insertNode(options.name, attributes)
          //.insertText(" ")
          //.run();
        };
      });
    },
    addAttributes: function addAttributes() {
      return options.attributes || {};
    },
    parseHTML: function parseHTML() {
      return options.parseHTML || [{
        tag: options.tag
      }];
    },
    renderHTML: function renderHTML(_ref10) {
      var HTMLAttributes = _ref10.HTMLAttributes;
      console.log(HTMLAttributes);
      var attributes = options.dataSerializer ? options.dataSerializer(HTMLAttributes) : HTMLAttributes;
      return [options.tag, mergeAttributes(attributes)];
    },
    addNodeView: function addNodeView() {
      return ReactNodeViewRenderer(options.component);
    },
    addInputRules: function addInputRules() {
      var _this = this;
      if (!options.addInputRules) return [];
      return options.addInputRules().map(function (rule) {
        return nodeInputRule({
          find: rule,
          type: _this.type
        });
      });
    }
  });
}

var ReactMediaRecorder = /*#__PURE__*/function (_Component) {
  _inherits(ReactMediaRecorder, _Component);
  var _super = _createSuper(ReactMediaRecorder);
  function ReactMediaRecorder(props) {
    var _this;
    _classCallCheck(this, ReactMediaRecorder);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "stopStream", function () {
      _this.mediaRecorder = null;
      _this.mediaChunk = [];
      if (_this.stream) {
        _this.stream.stop();
        _this.stream = null;
      }
    });
    _this.state = {
      asked: false,
      permission: false,
      available: false,
      recording: false,
      paused: false
    };
    _this.stream = null;
    _this.mediaRecorder = null;
    _this.mediaChunk = [];
    _this.start = _this.start.bind(_assertThisInitialized(_this));
    _this.stop = _this.stop.bind(_assertThisInitialized(_this));
    _this.pause = _this.pause.bind(_assertThisInitialized(_this));
    _this.resume = _this.resume.bind(_assertThisInitialized(_this));
    _this.initMediaRecorder = _this.initMediaRecorder.bind(_assertThisInitialized(_this));
    return _this;
  }
  _createClass(ReactMediaRecorder, [{
    key: "init",
    value: function init() {
      if (typeof window === "undefined") return;
      if (window.location.protocol !== "https:" && window.location.hostname !== "localhost") {
        console.warn("getUserMedia() must be run from a secure origin: https or localhost.\nChanging protocol to https.");
      }
      if (!navigator.mediaDevices && !navigator.getUserMedia) {
        console.warn("Your browser doesn't support navigator.mediaDevices.getUserMedia and navigator.getUserMedia.");
      }
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

      // stop hack
      // from http://stackoverflow.com/questions/11642926/stop-close-webcam-which-is-opened-by-navigator-getusermedia
      var MediaStream = window.MediaStream || window.webkitMediaStream;
      if (typeof MediaStream !== "undefined" && !("stop" in MediaStream.prototype)) {
        MediaStream.prototype.stop = function () {
          this.getAudioTracks().forEach(function (track) {
            track.stop();
          });
          this.getVideoTracks().forEach(function (track) {
            track.stop();
          });
        };
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      this.init();
      this.props.width;
      this.props.height;
      var constraints = this.props.constraints;
      var handleSuccess = function handleSuccess(stream, cb) {
        _this2.stream = stream;
        _this2.mediaChunk = [];
        _this2.setState({
          permission: true,
          asked: true,
          recording: false
        });
        _this2.props.onGranted();
        _this2.initMediaRecorder();
        cb();
      };
      var handleFailed = function handleFailed(err) {
        _this2.setState({
          asked: false
        });
        _this2.props.onDenied(err);
      };
      this.askPermission = function (cb) {
        if (navigator.mediaDevices) {
          navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
            return handleSuccess(stream, cb);
          })["catch"](handleFailed);
        } else if (navigator.getUserMedia) {
          navigator.getUserMedia(constraints, handleSuccess, handleFailed);
        } else {
          var errMessage = "Browser doesn't support UserMedia API. Please try with another browser.";
          console.warn(errMessage);
          _this2.props.onError(new Error(errMessage));
        }
      };
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.stopStream();
    }
  }, {
    key: "initMediaRecorder",
    value: function initMediaRecorder() {
      var _this3 = this;
      try {
        var options = {};
        var types = ["video/webm;codecs=vp8", "video/webm", ""];
        if (this.props.mimeType) types.unshift(this.props.mimeType);
        for (var i = 0; i < types.length; i++) {
          var type = types[i];
          if (MediaRecorder.isTypeSupported(type)) {
            options.mimeType = type;
            break;
          }
          console.warn("".concat(type, " is not supported on your browser."));
        }
        var mediaRecorder = new MediaRecorder(this.stream, options);
        mediaRecorder.ondataavailable = function (ev) {
          if (ev.data && ev.data.size > 0) {
            _this3.mediaChunk.push(ev.data);
          }
        };
        this.mediaRecorder = mediaRecorder;
        this.setState({
          available: true
        });
      } catch (err) {
        //console.log(err);
        console.error("Failed to initialize MediaRecorder.", err);
        this.setState({
          available: false
        });
      }
    }
  }, {
    key: "start",
    value: function start() {
      var _this4 = this;
      this.askPermission(function () {
        if (!_this4.state.available) return;
        _this4.mediaChunk = [];
        _this4.mediaRecorder.start(_this4.props.timeSlice);
        _this4.setState({
          recording: true
        });
        _this4.props.onStart(_this4.stream);
      });
    }
  }, {
    key: "pause",
    value: function pause() {
      if (!this.state.recording) return;
      if (this.mediaRecorder.state === "inactive") return;
      this.mediaRecorder.stop();
      this.setState({
        paused: true
      });
      this.props.onPause();
    }
  }, {
    key: "resume",
    value: function resume() {
      if (!this.state.recording) return;
      this.initMediaRecorder();
      this.mediaRecorder.start(this.props.timeSlice);
      this.setState({
        paused: false
      });
      this.props.onResume(this.stream);
    }
  }, {
    key: "stop",
    value: function stop() {
      if (!this.state.available) return;
      if (this.mediaRecorder.state === "inactive") return;
      this.mediaRecorder.stop();
      this.setState({
        recording: false
      });
      var blob = new Blob(this.mediaChunk, {
        type: "video/webm"
      });
      this.props.onStop(blob);
      this.stopStream();
    }
  }, {
    key: "render",
    value: function render() {
      this.state.asked;
      this.state.permission;
      this.state.recording;
      this.state.available;
      return /*#__PURE__*/React.createElement("div", {
        className: this.props.className
      }, this.props.render({
        start: this.start,
        stop: this.stop,
        pause: this.pause,
        resume: this.resume
      }));
    }
  }]);
  return ReactMediaRecorder;
}(Component);
ReactMediaRecorder.propTypes = {
  constraints: PropTypes.object,
  className: PropTypes.string,
  timeSlice: PropTypes.number,
  mimeType: PropTypes.string,
  render: PropTypes.func,
  onGranted: PropTypes.func,
  onDenied: PropTypes.func,
  onStart: PropTypes.func,
  onStop: PropTypes.func,
  onPause: PropTypes.func,
  onResume: PropTypes.func,
  onError: PropTypes.func
};
ReactMediaRecorder.defaultProps = {
  constraints: {
    audio: true,
    video: true
  },
  className: "",
  timeSlice: 0,
  mimeType: "",
  render: function render() {},
  onGranted: function onGranted() {},
  onDenied: function onDenied() {},
  onStart: function onStart() {},
  onStop: function onStop() {},
  onPause: function onPause() {},
  onResume: function onResume() {},
  onError: function onError() {}
};

function VideoRecorderBlock(props) {
  //let file = null;
  var app = React.useRef();
  var mediaRecorder = React.useRef();
  var video = React.useRef();
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2);
    _React$useState2[0];
    var setGranted = _React$useState2[1];
  var _React$useState3 = React.useState(""),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    rejectedReason = _React$useState4[0],
    setRejectedReason = _React$useState4[1];
  var _React$useState5 = React.useState(false),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    fileReady = _React$useState6[0],
    setFileReady = _React$useState6[1];
  var _React$useState7 = React.useState(false),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    loading = _React$useState8[0],
    setLoading = _React$useState8[1];
  var _React$useState9 = React.useState(null),
    _React$useState10 = _slicedToArray(_React$useState9, 2),
    loadingProgress = _React$useState10[0],
    setLoadingProgress = _React$useState10[1];
  var _React$useState11 = React.useState(null),
    _React$useState12 = _slicedToArray(_React$useState11, 2),
    file = _React$useState12[0],
    setFile = _React$useState12[1];
  var _useCountdownTimer = useCountdownTimer({
      timer: props.extension.options.seconds_to_record,
      onExpire: function onExpire() {
        mediaRecorder.current && mediaRecorder.current.stop();
      }
    }),
    countdown = _useCountdownTimer.countdown,
    start = _useCountdownTimer.start,
    reset = _useCountdownTimer.reset,
    pause = _useCountdownTimer.pause,
    isRunning = _useCountdownTimer.isRunning;
  React.useEffect(function () {
    //video = app.current.querySelector('video');
    if (props.node.attrs.url) {
      setUrlToVideo(props.node.attrs.url);
      playMode();
    }
  }, []);
  React.useEffect(function () {
    if (!props.node.attrs.url || props.node.attrs.url === "") return;
    video.current.src = props.node.attrs.url;
  }, [props.node.attrs.url]);
  function handleGranted() {
    setGranted(true);
    console.log("Permission Granted!");
  }
  function handleDenied(err) {
    setRejectedReason(err.name);
    console.log("Permission Denied!", err);
  }

  /*React.useEffect(()=>{
    if(recording && secondsLeft === props.extension.seconds_to_record){
    }
  }, [recording, secondsLeft])*/

  function handleStart(stream) {
    setFileReady(false);
    setStreamToVideo(stream);
    console.log("Recording Started.");

    // max seconds to record video
    if (!props.extension.options.seconds_to_record) return;
    start();
  }
  function handleStop(blob) {
    reset();
    setFileReady(true);
    releaseStreamFromVideo();
    console.log("Recording Stopped.");
    setFile(blob);
    setStreamToVideo(blob);
    playMode();
  }
  function confirm() {
    downloadVideo(file);
  }
  function handlePause() {
    releaseStreamFromVideo();
    pause();
  }
  function handleResume(stream) {
    setStreamToVideo(stream);
    pause();
  }
  function handleError(err) {
    console.log(err);
  }
  function recordMode() {
    video.current.loop = false;
    video.current.controls = false;
    video.current.muted = true;
  }
  function playMode() {
    video.current.loop = false;
    video.current.controls = true;
    video.current.muted = true;
  }
  function setStreamToVideo(stream) {
    //let video = app.current.querySelector('video');
    recordMode();
    // is a mediastream
    try {
      video.current.srcObject = stream;
    } catch (error) {
      video.current.src = URL.createObjectURL(stream);
    }
  }
  function setUrlToVideo(url) {
    playMode();
    video.current.src = url;
  }
  function releaseStreamFromVideo() {
    video.current.src = "";
    video.current.srcObject = null;
  }
  function downloadVideo(blob) {
    //video.current.loop = true
    setStreamToVideo(blob);
    playMode();
    uploadFile(blob);
  }
  function formatData() {
    var formData = new FormData();
    //if (props.node.attrs.file) {
    if (file) {
      var formName = props.extension.options.upload_formName || 'file';
      formData.append(formName, file); //props.node.attrs.file);
      return formData;
    } else {
      // TODO: check this
      formData.append("url", props.node.attrs.src);
      return formData;
    }
  }
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
  function stopLoader() {
    setLoading(false);
    setFileReady(false);
  }
  function uploadFile(blob) {
    var _this = this;
    // file = blob;
    setFile(blob);

    // custom upload handler
    if (props.extension.options.upload_handler) {
      return props.extension.options.upload_handler(formatData().get("file"), props, {
        uploadCompleted: uploadCompleted,
        updateProgressBar: updateProgressBar,
        uploadFailed: uploadFailed
      });
    }
    if (!props.extension.options.upload_url) {
      stopLoader();
      return;
    }
    setLoading(true);
    axios({
      method: "post",
      url: getUploadUrl(),
      headers: getUploadHeaders(),
      data: formatData(),
      onUploadProgress: function onUploadProgress(e) {
        return updateProgressBar(e);
      }
    }).then(function (result) {
      uploadCompleted(result.data.url);
      if (props.extension.options.upload_callback) {
        return props.extension.options.upload_callback(result, _this);
      }
    })["catch"](function (error) {
      uploadFailed();
      console.log("ERROR: got error uploading file ".concat(error));
      if (props.extension.options.upload_error_callback) {
        return props.extension.options.upload_error_callback(error, _this);
      }
    });
    return function (json_response) {
      return uploadCompleted(json_response.url);
    };
  }
  function uploadFailed() {
    //this.props.blockProps.removeLock()
    stopLoader();
  }
  function uploadCompleted(url) {
    props.updateAttributes({
      url: url
    });
    //this.setState({ url }, this.updateData)
    //this.props.blockProps.removeLock()
    stopLoader();
    setFile(null);
    setUrlToVideo(url);
  }
  function updateProgressBar(e) {
    var complete = loadingProgress;
    if (e.lengthComputable) {
      complete = e.loaded / e.total * 100;
      complete = complete != null ? complete : {
        complete: 0
      };
      setLoadingProgress(complete);
      return console.log("complete: ".concat(complete));
    }
  }
  function isReadOnly() {
    return !props.editor.isEditable;
  }
  return /*#__PURE__*/React.createElement(NodeViewWrapper, null, /*#__PURE__*/React.createElement(VideoContainer, {
    ref: app,
    "data-drag-handle": "true"
  }, /*#__PURE__*/React.createElement(ReactMediaRecorder, {
    ref: mediaRecorder,
    constraints: {
      audio: {
        sampleSize: 16,
        channelCount: 2,
        echoCancellation: true,
        noiseSuppression: false
      },
      video: true
    },
    timeSlice: 10,
    onGranted: handleGranted,
    onDenied: handleDenied,
    onStart: function onStart(stream) {
      return handleStart(stream);
    },
    onStop: handleStop,
    onPause: handlePause,
    onResume: handleResume,
    onError: handleError,
    render: function render(_ref) {
      var start = _ref.start,
        stop = _ref.stop;
        _ref.pause;
        _ref.resume;
      return /*#__PURE__*/React.createElement("div", null, !isReadOnly() && /*#__PURE__*/React.createElement(StatusBar, {
        contentEditable: false,
        loading: loading
      }, loading && /*#__PURE__*/React.createElement(Loader, {
        toggle: loading,
        progress: loadingProgress
      })), /*#__PURE__*/React.createElement(VideoBody, null, !isReadOnly() && /*#__PURE__*/React.createElement(EditorControls, {
        contentEditable: false
      }, /*#__PURE__*/React.createElement("div", {
        className: "controls-recording"
      }, !loading && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(RecButton, {
        onClick: function onClick(e) {
          e.preventDefault();
          isRunning ? stop() : start();
        },
        disabled: isRunning,
        className: isRunning ? "recording" : ""
      }, isRunning ? "recording. (".concat(countdown / 1000, " seconds left)") : "press button to start recording", rejectedReason && /*#__PURE__*/React.createElement("span", null, rejectedReason)), /*#__PURE__*/React.createElement(SecondsLeft, null))), fileReady && !loading && /*#__PURE__*/React.createElement(Button, {
        onClick: function onClick(e) {
          e.preventDefault();
          confirm();
        }
      }, "confirm recording upload ?")), /*#__PURE__*/React.createElement(VideoPlayer, {
        autoPlay: true,
        muted: true,
        ref: video
      }), /*#__PURE__*/React.createElement(NodeViewContent, {
        as: "figcaption",
        className: "imageCaption"
      }, props.node.content.size === 0 && /*#__PURE__*/React.createElement("span", {
        className: "danteDefaultPlaceholder"
      }, "type a caption (optional)"))));
    }
  })));
}
function Loader(_ref2) {
  var toggle = _ref2.toggle,
    progress = _ref2.progress;
  return /*#__PURE__*/React.createElement(React.Fragment, null, toggle && /*#__PURE__*/React.createElement("div", {
    className: "image-upoader-loader",
    style: {
      width: "100%",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("p", null, progress === 100 ? "processing video..." : /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", null, "uploading video "), Math.round(progress), "%"))));
}
var VideoRecorderBlockConfig = function VideoRecorderBlockConfig() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var config = {
    name: "VideoRecorderBlock",
    icon: videoRecorderIcon,
    tag: "recorded-video",
    component: VideoRecorderBlock,
    atom: false,
    attributes: {
      url: {
        "default": null
      },
      src: {
        "default": null
      },
      width: {
        "default": ""
      },
      height: {
        "default": ""
      },
      loading: {
        "default": false
      },
      loading_progress: {
        "default": 0
      },
      caption: {
        "default": "caption!"
      },
      direction: {
        "default": "center"
      },
      file: {
        "default": null
      }
    },
    wrapper_class: "graf graf--video",
    selected_class: "is-selected",
    selectedFn: function selectedFn(_block) {},
    /* handleEnterWithoutText(ctx, block) {
    const { editorState } = ctx.state
    return ctx.onChange(addNewBlockAt(editorState, block.getKey()))
    },
    handleEnterWithText(ctx, block) {
    const { editorState } = ctx.state
    return ctx.onChange(RichUtils.insertSoftNewline(editorState))
    //return ctx.onChange(addNewBlockAt(editorState, block.getKey()))
    }, */
    widget_options: {
      displayOnInlineTooltip: true,
      insertion: "insertion",
      insert_block: "image"
    },
    options: {
      upload_formName: "file",
      upload_handler: function upload_handler(file, ctx) {
        console.log("UPLOADED FILE", file, ctx);
      },
      /*upload_handler: (file, props, { uploadCompleted }) => {
        console.log("UPLOADED video");
        const url =
          "https://video.twimg.com/ext_tw_video/1388976569348235264/pu/vid/960x720/mCVk3dF_nGTgIZLX.mp4?tag=12";
        uploadCompleted(url);
      },*/
      seconds_to_record: 10000
    }
  };
  return Object.assign(config, options);
};

// import Dante from "./constants";
//export {DanteImagePopoverConfig}
//export {DanteAnchorPopoverConfig} //'./popovers/addButton'
//export {DanteInlineTooltipConfig}
//export {DanteTooltipConfig}
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
];
//export { CardBlock, CardBlockConfig}
//export {DemoEditor}
// export default Dante;

var DanteEditor = function (_a) {
    var bodyPlaceholder = _a.bodyPlaceholder, widgets = _a.widgets, extensions = _a.extensions; _a.fixed; var content = _a.content, onUpdate = _a.onUpdate, readOnly = _a.readOnly, autofocus = _a.autofocus, tooltips = _a.tooltips;
    var editor = useEditor({
        extensions: pluginsConfig(),
        content: content || null,
        editable: !readOnly,
        autofocus: autofocus,
        onUpdate: function (_a) {
            var editor = _a.editor;
            // The content has changed.
            // console.log("changed!", editor.getJSON());
            onUpdate && onUpdate(editor);
            //setLog(JSON.parse(JSON.stringify(editor.getJSON())))
        },
    });
    React.useEffect(function () {
        if (editor)
            editor.setEditable(!readOnly);
    }, [editor, readOnly]);
    function basePlugins() {
        return [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                    HTMLAttributes: {
                        class: "graf graf--h",
                    },
                },
                paragraph: {
                    HTMLAttributes: {
                        class: "graf graf--p",
                    },
                },
                listItem: {
                    HTMLAttributes: {
                        class: "graf graf--li",
                    },
                },
                orderedList: {
                    HTMLAttributes: {
                        class: "graf graf--ol",
                    },
                },
                codeBlock: {
                    HTMLAttributes: {
                        class: "graf code"
                    }
                },
                code: {
                    HTMLAttributes: {
                        class: "graf code"
                    }
                }
            }),
            //TextStyle,
            //Color,      
            Placeholder.configure({
                placeholder: bodyPlaceholder || "Write something …",
            }),
            TextStyle,
            Color,
            Focus,
            /*Link.extend({
              addNodeView() {
                return ReactNodeViewRenderer(CodeBlock);
              },
            }).configure({
              HTMLAttributes: {
                class: "markup--anchor",
              },
            }),*/
            CodeBlockLowlight.configure({
                lowlight: lowlight,
            }),
            //OrderedList,
            //ListItem,
            //TaskList,
            //TaskItem,
        ];
    }
    function optionalPlugins() {
        if (widgets)
            return widgets;
        return defaultPlugins;
    }
    function defaultTooltips() {
        if (!editor)
            return [];
        if (tooltips)
            return tooltips;
        return [
            AddButtonConfig({}),
            MenuBarConfig({})
        ];
    }
    function newPluginsConfig() {
        return optionalPlugins().map(function (o) { return extensionFactory(o); });
    }
    function pluginsConfig() {
        var newExtensions = extensions ? extensions : [];
        return basePlugins().concat(__spreadArray(__spreadArray([], newPluginsConfig(), true), newExtensions, true));
    }
    function renderTooltip(o, i) {
        return (React.createElement(o.component, { key: i, editor: editor, display: true , widgets: optionalPlugins(), 
            //editorState={this.state.editorState}
            //onChange={this.onChange}
            //styles={this.styles}
            configTooltip: o || {} }));
    }
    return (React.createElement(React.Fragment, null,
        defaultTooltips()
            .filter(function (o) { return o.placement === "up"; })
            .map(function (o, i) {
            return renderTooltip(o, i);
        }),
        React.createElement(EditorContent, { editor: editor }),
        defaultTooltips()
            .filter(function (o) { return o.placement !== "up"; })
            .map(function (o, i) {
            return renderTooltip(o, i);
        })));
};

export { DanteEditor as D, ReactMediaRecorder as R, VideoRecorderBlockConfig as V, VideoRecorderBlock as a };
