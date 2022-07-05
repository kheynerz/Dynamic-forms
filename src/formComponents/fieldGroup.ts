export class FieldGroup {
    fieldGroupClassName: string = 'display-flex';
    fieldGroup : Array<object> = [];

    constructor(components : Array<object> ){
        this.fieldGroup = components;
    }

    //Set data is not needed in FieldGroup, but is keeped while refractoring the code
    //because it produce errors
    setData(){}
}