export class ComponenetItem {
    constructor(
        public name: string,   
        public formComponent: string,
        public icon: string = ''
    ) {}
}

export const componentList = [
    new ComponenetItem('Field Group', '', 'crop_landscape'),
    new ComponenetItem('Checkbox', '', 'check_box'),
    new ComponenetItem('Date Picker', '', 'date_range'),
    new ComponenetItem('Input', '', 'input'),
    new ComponenetItem('Label', '', 'label'),
    new ComponenetItem('Select', '', 'select_all'),
    new ComponenetItem('Radiobutton', '', 'radio_button_checked'),
    new ComponenetItem('Slider', '', 'slider'),
    new ComponenetItem('Text Area', '', 'text_rotation_none'),
    new ComponenetItem('Toggle', '', 'edit_attributes')
];

export const properties = [
    'key: ',
    'className: ',
    'type: ',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
];

