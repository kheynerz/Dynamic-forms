export class ComponenetItem {
    constructor(
        public name: string,   
        public toolTip: string,
        public icon: string = ''
    ) {}
}

export const componentList = [
    new ComponenetItem('Field Group', '', 'group_work'),
    new ComponenetItem('Checkbox', '', 'check_box'),
    new ComponenetItem('Datepicker', '', 'date_range'),
    new ComponenetItem('Input', '', 'input'),
    new ComponenetItem('Label', '', 'label'),
    new ComponenetItem('Multiple Select', '', 'select_all'),
    new ComponenetItem('Radiobutton', '', 'radio_button_checked'),
    new ComponenetItem('Select', '', 'select'),
    new ComponenetItem('Slider', '', 'slider'),
    new ComponenetItem('Textarea', '', 'text_rotation_none'),
    new ComponenetItem('Toggle', '', 'indeterminate_check_box')
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

