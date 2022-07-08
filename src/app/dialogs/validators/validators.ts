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


//Costa Rican phone number Validator Regex
let phone: Validator = {
    expression: (c:any) => /^\d{4}-?\d{4}$/.test(c.value),
    message: (_: any, field: FormlyFieldConfig) => `"${field.formControl!.value}" is not a valid Costa Rican cellphone number, Format: ####-####`,
}

let weakPassword: Validator = {
    expression: (c:any) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(c.value),
    message: (_: any, field: FormlyFieldConfig) => `"${field.formControl!.value}" 8 characters. Min: (Uppercase and number)`,
}

let strongPassword: Validator = {
    expression: (c:any) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/.test(c.value),
    message: (_: any, field: FormlyFieldConfig) => `"${field.formControl!.value}" 12 characters ( Uppercase, number and symbol @$!%*?& )`,
}



//Export the dataSource of the Table 
export let dataSource = [
    {name:'email',visualName: 'Email', regex: /^([\w\d._\-#])+@([\w\d._\-#]+[.][\w\d._\-#]+)+$/, example: 'forms@email.com', checked: false},
    {name:'idCR', visualName: 'Cédula', regex: /^[1-9]-\d{4}-\d{4}$/, example: '1-0234-0567', checked: false},
    {name:'phone', visualName: 'Teléfono', regex: /^\d{4}-?\d{4}$/, example: '2460-0000 | 88888888', checked: false},
    {name:'weakPassword', visualName: 'Contraseña (8 caracteres,1 minúscula, 1 mayúscula)', regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, example: 'aB985cde', checked: false},
    {name:'strongPassword', visualName: 'Contraseña (12 caracteres,1 minúscula, 1 mayúscula, 1 símbolo)', regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/, example: 'aB985cde&ABC', checked: false},
]

//Export the available validators
export let validators: any = { email, idCR, phone, weakPassword, strongPassword }