function renderProductListInTbl(productList){
    var content = '';
    for (var i = 0; i < productList.length; i++){
        var product = productList[i];
        var contentTR = `
        <tr>
            <td>${product.id}</td>
            <td>
                <img style="width:64px" src="${product.img}">
            </td>
            <td>${product.name}</td>
            <td>${(1*product.price).toLocaleString()}</td>
            <td>${product.type}</td>
            <td>${product.screen}</td>
            <td>${product.backCamera}</td>
            <td>${product.frontCamera}</td>
            <td>${product.desc}</td>

            <td>
                <row>
                    <button class="btn btn-light" onclick="editProduct(${product.id})" data-toggle="modal" data-target="#editingModal">
                        <i class="fa-regular fa-pen-to-square"></i>
                    </button>

                    <button class="btn btn-light" onclick="delProduct(${product.id})">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </row>

            </td>
        </tr>
        `;
        content += contentTR;
    }

    // In danh sach ra giao dien
    document.querySelector("#tblDanhSachSP").innerHTML = content;
}

function getInfoFromAddingModal(){
    var name = document.querySelector("#AM-name").value;
    var price = document.querySelector("#AM-price").value;
    var screen = document.querySelector("#AM-screen").value;
    var backCamera = document.querySelector("#AM-backCamera").value;
    var frontCamera = document.querySelector("#AM-frontCamera").value;
    var img = document.querySelector("#AM-img").value;
    var desc = document.querySelector("#AM-desc").value;
    var type = document.querySelector("#AM-type").value;

    return new Product('', name, price, screen, backCamera, frontCamera, img, desc, type);
}

function getInfoFromEditingModal(){
    var id = document.querySelector("#EM-id").value;
    var name = document.querySelector("#EM-name").value;
    var price = +document.querySelector("#EM-price").value;
    var screen = document.querySelector("#EM-screen").value;
    var backCamera = document.querySelector("#EM-backCamera").value;
    var frontCamera = document.querySelector("#EM-frontCamera").value;
    var img = document.querySelector("#EM-img").value;
    var desc = document.querySelector("#EM-desc").value;
    var type = document.querySelector("#EM-type").value;

    return new Product(id, name, price, screen, backCamera, frontCamera, img, desc, type);
}