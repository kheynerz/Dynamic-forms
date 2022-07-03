
export class Label {
    //This class creates a form object of a label, that can change the style of a label
    //without using css classes
    
    //Formly properties
    template = ``
    type = 'label'
    flexPosition = 'flex-1'
    key = ''

    //Properties of the label
    templateOptions: { text: any, size:any, bold: any, italic: any, under:any, del: any } = {
         text: '', size: 4, bold : false, italic: false, 
        under: false, del: false
    }
    constructor(key: string, flexPos: string){
        this.key = key,
        this.flexPosition = flexPos
        this.templateOptions['text'] = 'Label'
        this.template = `<h4>Label</h4>`
    }

    public setData(template: any){
        this.template = template
        const regex = /<\/?[\w\d]+>/gi;
        let tags = template.match(regex)
        let spaces = 4
        tags = tags.slice(0, tags.length/2)

        tags.forEach((t:string) => {
            switch (t) {
                case '<strong>':
                    spaces += 8;
                    this.templateOptions.bold = true;
                    break;
                case '<i>':
                    spaces += 3;
                    this.templateOptions.italic = true;
                    break;
                case '<u>':
                    spaces += 3;
                    this.templateOptions.under = true;
                    break;
                case '<del>':
                    spaces += 5;
                    this.templateOptions.del = true;
                    break;
                default:
                    this.templateOptions.size = Number(t[2]);
                    break;
            }
        })
        
        let end = template.length -tags.length -spaces 
        this.templateOptions.text = template.slice(spaces,end)
    }


    public getProperties(): Array<string>{
        return ['key', 'text', 'italic','under','del','size']
    }

    public get(prop:string): any{
        if (prop ==='key'){
            return this.key
        }

        type ObjectKey = keyof typeof this.templateOptions;
        const key = prop as ObjectKey;

        return this.templateOptions[key]
    }
    public changeProperty(property: string, newValue: string | boolean | number ){
        type ObjectKey = keyof typeof this.templateOptions;
        const key = property as ObjectKey;
        this.templateOptions[key] = newValue
        
        this.getTemplate()
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
        if (this.templateOptions['bold']){
            this.template += `<strong>`
            this.addItalic()
            this.template +=`</strong>`
        }else{
            this.addItalic()
        }
    }

    
    /*This function add the <i> tag to the template*/
    private addItalic(){
        if (this.templateOptions['italic']){
            this.template += `<i>`
            this.addUnderline()
            this.template +=`</i>`
        }else{
            this.addUnderline()
        }
    }

    /*This function add the <u> tag to the template*/
    private addUnderline(){
        if (this.templateOptions['under']){
            this.template += `<u>`
            this.addDel()
            this.template +=`</u>`
        }else{
            this.addDel()
        }
    }

    /*This function add the <del> tag to the template*/
    private addDel(){
        if (this.templateOptions['del']){
            this.template += `<del>`
            this.addSize()
            this.template +=`</del>`
        }else{
            this.addSize()
        }
    }

    /*This function add the size to the template*/
    private addSize(){
        let size = this.templateOptions['size'] + (5 - 2*(this.templateOptions['size']-1))
        this.template += `<h${size}>`
        this.addText()
        this.template += `</h${size}>`
    }

    /*This function add the text to the template*/
    private addText(){
        this.template += `${this.templateOptions['text']}`
    }

}