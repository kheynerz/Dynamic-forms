export class ComponenetItem {
    constructor(
        public name: string,   
        public icon: string = ''
    ) {}
}

export const componentList = [
    new ComponenetItem('Checkbox', 'check_box'),
    new ComponenetItem('Date Picker', 'date_range'),
    //new ComponenetItem('Field Group', 'crop_landscape'),
    new ComponenetItem('Input', 'input'),
    new ComponenetItem('Label', 'label'),
    new ComponenetItem('Radiobutton', 'radio_button_checked'),
    new ComponenetItem('Select', 'select_all'),
    new ComponenetItem('Slider', 'slider'),
    new ComponenetItem('Text Area', 'text_rotation_none'),
    new ComponenetItem('Toggle', 'edit_attributes')
];

export const properties = [
    'key: ',
    'size: ',
    'type: ',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
];

