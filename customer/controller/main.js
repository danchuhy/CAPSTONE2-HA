import productService from "../../customer/service/productService.js";
// window.productService = productService ;
var dssp = new DSSP();

function getElement(selector) {
    return document.querySelector(selector);
}


function renderProduct() {
    let productList = document.getElementById('product_list');
    if (productList) {
        productService.getAllProducts().then((res) => {
            let arrSP = localStorage.getItem('DSSP')
            let parseData = JSON.parse(arrSP)
            let badgeCart = getElement('.badgeCart');
            if (arrSP != null) {
                badgeCart.innerHTML = parseData.length;
            }

            let content = '';

            content = contentLoopProduct(res, content)

            productList.innerHTML = content;
        })
            .catch(() => {
                alert('Hiển thị sản phẩm thất bại')
            })
    }

}
renderProduct()


getLocalStorage()

function setLocalStorage() {
    var data = JSON.stringify(dssp.arrSP)
    console.log("data: ", data);

    localStorage.setItem("DSSP", data)
}
function getInfoCart(sp, vlQuantity) {//sp data lấy từ promise api

    // tạo đối tượng sinh viên từ thông tin lấy từ user

    var product = new Product(
        sp.id,
        sp.img,
        sp.name,
        vlQuantity,
        sp.price
    )
    return product;

}
// get danh sách sinh viên từ localStorage
function getLocalStorage() {
    //B1: lấy data từ local
    var data = localStorage.getItem('DSSP') // null
    // console.log(data);
    if (data) {

        //B2: parse data về kiểu dữ liệu ban đầu
        var parseData = JSON.parse(data)

        // Tạo lại đối tượng sinhVien từ lớp đối SinhVien để lấy lại phương thức tinhDTB
        //B1: tạo mảng rỗng để lưu dssv
        var arr = []

        // B2: duyệt mảng đc lấy từ local
        for (var i = 0; i < parseData.length; i++) {
            var sp = parseData[i]
            // tạo lại đối tượng sv từ lớp đối tượng SV
            var product = new Product(
                sp.id,
                sp.hinhAnh,
                sp.name,
                sp.quantity,
                sp.price,
                sp.screen,
                sp.backCamera,
                sp.frontCamera,
                sp.desc
            )
            // thêm sinhVien vào mảng arr
            arr.push(product)
        }
        // gán giá trị cho mảng arrSV từ data lấy từ localStorage
        dssp.arrSP = arr; //arrSV mảng ở DSNV


    }
}



// localStorage.clear();

window.handAddProductCart = handAddProductCart
function handAddProductCart(id) {
    productService.getOneProduct(id).then((res) => {
        getElement(` .btnCloseModal${id} `).click()
        let data = res.data
        var quantityID = getElement(`.quantitySP${id}`)
        var quantity = quantityID.value * 1
        let product = getInfoCart(data, quantity)

        //B1: lấy data từ local
        var dataStorage = localStorage.getItem('DSSP') // null
        // console.log(dataStorage);

        if (dataStorage) {

            //B2: parse data về kiểu dữ liệu ban đầu
            var parseData = JSON.parse(dataStorage)
            // debugger
            let trungId = 0
            if (parseData.length > 0) {
                let arr1 = []
                for (let d = 0; d < parseData.length; d++) {
                    // debugger
                    arr1 = parseData[d]
                    console.log(data.id, arr1);

                    if (data.id === arr1.id) {
                        console.log('id hiện tại bằng id local');
                        arr1.quantity += parseInt(quantityID.value)

                        product = getInfoCart(data, arr1.quantity)// thêm vào đối tượng Product
                        dssp.updateProduct(product);// update sp(quanlity) vào giỏ hàm trong
                        trungId = 0
                        break
                    } else {
                        quantity = quantity
                        console.log("quantity else: ", quantity);
                        trungId = -1
                    }
                }
                if (trungId === -1) {
                    console.log('addd');
                    product = getInfoCart(data, quantity)
                    dssp.addProduct(product);// add thêm sp vào giỏ
                    // return
                }
            } else {
                product = getInfoCart(data, quantity)
                dssp.addProduct(product);// add thêm sp vào giỏ
            }
        } else {
            product = getInfoCart(data, quantity)
            dssp.addProduct(product);// add thêm sp vào giỏ
        }




        renderProduct();
        // cập nhật data local
        setLocalStorage()
    })


}



