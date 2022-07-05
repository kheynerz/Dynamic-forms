
export class Label {
    //This class creates a form object of a label, that can change the style of a label
    //without using css classes
    
    //Formly properties
    template = ``
    key = ''

    //Properties of the label
    templateOptions: { text: any, size:any, bold: any, italic: any, under:any, del: any } = {
         text: '', size: 4, bold : false, italic: false, 
        under: false, del: false
    }

    //Constructor of the class
    //Flex position is not longer used in Label Class, but is keeped while refractoring the code
    constructor(key: string, flexPosition: string){
        this.key = key,
        this.templateOptions['text'] = 'Label'
        this.template = `<h4>Label</h4>`
    }

    //If data is imported set the data in the template to the templateOptions
    public setData(template: any){

        //Regular expression to get the HTML tags
        const regex = /<\/?[\w\d]+>/gi;
        let tags = template.match(regex)
        
        //Half size of the tags 
        let midLength = tags.length/2 
        
        //Inside the mid tags is the text of the label
        let initTextTag = tags[midLength-1]
        let lastTextTag = tags[midLength]

        //Index of the tags to get the value of the text 
        let initIndex = template.indexOf(initTextTag) + initTextTag.length;
        let endIndex = template.indexOf(lastTextTag);
        
        //Set the substring beetween the indexes to get the text
        this.templateOptions.text = template.substring(initIndex, endIndex);

        //To set the boolean values of the tags        
        //Only need the opening tags
        tags = tags.slice(0, midLength)

        //Get the header tag of the template
        let header = template.match(/<\/?h[1-6]>/ig)
        let h  = Number(header[0][2]) //Size of the HTML header tag
        
        //For the user the size grows but if the value of the html tag grows,
        //the header will be smaller, so a formula is applied to invert the size of tags
        this.templateOptions.size = h + (5 - 2*(h - 1));

        //Iterate the tags and set the respective option to true
        tags.forEach((t:string) => {
            switch (t) {
                case '<strong>':
                    this.templateOptions.bold = true;
                    break;
                case '<i>':
                    this.templateOptions.italic = true;
                    break;
                case '<u>':
                    this.templateOptions.under = true;
                    break;
                case '<del>':
                    this.templateOptions.del = true;
                    break;
                default:
                    break;
            }
        })
        
        this.getTemplate()
    }

    public getProperties(): Array<string>{
        return ['key', 'text', 'italic','under','del','size']
    }

    //Function to get the value of a property
    public get(prop:string): any{
        if (prop ==='key'){
            return this.key
        }

        //Create a Object key to dynamically access a template option and return the property
        type ObjectKey = keyof typeof this.templateOptions;
        const key = prop as ObjectKey;

        return this.templateOptions[key]
    }
    public changeProperty(property: string, newValue: string | boolean | number ){
        //Create a Object key to dynamically access a template option
        type ObjectKey = keyof typeof this.templateOptions;
        const key = property as ObjectKey;
        // Set the new value to the option
        this.templateOptions[key] = newValue
        //Update the template of the Label
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
        let size = this.templateOptions['size'] + (5 - 2*(this.templateOptions['size'] - 1))
        this.template += `<h${size}>`
        this.addText()
        this.template += `</h${size}>`
    }

    /*This function add the text to the template*/
    private addText(){
        this.template += `${this.templateOptions['text']}`
    }

}