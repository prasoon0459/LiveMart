class Item{
    Item(name, category, image, price, discount){
        name=this.name
        category=this.name
        image=this.image
        price=this.price
        discount=this.discount
    }

    getDiscountedPrice = ()=>{
        return this.price*(1-(this.discount/100.0))
    }
}

export default Item;