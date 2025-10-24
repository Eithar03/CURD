var prodactNameInput = document.getElementById("productName")
var prodactPriceInput = document.getElementById("productPrice")
var prodactCategoryInput = document.getElementById("productCategory")
var prodactDescriptionInput = document.getElementById("productDescription")
var prodactImageInput = document.getElementById("productImage")
var addBTN = document.getElementById("addBtn")
var updateBtn = document.getElementById("updateBtn")
var searchInputs = document.getElementById("prodctSearchInput")

var temp
var products = []

var regex = {
    productName: {
        value: /^[A-Z][a-z]{2,10}$/,
        isValid: false
    },
    productPrice: {
        value: /^([1-9][0-9]|100)$/,
        isValid: false
    },

    productCategory: {
        value: /^(tv|mobile|screen|laptop)$/i,
        isValid: false
    },

    productDescription: {
        value: /^[A-Za-z0-9\s.,'-]{5,100}$/,
        isValid: false
    },


    prodactImageInput: {
        value: /(\.jpg|\.jpeg|\.png|\.gif)$/i,
        isValid: false
    },


}

if (localStorage.getItem("products") !== null) {
    products = JSON.parse(localStorage.getItem("products"))
    displayProducts(products)
}

function addProduct() {
    var product = {
        id: products.length,
        name: prodactNameInput.value,
        price: prodactPriceInput.value,
        category: prodactCategoryInput.value,
        description: prodactDescriptionInput.value,
        image: prodactImageInput.files[0]?.name

    }
    products.push(product)
    displayProducts(products)
    localStorage.setItem("products", JSON.stringify(products))
    clearForm()
    addBTN.disabled = true;
}


function displayProducts(list) {


    var cartona = ''
    for (var i = 0; i < list.length; i++) {

        if (list[i] == null) {
            continue
        }


        if (searchInputs.value == "") {
            list[i].newName = null
        }


        cartona += `
                <tr>
                    <th scope="row">${i + 1}</th>
                    <td><img src="images/${list[i].image ? list[i].image : "empty_image.jpg"}" style="width : 50px" alt=""></td>
                    <td>${list[i].newName ? list[i].newName : list[i].name}</td>
                    <td>${list[i].price}</td>
                    <td>${list[i].category}</td>
                    <td>${list[i].description}</td>
                    <td>
                    <div class="action-buttons">
                    <button onclick = " deletProduct (${list[i].id})" class="btn btn-danger"><i class="fa-solid fa-trash"></i>Delete</button>
                    <button onclick = " fillUpdateInputs (${i})" class="btn btn-success"><i class="fa-solid fa-pen-to-square"></i>Update</button>
                    </div>
                    </td>
                </tr>
    `
    }

    document.getElementById("myBody").innerHTML = cartona
}

function deletProduct(id) {
    // products.splice(index, 1)
    // displayProducts(products)
    // localStorage.setItem("products", JSON.stringify(products))
    //         for (var i = 0; i < products.length; i++){
    //             if (id == products[i].id) {
    //                 products.splice(i, 1)
    //                 displayProducts(products)
    //                 localStorage.setItem("products", JSON.stringify(products))
    //                 break
    //             }
    //         }

    products[id] = null

    displayProducts(products)
    localStorage.setItem("products", JSON.stringify(products))
}

function fillUpdateInputs(index) {
    temp = index
    prodactNameInput.value = products[index]?.name
    prodactPriceInput.value = products[index]?.price
    prodactDescriptionInput.value = products[index]?.description
    prodactCategoryInput.value = products[index]?.category
    addBTN.classList.add("d-none")
    updateBtn.classList.replace("d-none", "d-block")

}


function updateProduct() {
    products[temp].name = prodactNameInput.value
    products[temp].price = prodactPriceInput.value
    products[temp].description = prodactDescriptionInput.value
    products[temp].category = prodactCategoryInput.value
    products[temp].image = prodactImageInput.files[0]?.name || products[temp].image


    displayProducts(products)
    localStorage.setItem("products", JSON.stringify(products))
    addBTN.classList.replace("d-none", "d-block")
    updateBtn.classList.replace("d-block", "d-none")
    clearForm()
}

function clearForm() {
    prodactNameInput.value = ''
    prodactPriceInput.value = ''
    prodactDescriptionInput.value = ''
    prodactCategoryInput.value = ''
    prodactImageInput.value = ''
    prodactNameInput.classList.remove("is-valid")
    prodactPriceInput.classList.remove("is-valid")
    prodactCategoryInput.classList.remove("is-valid")
    prodactDescriptionInput.classList.remove("is-valid")
    prodactImageInput.classList.remove("is-valid")


}

function searchProducts(term) {
    if (term == "") {
        displayProducts(products)
        return
    }
    var searchItems = []
    for (var i = 0; i < products.length; i++) {
        if (products[i]?.name.toLowerCase().includes(term.toLowerCase())) {
            products[i].newName = products[i]?.name.replace(term, `<span class = "text-danger">${term}</span>`)
            searchItems.push(products[i])
        }

    }

    displayProducts(searchItems)
}

// function validateProductInput () {
//   var regex = /^[A-Z][a-z]{2,10}$/
//   if(regex.test(prodactNameInput.value)) {
//     prodactNameInput.classList.add("is-valid")
//     prodactNameInput.classList.remove("is-invalid")
//   } else {
//     prodactNameInput.classList.add("is-invalid")
//     prodactNameInput.classList.remove("is-valid")
//   }


//   if(prodactNameInput.value == "") {
//     prodactNameInput.classList.remove("is-invalid")
//   }
// }

function validateProductInputs(element) {

    if (regex[element.id].value.test(element.value)) {
        element.classList.add("is-valid")
        element.classList.remove("is-invalid")
        regex[element.id].isValid = true

        element.nextElementSibling.classList.replace("d-block", "d-none")
    } else {
        element.classList.add("is-invalid")
        element.classList.remove("is-valid")
        regex[element.id].isValid = false

        element.nextElementSibling.classList.replace("d-none", "d-block")
    }
    if (element.value == "") {
        element.classList.remove("is-invalid")
    }
    toggleAddBtn()
    toggleUpdateBtn()
}

function toggleAddBtn() {
    if (regex.productName.isValid == true
        && regex.productCategory.isValid == true
        && regex.productPrice.isValid == true
        && regex.productDescription.isValid == true

    ) {
        addBTN.disabled = false
    } else {
        addBTN.disabled = true
    }
}

function toggleUpdateBtn() {
    if (regex.productName.isValid == true
        && regex.productCategory.isValid == true
        && regex.productPrice.isValid == true
        && regex.productDescription.isValid == true

    ) {
        updateBtn.disabled = false
    } else {
        updateBtn.disabled = true
    }
}


