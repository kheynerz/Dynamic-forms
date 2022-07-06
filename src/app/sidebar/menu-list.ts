export class ComponenetItem {
    constructor(
        public name: string,   
        public icon: string = ''
    ) {}
}

export const componentList = [
    
    new ComponenetItem('Checkbox', 'check_box'),
    new ComponenetItem('Datepicker', 'date_range'),
    //new ComponenetItem('Field Group', 'crop_landscape'),
    new ComponenetItem('Input', 'input'),
    new ComponenetItem('Radio', 'radio_button_checked'),
    new ComponenetItem('Label', 'label'),
    new ComponenetItem('Select', 'arrow_drop_down'),
    new ComponenetItem('Slider', 'remove'),
    new ComponenetItem('Textarea', 'text_rotation_none'),
    new ComponenetItem('Toggle', 'edit_attributes')
];


