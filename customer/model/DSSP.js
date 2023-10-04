function DSSP() {
    // 
    this.arrSP = []

    this.addProduct = function (pro) {
        this.arrSP.push(pro);

    }
   
    this.getAllProductById = function (productId) {
        for (var i = 0; i < this.arrSP.length; i++) {
            var proId = this.arrSP[i].id
            if (proId === productId) {
                return i;
            }
        }
        return -1
    } 
    this.updateProduct = function ( SP ) {
        var index = this.getAllProductById( SP.id )
        if (index !== -1) {
            this.arrSP[index] = SP ;
        }
    }
    this.deleteProduct = function (r) {
        var index = -1;
        // console.log(this.arrSP);
        // Tìm index sp cần xóa
        for (var i = 0; i < this.arrSP.length; i++) {
            var proId = this.arrSP[i].id
            if (proId === r+'') {
                index = i;
            }
        }
        if (index !== -1) {
            this.arrSP.splice(index,1);
        }
    }
}