// cart 
function renderListProduct(arrSP = localStorage.getItem('DSSP')) {
    // console.log("arrSP: ", arrSP);
    let tbody = getElement('#tableDanhSach')
    let tfoot = getElement('#totalPrice')
    let table = getElement('table')
    let contentHdId = getElement('#content-hd')

    let totalPrice = 0;

    if (tbody) {


        let parseData = JSON.parse(arrSP)
        // console.log("parseData: ", parseData);
        let content = '';
        let contentHD = '';
        console.log();
        let badgeCart = getElement('.badgeCart');

        if (arrSP != null) {
            badgeCart.innerHTML = parseData.length;


            parseData.map((data) => {

                totalPrice += data.price * data.quantity
                console.log('totalPrice',totalPrice);
                content += `<tr>
                    <td>
                        <div onclick="deleteSP('${data.id}')">
                            <i class='fa-solid fa-trash text-danger'></i>
                        </div>
                    </td>
                    <td>
                        <img src="${data.hinhAnh}" class='img-fluid rounded' style=" width: 70px ;" alt='' />
                    </td>
                    <td>${data.name}</td>
                    <td>${(1*data.price).toLocaleString()}</td>
                    <td>
                        <span onclick="subQuanlity(${data.id})" class="btn btn-info fw-bold ">-</span>
                        <span class="px-2">${data.quantity}</span>
                        <input  class="quanlityCart " type='hidden' value='${data.quantity}' min='1' style=" width: 4rem ;" />
                        <span onclick="addQuanlity(${data.id})" class="btn btn-info fw-bold ">+</span>
                    </td>
                    <td>${(data.price * data.quantity).toLocaleString()}</td>
                    
                </tr> `;



            })
            contentHD = `
            <h2>Thanh toán</h2>
            <p>Tổng tiền hàng : ${totalPrice.toLocaleString()}</p>
            <p>Thanh toán khi nhận hàng</p>
            <button class="btn btn-primary" onclick="thanhToan()">Thanh toán</button>
    `
            tbody.innerHTML = content;
            tfoot.innerHTML = totalPrice.toLocaleString();
            contentHdId.innerHTML = contentHD;
        } 
        if (totalPrice === 0) {
             table.innerHTML = `
                                <h2>Không có sản phẩm trong giỏ hàng</h2>
                                `;
        }
           
        

        // if (content === '') {
        //     localStorage.removeItem('DSSP')
        // }
    }
}
renderListProduct()


window.deleteSP = deleteSP
function deleteSP(xoaSP) {
    dssp.deleteProduct(xoaSP);
    setLocalStorage();
    renderListProduct();

}


window.addQuanlityPro = (id) => {

    parseInt(getElement(`.quantitySP${id}`).value++);
    getElement(`.labelQuanlity${id}`).innerHTML = getElement(`.quantitySP${id}`).value
}
window.subQuanlityPro = (id) => {
    let quan = +getElement(`.quantitySP${id}`).value;
    if (quan > 1) {
        parseInt(getElement(`.quantitySP${id}`).value--);
        getElement(`.labelQuanlity${id}`).innerHTML = getElement(`.quantitySP${id}`).value
    }
}
window.addQuanlity = (id) => {

    let arrSp = localStorage.getItem('DSSP')
    // console.log("arrSp: ", arrSp);
    let parseData = JSON.parse(arrSp)
    // console.log("parseData: ", parseData);
    for (let i = 0; i < parseData.length; i++) {
        let cartId = +parseData[i].id
        if (id === cartId) {
            parseData[i].quantity = parseData[i].quantity + 1
            dssp.updateProduct(parseData[i])
            // cập nhật data local
            setLocalStorage()
            renderListProduct()
            break
        }
    }
}
window.subQuanlity = (id) => {

    let arrSp = localStorage.getItem('DSSP')
    // console.log("arrSp: ", arrSp);
    let parseData = JSON.parse(arrSp)
    // console.log("parseData: ", parseData);
    for (let i = 0; i < parseData.length; i++) {
        let cartId = +parseData[i].id
        if (id === cartId) {
            parseData[i].quantity = parseData[i].quantity - 1
            dssp.updateProduct(parseData[i])
            // cập nhật data local
            setLocalStorage()
            renderListProduct()
            break
        }
    }
}


window.thanhToan = () => {
    localStorage.removeItem('DSSP')
    location.reload();
}


