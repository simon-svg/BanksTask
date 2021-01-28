// function for developer
function create(what, where) {
    let elem = document.createElement(what);
    where.append(elem);
    return elem;
}







// localStorage set lang
const langArm = document.querySelector(".header__lang_arm");
const langEng = document.querySelector(".header__lang_eng");

if (!localStorage.getItem("lang")) {
    localStorage.setItem("lang", "Arm");
}
langArm.addEventListener("click", () => {
    localStorage.setItem("lang", "Arm");
    location.reload();
})
langEng.addEventListener("click", () => {
    localStorage.setItem("lang", "Eng");
    location.reload();
})









const buy = document.querySelectorAll(".buy");
const sell = document.querySelectorAll(".sell");
const trBank = document.querySelector(".tr-bank");
const trDate = document.querySelector(".tr-date");
const converterHeader = document.querySelector(".converter__header_name");
const Conversebank = document.querySelector(".conversebank");
const HSBC = document.querySelector(".HSBC");
const currencysTitle = document.querySelectorAll(".converter__currencys_title");

if (localStorage.getItem("lang") == "Arm") {
    trBank.innerHTML = "Բանկ";
    trDate.innerHTML = "Ամսաթիվ";
    buy.forEach((item, i) => {
        item.innerHTML = "Առք";
        sell[i].innerHTML = "Վաճ";
    })
    converterHeader.innerHTML = "Արտարժույթի հաշվիչ";
    Conversebank.innerHTML = "Կոնվերս Բանկ";
    HSBC.innerHTML = "Էյչ-Էս-Բի-Սի Բանկ";
    currencysTitle[0].innerHTML = "Ունեմ";
    currencysTitle[1].innerHTML = "Ցանկանում եմ";
}
else if (localStorage.getItem("lang") == "Eng") {
    trBank.innerHTML = "Bank";
    trDate.innerHTML = "Date";
    buy.forEach((item, i) => {
        item.innerHTML = "Buy";
        sell[i].innerHTML = "Sell";
    })
    converterHeader.innerHTML = "Currency Converter";
    Conversebank.innerHTML = "Conversebank";
    HSBC.innerHTML = "HSBC";
    currencysTitle[0].innerHTML = "I have";
    currencysTitle[1].innerHTML = "I want";
}





// fetch request
const selectsBuySell = document.querySelectorAll(".select-buy-sell");
const table = document.querySelector(".app__table");
const tbody = document.querySelector(".app__tbody");
const banks = {

}

function fetchReq() {
    fetch('src/js/Banks.json')
        .then(response => response.json())
        .then((data) => {
            data.forEach((item) => {
                banks[item.name["name-eng"]] = [];
                const tr = create("tr", tbody);
                tr.setAttribute("class", "app__table_tr");
                for (let key in item) {
                    if (typeof (item[key]) !== "object") {
                        const td = create("td", tr);
                        td.innerHTML = item[key]
                    }
                    else {
                        if (key == "name") {
                            for (let key1 in item[key]) {
                                if (localStorage.getItem("lang") == "Arm") {
                                    if (key1 == "name-arm") {
                                        const td = create("td", tr);
                                        td.innerHTML = item[key][key1]
                                    }
                                }
                                else if (localStorage.getItem("lang") == "Eng") {
                                    if (key1 == "name-eng") {
                                        const td = create("td", tr);
                                        td.innerHTML = item[key][key1]
                                    }
                                }
                            }
                        }
                        else if (key == "date") {
                            for (let key1 in item[key]) {
                                if (localStorage.getItem("lang") == "Arm") {
                                    if (key1 == "date-arm") {
                                        const td = create("td", tr);
                                        td.innerHTML = item[key][key1]
                                    }
                                }
                                else if (localStorage.getItem("lang") == "Eng") {
                                    if (key1 == "date-eng") {
                                        const td = create("td", tr);
                                        td.innerHTML = item[key][key1]
                                    }
                                }
                            }
                        }
                        else {
                            let objectArr = Object.keys(item[key]);
                            selectsBuySell.forEach((elem, i) => {
                                objectArr.forEach((elemj) => {
                                    if (elemj == `${selectsBuySell[i].value}-B` || elemj == `${selectsBuySell[i].value}-S`) {
                                        const td = create("td", tr);
                                        td.setAttribute("class", "currencies__td buy-sell");
                                        td.innerHTML = item[key][elemj];
                                    }
                                })
                            })
                            banks[item.name["name-eng"]].push(item[key]);
                        }
                    }
                }
            });
        });
        document.querySelector(".loader").style.display = "none";
        table.style.display = "table";
}
fetchReq()






if (!localStorage.getItem("select0")) {
    localStorage.setItem("select0", "USD")
}
if (!localStorage.getItem("select1")) {
    localStorage.setItem("select1", "RUB")
}
if (!localStorage.getItem("select2")) {
    localStorage.setItem("select2", "EUR")
}
if (!localStorage.getItem("select3")) {
    localStorage.setItem("select3", "GBP")
}

selectsBuySell.forEach((item, i) => {
    item.value = localStorage.getItem(`select${i}`)
    item.addEventListener("change", () => {
        localStorage.setItem(`select${i}`, item.value);
        location.reload()
    })
})







// converter inputs
const converterBanks = document.querySelector(".converter__banks");
const converterInp = document.querySelectorAll(".converter__inp");
const currencyHave = document.querySelector(".converter__currency_have");
const currencyWant = document.querySelector(".converter__currency_want");

function inputHaveFunc() {
    for (key in banks) {
        if (converterBanks.value == key) {
            let values = banks[key][0];
            for (value in values) {
                if (currencyHave.value == currencyWant.value) {
                    converterInp[1].value = converterInp[0].value;
                    return
                }
                else if(currencyHave.value == "AMD"){
                    converterInp[1].value = converterInp[0].value / values[`${currencyWant.value}-B`];
                }
                else if (value == `${currencyHave.value}-B`) {
                    if (currencyWant.value == "AMD") {
                        converterInp[1].value = converterInp[0].value * values[value];
                    }
                    else {
                        let summ1 = (converterInp[0].value * values[`${currencyHave.value}-B`])
                        let summ2 = values[`${currencyWant.value}-B`]
                        converterInp[1].value = summ1 / summ2;
                    }
                }
            }
        }
    }
}
function inputWantFunc() {
    for (key in banks) {
        if (converterBanks.value == key) {
            let values = banks[key][0];
            for (value in values) {
                if (currencyHave.value == currencyWant.value) {
                    converterInp[0].value = converterInp[1].value;
                    return
                }
                else if(currencyHave.value == "AMD"){
                    converterInp[0].value = converterInp[1].value * values[`${currencyWant.value}-B`];
                }
                else if (value == `${currencyWant.value}-B`) {
                    if (currencyHave.value == "AMD") {
                        converterInp[0].value = converterInp[1].value / values[value];
                    }
                    else {
                        let summ1 = (converterInp[1].value * values[`${currencyWant.value}-B`])
                        let summ2 = values[`${currencyHave.value}-B`]
                        converterInp[0].value = summ1 / summ2;
                    }
                }
            }
        }
    }
}


converterInp[0].addEventListener("input", inputHaveFunc)
converterInp[1].addEventListener("input", inputWantFunc)

converterBanks.addEventListener("change", () => {
    inputHaveFunc()
    inputWantFunc()
})
currencyHave.addEventListener("change", () => {
    inputHaveFunc()
    inputWantFunc()
})
currencyWant.addEventListener("change", () => {
    inputHaveFunc()
    inputWantFunc()
})