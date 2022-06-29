export class ComponenetItem {
    constructor(
        public name: string,   
        public icon: string = ''
    ) {}
}

export const componentList = [
    
    new ComponenetItem('Label2', 'label'),
    new ComponenetItem('Checkbox', 'check_box'),
    new ComponenetItem('Datepicker', 'date_range'),
    //new ComponenetItem('Field Group', 'crop_landscape'),
    new ComponenetItem('Input', 'input'),
    //new ComponenetItem('Label', 'label'),
    new ComponenetItem('RadioButton', 'radio_button_checked'),
    new ComponenetItem('Select', 'select_all'),
    new ComponenetItem('Slider', 'slider'),
    new ComponenetItem('Textarea', 'text_rotation_none'),
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

