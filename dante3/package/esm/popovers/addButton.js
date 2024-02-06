import { FloatingMenu } from '@tiptap/react';
import React from 'react';
import { n as add } from '../icons-2651a870.js';
import { InlinetooltipWrapper } from '../styled/base.js';
import '../tslib.es6-e024cfb8.js';
import '@emotion/styled';
import 'polished';

var AddButton = React.forwardRef(function (props, ref) {
    var display = props.display, widgets = props.widgets, editor = props.editor, configTooltip = props.configTooltip;
    var fixed = configTooltip.fixed;
    var _a = React.useState(false), scaled = _a[0], setScaled = _a[1];
    var _b = React.useState(fixed ? "100%" : "auto"), scaledWidth = _b[0], setScaledWidth = _b[1];
    var fileInput = React.useRef(null);
    React.useEffect(function () {
        var val = scaled ? "auto" : "0";
        setScaledWidth(val);
    }, [scaled]);
    React.useEffect(function () {
        editor.on("selectionUpdate", function (_a) {
            _a.editor; _a.s;
            // The selection has changed.
            setScaled(false);
        });
    }, []);
    function scaledClass() {
        if (scaled || fixed) {
            return "is-scaled";
        }
        else {
            return "";
        }
    }
    function activeClass() {
        //if @props.show then "is-active" else ""
        if (isActive()) {
            return "is-active";
        }
        else {
            return "";
        }
    }
    function isActive() {
        return display && editor.isEditable;
    }
    function scale() {
        if (scaled)
            return;
        setScaled(true);
    }
    function collapse() {
        if (!scaled)
            return;
        setScaled(false);
    }
    function _toggleScaled(ev) {
        ev.preventDefault();
        if (scaled) {
            return collapse();
        }
        else {
            return scale();
        }
    }
    function getItems() {
        if (!widgets)
            return [];
        return widgets.filter(function (o) {
            return o.widget_options
                ? o.widget_options.displayOnInlineTooltip
                : null;
        });
    }
    function clickOnFileUpload(e, block) {
        var _a;
        // @ts-ignore
        var _b = block.widget_options, file_types = _b.file_types, insert_block = _b.insert_block;
        if (file_types) {
            // @ts-ignore
            fileInput.current.accept = file_types;
            // @ts-ignore
            fileInput.current.dataset.blockType = insert_block;
        }
        // @ts-ignore
        fileInput && ((_a = fileInput === null || fileInput === void 0 ? void 0 : fileInput.current) === null || _a === void 0 ? void 0 : _a.click());
        //this.collapse()
        //return this.hide()
    }
    function handlePlaceholder(block) {
        editor.commands.insertContent({
            type: "PlaceholderBlock",
            attrs: {
                blockKind: block
            }
        });
    }
    function handleInsertion(block) {
        editor.commands.insertContent({
            type: block.name,
            attrs: {}
        });
    }
    function handleFunc(e) {
        // this.hide();
        var ctx = {
            configTooltip: configTooltip,
            editor: editor
        };
        return e.widget_options.funcHandler && e.widget_options.funcHandler(ctx);
    }
    function clickHandler(e, type) {
        //console.log("TYPE", type);
        var request_block = widgets.find(function (o) { return o.tag === type; });
        switch (request_block.widget_options.insertion) {
            case "upload":
                return clickOnFileUpload(e, request_block);
            case "placeholder":
                return handlePlaceholder(request_block);
            case "insertion":
                return handleInsertion(request_block);
            case "func":
                return handleFunc(request_block);
            default:
                return console.log("WRONG TYPE FOR ".concat(request_block.widget_options.insertion));
        }
    }
    function insertImage(file) {
        if (!file)
            return;
        ({
            url: URL.createObjectURL(file),
            file: file
        });
        // cleans input image value
        // @ts-ignore
        fileInput.current.value = "";
        editor.commands.insertContent({
            // @ts-ignore
            type: fileInput.current.dataset.blockType || "ImageBlock",
            attrs: {
                file: file,
                url: URL.createObjectURL(file)
            }
        });
    }
    function handleFileInput(e) {
        var fileList = e.target.files;
        // TODO: support multiple file uploads
        /*
        Object.keys(fileList).forEach (o)=>
          @.insertImage(fileList[0])
        */
        return insertImage(fileList[0]);
    }
    function fixedClass() {
        if (fixed)
            return 'is-fixed';
        return "";
    }
    return (React.createElement(MaybeFloating, { editor: editor, fixed: fixed },
        React.createElement(InlinetooltipWrapper, { ref: ref, className: "inlineTooltip ".concat(fixedClass(), " ").concat(activeClass(), " ").concat(scaledClass()) },
            !fixed && (React.createElement("button", { type: "button", className: "inlineTooltip-button control", title: "Close Menu", "data-action": "inline-menu", onClick: _toggleScaled }, add())),
            React.createElement("div", { className: "inlineTooltip-menu ".concat(fixed ? "inlineTooltip-menu-fixed" : "inlineTooltip-menu-inline"), 
                //style={scaledWidthStyle()}
                style: { width: "".concat(fixed ? "-1" : scaledWidth) } },
                getItems().map(function (item, i) {
                    return (React.createElement(InlineTooltipItem, { title: "", item: item, key: i, clickHandler: clickHandler }));
                }),
                React.createElement("input", { type: "file", accept: "image/*", style: { display: "none" }, ref: fileInput, multiple: true, onChange: handleFileInput })))));
});
AddButton.displayName = "AddButton";
function MaybeFloating(_a) {
    var editor = _a.editor, children = _a.children, fixed = _a.fixed;
    function isPopOverEnabledFor(a) {
        //console.log("ENABLED FOR ", editor.state.selection.$anchor.parent);
        var comp = editor === null || editor === void 0 ? void 0 : editor.state.selection.$anchor.parent;
        if (comp && comp.type.name === "paragraph")
            return true;
    }
    if (!fixed)
        return React.createElement(FloatingMenu, { editor: editor, tippyOptions: { duration: 100, arrow: false, interactive: true } }, isPopOverEnabledFor() && (children));
    return children;
}
// @ts-ignore
function InlineTooltipItem(_a) {
    var item = _a.item, clickHandler = _a.clickHandler, title = _a.title;
    function onMouseDown(e) {
        e.preventDefault();
        return clickHandler(e, item.tag);
    }
    return (React.createElement("button", { type: "button", className: "inlineTooltip-button scale", title: title, onMouseDown: onMouseDown, "data-cy": "inline-tooltip-button-".concat(item.tag), onClick: function (e) { return e.preventDefault(); }, style: { fontSize: "21px" } }, React.createElement("span", { className: "tooltip-icon" }, item.icon())));
}
/*
function InlineTooltipItem222({ item: { type, popper, icon } , clickHandler, title }) {
  const onClick = (e) => {
    e.preventDefault();
    debugger
    return clickHandler(e, type);
  };

  const popperPlacement = popper && popper.placement ? popper.placement : "bottom"
  const popperOffset = popper && popper.offset ? popper.offset : [0, 7]

  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip({ placement: popperPlacement, offset: popperOffset });

  return (
    <div className="button-container">
      <button
        ref={setTriggerRef}
        type="button"
        className="inlineTooltip-button scale"
        title={title}
        data-cy={`inline-tooltip-button-${type}`}
        onMouseDown={onClick}
        onClick={(e) => e.preventDefault()}
        style={{ fontSize: "21px" }}
      >
        {<span className={"tooltip-icon"}>{icon()}</span>}
      </button>
      {(popper && visible) && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps({ className: 'tooltip-container', style: { fontSize: "12px", borderRadius: "5px" } })}
        >
          <div {...getArrowProps({ className: 'tooltip-arrow' })} />
          {popper && popper.name}
        </div>
      )}
    </div>
  );
  
}
*/
var AddButtonConfig = function (options) {
    if (options === void 0) { options = {}; }
    var config = {
        ref: "add_tooltip",
        component: AddButton,
    };
    return Object.assign(config, options);
};

export { AddButtonConfig, AddButton as default };
