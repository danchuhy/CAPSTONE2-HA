var productListResult;

function fetchProductList() {
    getProductListFromDB()
        .then(function (productList){
            productListResult = productList.data;
            renderProductListInTbl(productListResult);
        })
        .catch(function(err){
            console.log("err", err);
    });
}

fetchProductList();

// HÀM THÊM SẢN PHẨM
function addProduct(){

    var productInfor = getInfoFromAddingModal();

    // Kiểm tra tên
    var valid = validateRequiredField(productInfor.name,"#AM-nameErr", "Tên sản phẩm không được để trống") && validateNameField(productInfor.name, "#AM-nameErr", "Tên sản phẩm phải có ít nhất một ký tự chữ cái" );

    // Kiểm tra giá tiền
    valid &= 
    validateRequiredField(productInfor.price,"#AM-priceErr", "Giá sản phẩm không được để trống") && 
    validateNumberField(productInfor.price,"#AM-priceErr", "Giá sản phẩm phải là số");

    // Kiểm tra link hình
    valid &= validateRequiredField(productInfor.img,"#AM-imgErr", "Hình sản phẩm không được để trống") && 
    validateURLField(productInfor.img,"#AM-imgErr", "Hình sản phẩm phải là dạng link");
    

    // Kiểm tra màn hình
    var valid = validateRequiredField(productInfor.screen,"#AM-screenErr", "Thông tin màn hình sản phẩm không được để trống");

    // Kiểm tra mô tả
    var valid = validateRequiredField(productInfor.desc,"#AM-descErr", "Thông tin mô tả sản phẩm không được để trống");

    // Thực thi thêm sản phẩm
    if (valid){
        addNewProductToDB(productInfor)
        .then(function(){
            $('#addingModal').modal("hide");
            fetchProductList();
            resetAddingForm();
        })
        .catch(function(err){
            console.log("err", err);
        });
    }
}

//HÀM RESET FORM THÊM SẢN PHẨM
function resetAddingForm(){
    var form = document.querySelector("#addingModal");

    // reset các thẻ input
    var inputFields = form.getElementsByTagName("input");
    for (var i = 0; i < inputFields.length; i++){
        inputFields[i].value = ""
    }

    // reset các thẻ span
    var errTexts = form.getElementsByClassName("errText");
    for (var i = 0; i < errTexts.length; i++){
        errTexts[i].innerHTML = ""
    }
}

//HÀM CHỈNH SỬA SẢN PHẨM
// Mở modal edit
function editProduct(id){
    getProductByIdFromDB(id)
        .then(function(res){
            var productInfor = res.data

            $('#editingModal').modal("show");
            document.querySelector("#EM-id").value = productInfor.id;
            document.querySelector("#EM-name").value = productInfor.name;
            document.querySelector("#EM-price").value = productInfor.price;
            document.querySelector("#EM-screen").value = productInfor.screen;
            document.querySelector("#EM-backCamera").value = productInfor.backCamera;
            document.querySelector("#EM-frontCamera").value = productInfor.frontCamera;
            document.querySelector("#EM-img").value = productInfor.img;
            document.querySelector("#EM-desc").value = productInfor.desc;
            document.querySelector("#EM-type").value = productInfor.type;
                    
        })
        .catch(function(err){
            console.log("err", err);
        });

}

// HÀM UPDATE SẢN PHẨM
function updateProduct() {
    var productInfor = getInfoFromEditingModal();
    console.log('productInfor', productInfor);

    updateProductByIdFromDB(productInfor.id, productInfor)
      .then(function (res) {
        $("#editingModal").modal("hide");
        fetchProductList();
      })
      .catch(function (err) {
        console.log("err", err);
      });
  }

// HÀM XOÁ SẢN PHẨM
function delProduct(id){
    delProductByIdFromDB(id)
        .then(function(){
            fetchProductList();
         })
        .catch(function(err){
            console.log("err", err);
         });
};  

//HÀM TÌM KIẾM
function searchProductByName(){
    var keyword = document.querySelector('#txtSearch').value.trim()?.toLowerCase();

    getProductListFromDB()
    .then(function(res){

        // array data
        var productsList = res.data;

        //tìm kiếm tên người dùng nhập
        productListResult = productsList.filter(function (productInfor) {
        return productInfor.name.toLowerCase().includes(keyword);
      });

      //render lại kết quả tìm thấy
      renderProductListInTbl(productListResult);
    })
    .catch(function(err){
        console.log("err", err);
    });
}

//TÌM KIẾM KHI ẤN ENTER
document.querySelector('#txtSearch').addEventListener('keydown', function(event){
    if(event.key !== "Enter") return;
    searchProductByName()
})

// SORT BY PRICE INCREASING
function sortByPriceIncreasing(){
    productListResult = productListResult.sort(function (a, b){
        return a.price-b.price;
    });
    renderProductListInTbl(productListResult);
}

// SORT BY PRICE DECREASING
function sortByPriceDecreasing(){
    productListResult = productListResult.sort(function (a, b){
        return b.price-a.price;
    });
    renderProductListInTbl(productListResult);
}

// SORT BY ID INCREASING
function sortByIdIncreasing(){
    productListResult = productListResult.sort(function (a, b){
        return a.id-b.id;
    });
    renderProductListInTbl(productListResult);
}


function checkSortByField(){
    if (document.querySelector('#sortByField').value === "default"){
        sortByIdIncreasing();
    }
    if (document.querySelector('#sortByField').value === "priceIncrease"){
        sortByPriceIncreasing();
    }
    if (document.querySelector('#sortByField').value === "priceDecrease"){
        sortByPriceDecreasing();
    }
}




