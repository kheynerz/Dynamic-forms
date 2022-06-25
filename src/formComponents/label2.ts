
export class Label2 {
    //This class creates a form object of a label, that can change the style of a label
    //without using css classes
    
    //Formly properties
    template = ``
    type = 'label'
    flexPosition = 'flex-1'
    key = ''

    //Properties of the label
    #text = ``
    #size = 3;
    #bold: boolean = false;
    #italic: boolean = false;
    #undelined: boolean = false;
    #del: boolean = false;


    constructor(key: string, text: string){
        this.key = key,
        this.#text = text
        this.template = `<h3>${text}</h3>`
    }

    /*Setters of the properties*/ 
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
        this.#text = value
    }
    public changeSize(value: number){
        this.#size = value
    }

    /*Get the template of the label*/
    public getTemplate(){
        this.template = ``
        this.addBold()
        return this.template
    }

    /*Return the object that can be rendered with formly*/
    public returnObject(){
        return {"key": this.key, 
                "className" : this.flexPosition, 
                "type": this.type, 
                "template": this.getTemplate()
            }
    }

    /*This function add the <strong> tag to the template*/
    private addBold(){
        if (this.#bold){
            this.template += `<strong>`
            this.addItalic()
            this.template +=`</strong>`
        }else{
            this.addItalic()
        }
    }

    
    /*This function add the <i> tag to the template*/
    private addItalic(){
        if (this.#italic){
            this.template += `<i>`
            this.addUnderline()
            this.template +=`</i>`
        }else{
            this.addUnderline()
        }
    }

    /*This function add the <u> tag to the template*/
    private addUnderline(){
        if (this.#undelined){
            this.template += `<u>`
            this.addDel()
            this.template +=`</u>`
        }else{
            this.addDel()
        }
    }

    /*This function add the <del> tag to the template*/
    private addDel(){
        if (this.#del){
            this.template += `<del>`
            this.addSize()
            this.template +=`</del>`
        }else{
            this.addSize()
        }
    }

    /*This function add the size to the template*/
    private addSize(){
        this.template += `<h${this.#size}>`
        this.addText()
        this.template += `</h${this.#size}>`
    }

    /*This function add the text to the template*/
    private addText(){
        this.template += `${this.#text}`
    }

}