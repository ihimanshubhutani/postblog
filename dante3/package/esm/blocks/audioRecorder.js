import { c as __makeTemplateObject, d as __awaiter, e as __generator } from '../tslib.es6-e024cfb8.js';
import React, { useState } from 'react';
import { M as MicIcon, C as CheckIcon, D as DeleteIcon } from '../icons-2651a870.js';
import { NodeViewWrapper } from '@tiptap/react';
import styled from '@emotion/styled';
import { g as getUrl } from '../blockUtils-55899836.js';

var StyleWrapper = styled(NodeViewWrapper)(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""])));
function AudioRecorderBlock(props) {
    var _this = this;
    var _a, _b;
    //const { blockProps, block } = props;
    var _c = useState(props.node.attrs.stored), stored = _c[0], setStored = _c[1];
    var _d = useState(false), recording = _d[0], setRecording = _d[1];
    var _e = useState(props.node.attrs.url), audioUrl = _e[0], setAudioUrl = _e[1];
    var _f = useState(0); _f[0]; _f[1];
    var stream = React.useRef(null);
    var mediaRecorder = React.useRef(null);
    var audioElement = React.useRef(null);
    props.config;
    //const audioUrl = props.node.attrs.url
    //let file = blockProps.data.get('file');
    var file = props.node.attrs.file; //|| props.node.attrs.src;
    var _g = useState(0), count = _g[0], setCount = _g[1];
    var countTotal = 120;
    React.useEffect(function () {
        var interval = setInterval(function () {
            if (count !== 0)
                setCount(count - 1);
            if (count === 0)
                stopRecording();
        }, 1000);
        return function () { return interval && clearInterval(interval); };
    }, [count]);
    React.useEffect(function () {
        var _a;
        if ((_a = props.node.attrs) === null || _a === void 0 ? void 0 : _a.url)
            setAudioUrl(props.node.attrs.url);
    }, [(_b = (_a = props === null || props === void 0 ? void 0 : props.node) === null || _a === void 0 ? void 0 : _a.attrs) === null || _b === void 0 ? void 0 : _b.url]);
    var startRecording = function () {
        setStored(false);
        setAudioUrl(false);
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then(function (userStream) {
            stream.current = userStream;
            mediaRecorder.current = new MediaRecorder(userStream);
            var chunks = [];
            mediaRecorder.current.start();
            mediaRecorder.current.addEventListener('dataavailable', function (event) {
                chunks.push(event.data);
            });
            mediaRecorder.current.addEventListener('stop', function () {
                var audioBlob = new Blob(chunks, { type: 'audio/mp4' });
                var audioUrl = URL.createObjectURL(audioBlob);
                setAudioUrl(audioUrl);
            });
            setRecording(true);
            setCount(countTotal);
        })
            .catch(function (error) {
            console.error(error);
        });
    };
    var stopRecording = function () {
        var _a, _b;
        if (!(mediaRecorder === null || mediaRecorder === void 0 ? void 0 : mediaRecorder.current))
            return;
        if ((mediaRecorder === null || mediaRecorder === void 0 ? void 0 : mediaRecorder.current.state) === 'inactive')
            return;
        mediaRecorder.current.stop();
        // @ts-ignore
        (_b = (_a = stream === null || stream === void 0 ? void 0 : stream.current) === null || _a === void 0 ? void 0 : _a.getTracks()) === null || _b === void 0 ? void 0 : _b.forEach(function (track) { return track.stop(); }); // stop each of them
        stream.current = null;
        setRecording(false);
        setCount(0);
    };
    function uploadRecording(e) {
        uploadFile(audioUrl);
    }
    function cancelRecording() {
        setAudioUrl(null);
        setRecording(false);
        setCount(0);
    }
    var uploadFile = function (blob) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(blob).then(function (r) { return r.blob(); })];
                case 1:
                    file = _a.sent();
                    if (!file.name)
                        file.name = "audio";
                    setStored(true);
                    // custom upload handler
                    if (props.extension.options.upload_handler) {
                        return [2 /*return*/, props.extension.options.upload_handler(file, props)];
                    }
                    if (!props.extension.options.upload_url) {
                        return [2 /*return*/];
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement(StyleWrapper, { selected: props.selected, as: "figure", "data-drag-handle": "true" },
        React.createElement("div", { className: "flex space-x-2 justify-center items-center", contentEditable: false },
            !audioUrl && (React.createElement("span", { className: "flex justify-center items-center space-x-2" },
                React.createElement("button", { onClick: !recording ? startRecording : stopRecording, 
                    //disabled={recording}
                    className: "flex justify-center items-center p-2 rounded-md text-sm ".concat(recording
                        ? 'bg-red-300 text-red-500'
                        : 'bg-gray-300 text-gray-800', " ") },
                    React.createElement(MicIcon, null),
                    !recording && React.createElement("span", null, " Start Recording "),
                    recording && React.createElement("span", null, " Stop Recording ")),
                count != 0 && (React.createElement("span", { className: "text-xs" },
                    "Recording will finish in ",
                    React.createElement("strong", { className: "font-bold" },
                        count,
                        " seconds"))))),
            audioUrl && stored && (React.createElement("span", { className: "p-2 text-sm flex justify-center items-center space-x-2 text-green-500" },
                React.createElement(CheckIcon, null),
                React.createElement("span", null, "Audio Ready"))),
            audioUrl && !stored && (React.createElement("button", { className: "flex justify-center items-center p-2 rounded-md text-sm bg-green-300 text-green-800", onClick: uploadRecording },
                React.createElement(CheckIcon, null),
                React.createElement("span", null, "Confirm"))),
            audioUrl && !stored && (React.createElement("button", { className: "flex justify-center items-center p-2 rounded-sm text-sm text-red-600", onClick: cancelRecording },
                React.createElement(DeleteIcon, null),
                React.createElement("span", null, "Cancel"))),
            audioUrl && React.createElement("audio", { src: audioUrl, controls: true, ref: audioElement }))));
}
var AudioRecorderBlockConfig = function (options) {
    if (options === void 0) { options = {}; }
    var config = {
        icon: MicIcon,
        name: "AudioRecorderBlock",
        tag: "audio-recorder",
        component: AudioRecorderBlock,
        atom: false,
        draggable: true,
        widget_options: {
            displayOnInlineTooltip: true,
            insertion: 'insertion',
            insert_block: 'audio-recorder',
        },
        options: {
            seconds_to_record: 120,
            upload_handler: function (file, ctx) {
                console.log("UPLOADED FILE", file);
            },
        },
        attributes: {
            url: { default: null }
        },
    };
    return Object.assign(config, options);
};
function AudioRecorderRenderer(_a) {
    var blockKey = _a.blockKey, data = _a.data, domain = _a.domain;
    var url = data.url, caption = data.caption;
    return (React.createElement("figure", { key: blockKey, className: "graf graf--figure" },
        React.createElement("div", null,
            React.createElement("div", null, url && React.createElement("audio", { src: getUrl(url, domain), controls: true }))),
        caption && caption !== 'type a caption (optional)' && (React.createElement("figcaption", { className: "imageCaption" },
            React.createElement("span", null,
                React.createElement("span", { "data-text": "true" }, caption))))));
}
var templateObject_1;

export { AudioRecorderBlockConfig, AudioRecorderRenderer, StyleWrapper, AudioRecorderBlock as default };
