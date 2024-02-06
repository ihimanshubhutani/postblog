import React, { useState, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import { f as _slicedToArray, B as fontColor } from '../icons-2651a870.js';

function useDebounce(value, delay) {
  // State and setters for debounced value
  var _useState = useState(value),
    _useState2 = _slicedToArray(_useState, 2),
    debouncedValue = _useState2[0],
    setDebouncedValue = _useState2[1];
  useEffect(function () {
    // Update debounced value after delay
    var handler = setTimeout(function () {
      setDebouncedValue(value);
    }, delay);
    // Cancel the timeout if value changes (also on delay change or unmount)
    // This is how we prevent debounced value from updating if value is changed ...
    // .. within the delay period. Timeout gets cleared and restarted.
    return function () {
      clearTimeout(handler);
    };
  }, [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}

function DanteTooltipColor(props) {
    var _a = useState(false), open = _a[0], setOpen = _a[1];
    var _b = useState(props.value), value = _b[0], setValue = _b[1];
    var debouncedValue = useDebounce(value, 200);
    function toggle(ev) {
        // let selection = this.props.editorState.getSelection()
        // prevent unselection of selection
        ev.preventDefault();
        setOpen(!open);
    }
    useEffect(function () {
        if (debouncedValue) {
            props.handleClick(value);
        }
    }, [debouncedValue] // Only call effect if debounced search term changes
    );
    function currentValue() {
        /*let selection = this.props.editorState.getSelection()
        if (!selection.isCollapsed()) {
          return this.props.styles[this.props.style_type].current(this.props.editorState)
        } else {
          return
        }*/
    }
    function renderColor() {
        // @ts-ignore
        var v = currentValue() || props.value || props.defaultValue;
        if (open) {
            return (React.createElement("div", { style: {
                    position: "absolute",
                    top: "50px",
                    left: "236px",
                } },
                React.createElement(HexColorPicker, { color: v, 
                    // @ts-ignore
                    onChange: function (color, e) {
                        setValue(color);
                        //handleChange(e, color);
                        //this.handleClick(e,  color )
                    } })));
        }
    }
    return (React.createElement("li", { className: "dante-menu-button" },
        React.createElement("span", { className: "dante-icon", onMouseDown: toggle }, fontColor()),
        renderColor()));
}

export { DanteTooltipColor as default };
