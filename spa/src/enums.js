module.exports = Object.freeze({
    // fields: Enum("Small Text", "Number", "Checkbox", "Text Area", "Picture", "Link", "WYSIWYG Editor", "Datepicker",
    //     "Youtube Video", "Entry Link", "File"),
    // restMethods: Enum("GET", "POST", "PUT", "DELETE")
    fields: {
        SMALL_TEXT: "Small Text",
        NUMBER: "Number",
        CHECKBOX: "Checkbox",
        TEXTAREA: "Text Area",
        PICTURE: "Picture",
        LINK: "Link",
        WYSIWYG: "WYSIWYG Editor",
        DATEPICKER: "Date Picker",
        YOUTUBE: "Youtube Video",
        ENTRY: "Entry Link",
        FILE: "File"
    },
    restMethods: {
        GET: "GET",
        POST: "POST",
        PUT: "PUT",
        DELETE: "DELETE"
    }
});