export class glassesList{
    constructor()
    {
        this.gList = [];
    }
    addGlasses(glasses){
        this.gList.push(glasses);
    }
    renderGlasses(){
        let content = "";
        content = this.gList.reduce((glContent,item)=>{
            glContent += `
                <div class="col-4">
                    <img class="img-fluid vglasses__items" data-id="${item.id}" onclick ="TryGlasses(event)" src="${item.src}">
                </div>
            `
            return glContent;
        },"")
        return content;
    }
}