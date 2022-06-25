
export class Label2 {
    template = ``
    type = 'label'
    flexPosition = 'flex-1'
    key = ''
    text = ``
    #size = 6;
    #bold: boolean = false;
    #italic: boolean = false;
    #undelined: boolean = false;
    #del: boolean = false;


    constructor(key: string, text: string){
        this.key = key,
        this.text = text
        this.template = `<h6>${text}</h6>`
    }

    public changeBold(value: boolean){
        this.#bold = value
    }
    public changeItalic(value: boolean){
        this.#italic = value
    }
    public changeUnderline(value: boolean){
        this.#undelined = value
    }
    public changeDel(value: boolean){
        this.#del = value
    }
    public changeText(value: string){
        this.text = value
    }
    public changeSize(value: number){
        this.#size = value
    }


    public getTemplate(){
        this.template = ``
        this.addBold()
        return this.template
    }

    public returnObject(){
        return {"key": this.key, 
                "className" : this.flexPosition, 
                "type": this.type, 
                "template": this.getTemplate()
            }
    }


    private addBold(){
        if (this.#bold){
            this.template += `<strong>`
            this.addItalic()
            this.template +=`</strong>`
        }else{
            this.addItalic()
        }
    }

    private addItalic(){
        if (this.#italic){
            this.template += `<i>`
            this.addUnderline()
            this.template +=`</i>`
        }else{
            this.addUnderline()
        }
    }

    private addUnderline(){
        if (this.#undelined){
            this.template += `<u>`
            this.addDel()
            this.template +=`</u>`
        }else{
            this.addDel()
        }
    }

    private addDel(){
        if (this.#del){
            this.template += `<del>`
            this.addSize()
            this.template +=`</del>`
        }else{
            this.addSize()
        }
    }

    private addSize(){
        this.template += `<h${this.#size}>`
        this.addText()
        this.template += `</h${this.#size}>`
    }

    private addText(){
        this.template += `${this.text}`
    }

}