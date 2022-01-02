export class glasses {
    constructor(_id,_src,_virtualImg,_brand,_name,_color,_price,_desc)
    {
        this.id=_id;
        this.src = _src;
        this.virtualImg = _virtualImg;
        this.brand=_brand;
        this.name=_name;
        this.color=_color;
        this.price=_price;
        this.desc=_desc;
        this.status = true;//trạng thái còn hàng hay hết hàng
    }
}