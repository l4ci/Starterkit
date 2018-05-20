// validate.js
validate.init({
    fieldClass: 'input--error',
    errorClass: 'field__message',
    messageValueMissing: 'Bitte füllen Sie dieses Feld aus.',
    messageValueMissingCheckbox: 'Dies ist ein Pflichtfeld.', // Displayed when a required checkbox isn't checked
    messageValueMissingRadio: 'Bitte auswählen.', // Displayed when a required radio button isn't selected
    messageValueMissingSelect: 'Bitte auswählen.', // Displayed when an option from a required select menu isn't selected
    messageValueMissingSelectMulti: 'Please select at least one value.', // Displayed when an option from a require multi-select menu isn't selected
    messageTypeMismatchEmail: 'Bitte geben Sie eine Email Adresse ein.', // Displayed when a `type="email"` field isn't a valid email
    messageTypeMismatchURL: 'Please enter a URL.', // Displayed when a `type="url"` field isn't a valid URL
    messageTooShort: 'Please lengthen this text to {minLength} characters or more. You are currently using {length} characters.', // Displayed with the `minLength` attribute is used and the input value is too short
    messageTooLong: 'Please shorten this text to no more than {maxLength} characters. You are currently using {length} characters.', // Displayed with the `maxLength` attribute is used and the input value is too long
    messagePatternMismatch: 'Please match the requested format.', // Displayed with the `pattern` attribute is used and the pattern doesn't match (if a `title` attribute is used, that's displayed instead)
    messageBadInput: 'Please enter a number.', // Displayed when the field is numeric (ex. `type="number"`) but the value is not a number
    messageStepMismatch: 'Please select a valid value.', // Displayed when the `step` attribute is used and the value doesn't adhere to it
    messageRangeOverflow: 'Please select a value that is no more than {max}.', // Displayed with the `max` attribute is used and the input value is too hight
    messageRangeUnderflow: 'Please select a value that is no less than {min}.', // Displayed with the `mind` attribute is used and the input value is too low
    messageGeneric: 'The value you entered for this field is invalid.', // A catchall error, displayed when the field fails validation and none of the other conditions apply
});
