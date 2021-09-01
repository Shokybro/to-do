const addNew = document.getElementById("h1");
const input = document.getElementById("input");
const form = document.getElementById("form");
const listss = document.querySelector("ul");
const elert = document.querySelector(".alert");

loadEvents();

elert.classList.add("hide")

function loadEvents() {
    document.addEventListener("DOMContentLoaded", getProducts)
    addNew.addEventListener("click", addI);
    form.addEventListener("submit", getInput) 
    listss.addEventListener("click", comp)
}

function getProducts() {
    const stuff = getProductFromStorage();
    stuff.forEach(function(p) {
        addProduct(p)
    })
}

function addI(e) {
    let val;
    val = e.target
    if (input.style.display == "none" && e.target.classList.contains("fa-plus")) {
        input.style.display = "block"
    }
    else {
        input.style.display = "none"
    }
}
function getInput(e) {
    e.preventDefault();
    let val = input.value.trim();
    if (val.length > 0) {
        
        if(hasProduct(val)) {
            showelert();
        }
        else {
            addProduct(input.value)
            addToStorage(input.value)
        }
    }

    input.value = "";
}

function showelert() {
    elert.classList.remove("hide")
    elert.textContent = "Mahsilot yozilgan";
    setTimeout(function () {
        elert.classList.add("hide")
    }, 3000)
}

function hasProduct (e) {
    const allProduct = Array.from(listss.children);
    // console.log(allProduct);
    const product = allProduct.map(function (pro) {
        return pro.textContent;
    })
    return product.includes(e);
}

function addProduct(e) {
    const list = document.createElement("li");
    const removeItem = document.createElement("span");
    list.style.cursor = "pointer"
    list.textContent = e;
    list.className = "li";
    // removeItem.textContent = "x"
    removeItem.className = "fa fa-trash";
    list.appendChild(removeItem);
    listss.appendChild(list);

    removeList(removeItem, listss, list);
}
function removeList(e, v, n) {
    e.addEventListener("click", function () {
        v.removeChild(n);
        removeProductFromStorage(n.textContent);
    })
}
function comp(e) {
    e.target.classList.toggle("through");
}

function getProductFromStorage() {
    if (localStorage.getItem("product")) {
        return JSON.parse(localStorage.getItem("product"))
    }
    else {
        return [];
    }
}

function addToStorage (product) {
    let products = getProductFromStorage();
    products.push(product);

    putToStorage(products)
}

function putToStorage(products) {
    localStorage.setItem("product", JSON.stringify(products))
}

function removeProductFromStorage (pro) {
    let product = getProductFromStorage();
    let proIndex = product.indexOf(pro);
    product.splice(proIndex, 1);
    putToStorage(product);
}