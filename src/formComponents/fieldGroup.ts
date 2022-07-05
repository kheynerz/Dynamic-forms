export class FieldGroup {
    fieldGroupClassName: string = 'display-flex';
    fieldGroup : Array<object> = [];

    constructor(components : Array<object> ){
        this.fieldGroup = components;
    }

    setData(){}
}