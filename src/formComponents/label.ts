
export class Label {
    template = ``

    constructor(value: string, styles : string){
        console.log(styles);
        this.template = `<span>${value}</span>`
    }
}