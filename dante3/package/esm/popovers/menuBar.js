import React, { useState } from 'react';
import { AnchorStyle } from '../styled/menu.js';
import ImageTooltip from './image.js';
import { BubbleMenu } from '@tiptap/react';
import DanteTooltipColor from './color.js';
import { o as close, p as bold, q as italic, r as h1, t as h2, u as h3, w as insertunorderedlist, x as insertorderedlist, y as code, z as blockquote, A as link } from '../icons-2651a870.js';
import '../tslib.es6-e024cfb8.js';
import '@emotion/styled';
import 'polished';
import 'react-colorful';

function DanteTooltipLink(_a) {
    var enableLinkMode = _a.enableLinkMode, selected = _a.selected; _a.editor;
    function promptForLink(ev) {
        /*let selection = this.props.editorState.getSelection()
        if (!selection.isCollapsed()) {
          return this.props.enableLinkMode(ev)
        }*/
        return enableLinkMode(ev);
    }
    return (React.createElement("li", { className: "dante-menu-button ".concat(selected ? "active" : ""), onMouseDown: promptForLink },
        React.createElement("span", { className: "dante-icon" }, link())));
}
function MenuBar(_a) {
    var editor = _a.editor, configTooltip = _a.configTooltip;
    var _b = useState({
        link_mode: false,
        menu_style: {
            minWidth: "200px",
        },
    }), linkState = _b[0], setLinkState = _b[1];
    var fixed = configTooltip.fixed;
    var _c = useState(false), show = _c[0]; _c[1];
    if (!editor) {
        return null;
    }
    function displayLinkMode() {
        if (linkState.link_mode) {
            return "dante-menu--linkmode";
        }
        else {
            return "";
        }
    }
    function itemClass(kind, opts) {
        if (opts === void 0) { opts = null; }
        if (!opts)
            return "dante-menu-button ".concat(editor.isActive(kind) ? "active" : "");
        return "dante-menu-button ".concat(editor.isActive(kind, opts) ? "active" : "");
    }
    function handleInputEnter(e) {
        if (e.which === 13) {
            return confirmLink(e);
        }
    }
    function confirmLink(e) {
        e.preventDefault();
        var url = e.currentTarget.value;
        if (url === "") {
            editor.chain().focus().unsetLink().run();
        }
        else {
            editor.chain().focus().setLink({ href: url }).run();
        }
        _disableLinkMode(e);
    }
    function _enableLinkMode(ev) {
        ev.preventDefault();
        setLinkState({
            link_mode: true,
            menu_style: {
                minWidth: "200px",
            },
        });
    }
    function _disableLinkMode(ev) {
        ev.preventDefault();
        setLinkState({
            link_mode: false,
            url: "",
            menu_style: {},
        });
    }
    function _clickBlockInlineStyle(style) {
        editor.chain().focus().setColor &&
            editor.chain().focus().setColor(style).run();
    }
    function fixedStyles() {
        if (!fixed)
            return { width: "".concat(11 * 43, "px") };
        if (fixed)
            return { position: "sticky", top: "0" };
        return {};
    }
    function renderMenu() {
        var _a, _b, _c, _d, _e;
        if (!editor.isEditable)
            return null;
        var allowedElements = configTooltip.selectionElements || ["paragraph", "heading"];
        var currentBlock = (_e = (_d = (_c = (_b = (_a = editor === null || editor === void 0 ? void 0 : editor.view) === null || _a === void 0 ? void 0 : _a.state) === null || _b === void 0 ? void 0 : _b.selection) === null || _c === void 0 ? void 0 : _c.$head) === null || _d === void 0 ? void 0 : _d.parent) === null || _e === void 0 ? void 0 : _e.type.name;
        if (!allowedElements.includes(currentBlock))
            return;
        // TODO: use the configuration for this!
        // if (editor.isActive("ImageBlock")) return null;
        return (React.createElement(AnchorStyle, { fixed: fixed, className: "dante-menu ".concat(displayLinkMode()), 
            // @ts-ignore
            style: fixedStyles() },
            React.createElement("div", { className: "dante-menu-linkinput", style: { width: "".concat(11 * 43, "px") } },
                React.createElement("input", { className: "dante-menu-input", placeholder: "put your souce here", onKeyPress: handleInputEnter }),
                React.createElement("div", { className: "dante-menu-button", onMouseDown: _disableLinkMode },
                    React.createElement("span", { className: "dante-icon" }, close()))),
            React.createElement("div", { className: "dante-menu-buttons", style: linkState.menu_style },
                React.createElement("li", { onClick: function () { return editor.chain().focus().toggleBold().run(); }, className: itemClass("bold") },
                    React.createElement("span", { className: "dante-icon" }, bold())),
                React.createElement("li", { onClick: function () { return editor.chain().focus().toggleItalic().run(); }, className: itemClass("italic") },
                    React.createElement("span", { className: "dante-icon" }, italic())),
                React.createElement(DanteTooltipColor, { styles: {}, editor: editor, enableLinkMode: _enableLinkMode, value: null, defaultValue: "#555", style_type: "color", handleClick: _clickBlockInlineStyle, show: show }),
                React.createElement(DanteTooltipLink, { selected: editor.isActive("link"), editor: editor, enableLinkMode: _enableLinkMode }),
                React.createElement("li", { onClick: function () {
                        return editor.chain().focus().toggleHeading({ level: 1 }).run();
                    }, className: itemClass("heading", { level: 1 }) },
                    React.createElement("span", { className: "dante-icon" }, h1())),
                React.createElement("li", { onClick: function () {
                        return editor.chain().focus().toggleHeading({ level: 2 }).run();
                    }, className: itemClass("heading", { level: 2 }) },
                    React.createElement("span", { className: "dante-icon" }, h2())),
                React.createElement("li", { onClick: function () {
                        return editor.chain().focus().toggleHeading({ level: 3 }).run();
                    }, className: itemClass("heading", { level: 3 }) },
                    React.createElement("span", { className: "dante-icon" }, h3())),
                React.createElement("li", { onClick: function () { return editor.chain().focus().toggleBulletList().run(); }, className: itemClass("bulletList") },
                    React.createElement("span", { className: "dante-icon" }, insertunorderedlist())),
                React.createElement("li", { onClick: function () { return editor.chain().focus().toggleOrderedList().run(); }, className: itemClass("orderedList") },
                    React.createElement("span", { className: "dante-icon" }, insertorderedlist())),
                React.createElement("li", { onClick: function () { return editor.chain().focus().toggleCodeBlock().run(); }, className: itemClass("codeBlock") },
                    React.createElement("span", { className: "dante-icon" }, code())),
                React.createElement("li", { onClick: function () { return editor.chain().focus().toggleBlockquote().run(); }, className: itemClass("blockquote") },
                    React.createElement("span", { className: "dante-icon" }, blockquote())))));
    }
    function renderImageTooptip() {
        if (!editor.isEditable)
            return;
        if (!editor.isActive("ImageBlock"))
            return null;
        return (React.createElement(ImageTooltip, { item: {}, handleClick: function (e) {
                var _a, _b, _c;
                //console.log("AAA", e);
                editor.commands.updateAttributes("ImageBlock", { direction: e });
                var pos = (_c = (_b = (_a = editor === null || editor === void 0 ? void 0 : editor.view) === null || _a === void 0 ? void 0 : _a.lastSelectedViewDesc) === null || _b === void 0 ? void 0 : _b.spec) === null || _c === void 0 ? void 0 : _c.getPos();
                //console.log("POS", pos);
                pos && editor.commands.setNodeSelection(pos);
            } }));
    }
    return (React.createElement(React.Fragment, null,
        fixed && renderMenu(),
        !fixed && (React.createElement(BubbleMenu, { editor: editor },
            renderMenu(),
            renderImageTooptip()))));
}
var MenuBarConfig = function (options) {
    if (options === void 0) { options = {}; }
    var config = {
        ref: "menu_bar",
        component: MenuBar,
    };
    return Object.assign(config, options);
};

export { MenuBarConfig, MenuBar as default };