getElement('#selectType').onchange = () => {
    let valSelect = getElement('#selectType').value
    let productList = document.getElementById('product_list');

    console.log("valSelect: ", valSelect);
    if (valSelect === '') {
        renderProduct()
    } else {
        productService.getAllProductsOfType(valSelect).then((res) => {
            // console.log(res.data);
            let content = '';
            content = contentLoopProduct(res, content)
            productList.innerHTML = content;
        })
        .catch(() => {
            alert('Hiển thị sản phẩm thất bại')
        })
    }
}

window.handleSearch = () => {
    let valueSearch = getElement('#formSearch').value ;
    let productList = document.getElementById('product_list');
    
        productService.getProductOfName(valueSearch).then((res) => {
            // console.log(res.data);
            let content = '';
            content = contentLoopProduct(res, content)
            productList.innerHTML = content;
        })
        
}

const contentLoopProduct = (res, content) => { // 

    res.data.map((data) => {
        content += `<div class=" card_product ">
        <div class="p-2 border bg-success bg-opacity-25 rounded-2">
            <div class="product-img">
                <img style="max-height:210px;object-fit: contain;" class="card-img-top"
                    src="${data.img}"
                    alt="">
            </div>
            <div class="product-body p-3">
                <h4 class="product-title fw-bold fs-4 text-black">${data.name}</h4>
                <p class="fs-5 text-danger fw-bold">${(1*data.price).toLocaleString()} VNĐ</p>
                <div class="d-flex justify-content-evenly">
                    <button class="btn btn-primary text-white fw-bold" data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop${data.id}"><i
                            class="fa-regular fa-eye me-2 fw-bold"></i>Xem thêm</button>
                    <button onclick="handAddProductCart('${data.id}')"
                        class="btn_addToCart btn btn-outline-warning d-block  border border-3 border-warning py-2">
                        <span class="text-black fw-bold"><i
                                class="fa-solid fa-cart-shopping"></i> Add</span>
                    </button>
                </div>
                <!-- Modal -->
                <div class="modal fade" id="staticBackdrop${data.id}" data-bs-backdrop="static"
                    data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdrop${data.id}Label"
                    aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-4" id="staticBackdrop${data.id}Label">Chi tiết
                                    sản phẩm</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class='container mt-5'>
                                    <div class='productGroup row'>
                                        <div class='productImage col-sm-12 col-md-5 col-lg-6'>
                                            <img src="${data.img}"
                                                alt='' class='img-fluid productImg' />
                                            <div class='mt-4 productDescr'>
                                                <hr />

                                               

                                            </div>
                                        </div>

                                        <div class='productInfo col-sm-12 col-md-5 col-lg-6'>
                                            <h2>${data.name}</h2>
                                            <div class=''>
                                                <p class='text-danger fw-bold text-danger fs-2'>
                                                ${(1*data.price).toLocaleString()}</p>
                                                <div class='star text-warning my-3'>
                                                    <i class='fas fa-star'></i>
                                                    <i class='fas fa-star'></i>
                                                    <i class='fas fa-star'></i>
                                                    <i class='fas fa-star'></i>
                                                    <i class='fas fa-star'></i>
                                                </div>
                                            </div>
                                            <div class=''>
                                                <p>- Mã sản phẩm: ${data.id}</p>
                                                <p>- Camera sau: ${data.backCamera}</p>
                                                <p>- Camera Trước: ${data.frontCamera}</p>
                                                <p>- Màn hình: ${data.screen}</p>
                                                <p>- Mô tả sản phẩm: ${data.desc}</p>
                                            </div>

                                            <hr>
                                            </hr>

                                            <h5 class='mt-4'>Số Lượng</h5>
                                            <span onclick="subQuanlityPro(${data.id})" class="btn btn-info fw-bold ">-</span>
                                            <span class="px-2 labelQuanlity${data.id}">1</span>
                                            <input  type='hidden' class='p-3 quantitySP${data.id}' min="1" value="1" />
                                            <span onclick="addQuanlityPro(${data.id})" class="btn btn-info fw-bold ">+</span>

                                           

                                            <div class='mt-4'>
                                                <div id="btnThemSPCart"  class="btn btn-danger fw-bold py-3"  onclick="handAddProductCart('${data.id}')" >
                                                    Thêm vào giỏ hàng
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary btnCloseModal${data.id}"
                                    data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> `
    })

    return content;
}
