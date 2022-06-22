
export class Label {
    template = ``
    value = ''

    constructor(key: string, value: string){
        this.value = value
        this.template = `<span>${value}</span>`
    }

    returnObject(){

    }
}