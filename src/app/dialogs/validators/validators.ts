import { FormlyFieldConfig } from "@ngx-formly/core";

//All validators must have a expression and a message function
interface Validator{
    expression: Function, 
    message: Function
}
  
//Email validator regex
let email: Validator = {
    expression: (c:any) => /^([\w\d._\-#])+@([\w\d._\-#]+[.][\w\d._\-#]+)+$/.test(c.value),
    message: (_: any, field: FormlyFieldConfig) => `"${field.formControl!.value}" is not a valid Email Address`,
}

//Costa Rican ID Validator Regex
let idCR: Validator = {
    expression: (c:any) => /^[1-9]-\d{4}-\d{4}$/.test(c.value),
    message: (_: any, field: FormlyFieldConfig) => `"${field.formControl!.value}" is not a valid Costa Rican ID`,
}

//Export the dataSource of the Table 
export let dataSource = [
    {name:'email', regex: /^([\w\d._\-#])+@([\w\d._\-#]+[.][\w\d._\-#]+)+$/, checked: false},
    {name:'idCR', regex: /^[1-9]-\d{4}-\d{4}$/, checked: false},
]

//Export the available validators
export let validators: any = { email, idCR }