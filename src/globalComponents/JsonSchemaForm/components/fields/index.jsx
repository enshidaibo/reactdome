import BaseInput from "./BaseInput";
import BaseTextarea from "./BaseTextarea";
import BaseRadio from "./BaseRadio";
import BaseSwitch from "./BaseSwitch";
import BaseSelect from "./BaseSelect";
import BaseTreeSelect from "./BaseTreeSelect";
import BaseCheckbox from "./BaseCheckbox";
import BaseDatePicker from "./BaseDatePicker";
import BaseInputNumber from "./BaseInputNumber";
import BaseTree from './BaseTree';
import BaseImage from './BaseImage';

const widgets = {
    boolean: {
        // checkbox: BaseCheckbox,
        // radio: "RadioWidget",
        select: BaseSelect,
        // hidden: "HiddenWidget",
        switch: BaseSwitch,
    },
    string: {
        default: BaseInput,
        text: BaseInput,
        textarea: BaseTextarea,
        radio: BaseRadio,
        image: BaseImage,
        // password: "PasswordWidget",
        // email: "EmailWidget",
        // hostname: "TextWidget",
        // ipv4: "TextWidget",
        // ipv6: "TextWidget",
        // uri: "URLWidget",
        // "data-url": "FileWidget",
        select: BaseSelect,
        treeSelect: BaseTreeSelect,
        // hidden: "HiddenWidget",
        date: BaseDatePicker,
        // datetime: "DateTimeWidget",
        // "date-time": "DateTimeWidget",
        // "alt-date": "AltDateWidget",
        // "alt-datetime": "AltDateTimeWidget",
        // color: "ColorWidget",
        // file: "FileWidget",
    },
    number: {
        default: BaseInputNumber,
        // text: "TextWidget",
        select: BaseSelect,
        treeSelect: BaseTreeSelect,
        inputNumber: BaseInputNumber,
        // updown: "UpDownWidget",
        // range: "RangeWidget",
        // radio: "RadioWidget",
        // hidden: "HiddenWidget",
    },
    integer: {
        // text: "TextWidget",
        default: BaseInputNumber,
        select: BaseSelect,
        treeSelect: BaseTreeSelect,
        inputNumber: BaseInputNumber,
        // updown: "UpDownWidget",
        // range: "RangeWidget",
        radio: BaseRadio,
        switch: BaseSwitch,
        // hidden: "HiddenWidget",
    },
    array: {
        default: BaseCheckbox,
        select: BaseSelect,
        treeSelect: BaseTreeSelect,
        tree: BaseTree,
        // checkboxes: "CheckboxesWidget",
        checkbox: BaseCheckbox,
        // files: "FileWidget",
        // hidden: "HiddenWidget",
    },
    // textarea: BaseTextarea
}

export default widgets