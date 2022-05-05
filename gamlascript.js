//Einar Árni Bjarnason 2022-04-28
let listi = [
    {
        "artname": "Eldfjall",
        "creator": "Stefán Örn Lárusson",
        "date": "2022-04-28",
        "price": 2000,
        "url": "images/eldgos.jpeg"
    },
    {
        "artname": "Boat",
        "creator": "Máni Gíslason",
        "date": "2021-03-13",
        "price": 1500,
        "url": "images/boat.jpeg"
    },
    {
        "artname": "War",
        "creator": "Snorri Björnsson",
        "date": "2020-11-09",
        "price": 3500,
        "url": "images/war.jpeg"
    },
    {
        "artname": "Money",
        "creator": "Alexander Aron Gilbertsson",
        "date": "2018-01-19",
        "price": 10000,
        "url": "images/money.jpeg"
    },
    {
        "artname": "Iceland",
        "creator": "Ólafur Ragnar Grímsson",
        "date": "2016-09-30",
        "price": 510,
        "url": "images/iceland.jpeg"
    }
]

//Skilgreina tala, og notandi
let tala = 0;
let users = []; 
//Selecta input og output query
let i = document.querySelector('input'),
    o = document.querySelector('output');
//Selecta templatið og spilinn
let userCardTemplate = document.querySelector("[data-user-template]"),
    userCardContainer = document.querySelector("[data-user-cards-container]");
//Selecta data-search fyrir searchinput
let searchInput = document.querySelector("[data-search]")

//Hérna finn ég út hvað er min og max price-inn af listanum
let min = Math.min.apply(null, listi.map(item => item.price)),
    max = Math.max.apply(null, listi.map(item => item.price));
//Hérna er ég að setja nýtt nafn á min og max
//o.innerHTML er ég að setja in töluna beint fyrir neðan í upphaf síðunar
i.min = min;
i.max = max;
o.innerHTML = i.value;


//Hérna sortera ég listann 
let listi_sorted = listi.sort(function (a, b) {
    return a.price - b.price;
});

// Event listener af sliderinum til að hlusta hvað inputið er
i.addEventListener('input', function () {
    let tala = i.value;
    o.innerHTML = tala;
    //Hérna er ég að pusha slider valuinu í funtionið
    show(tala)
//    console.log(users)
}, false);





//Function
function show(verd){
    let showprice = listi_sorted.map(listinn => listinn.price <= verd);
    //console.log("hello Wordl",showprice)
    for(let i = 0; i < users.length; i++){
        //console.log(users[i])
        //console.log(userCardContainer[i])
        if(showprice[i] == true){
            users[i].element.classList.remove("hide")
        }else{
            users[i].element.classList.add("hide");
        }
    }
    
    for(let i = 0; i < listi_sorted.length; i++){
        let date = new Date(listi_sorted[i].date)
        let min = new Date(dateSearchStart.min)
        let max = new Date(dateSearchStart.max)
        if(date.getTime() >= min.getTime() && date.getTime() >= max.getTime()){
            users[i].element.classList.remove("hide");
        }else{
            users[i].element.classList.add("hide");
        }
    }
    //console.log("hello", showdate)
    
}
//Hérna er ég að telja öll stök í listanum og set það inní users
users = listi_sorted.map(user => {
    let card = userCardTemplate.content.cloneNode(true).children[0] //Hérna er ég að skilgreina card og það verður templatið
    let aname = card.querySelector("[data-artname]") //vel artname og það heitir aname
    let c = card.querySelector("[data-creator]") //vel höfundinn og það verður creator
    let p = card.querySelector("[data-price]") //vel verðið og það verður p
    let i = card.querySelector("[data-image]") //vel myndina og það verður i
    let d = card.querySelector("[data-date]") //upl. um dags.
    //let d = card.querySelector("[class=card]")
    //d.classList.add("hide")
    i.src = user.url //er að setja src inn af listanum í i.src
    aname.textContent = user.artname //lær user artname inní html aname
    c.textContent = user.creator //höfundur
    p.textContent = user.price //Verð
    d.textContent = "Dags: " + user.date
    userCardContainer.append(card) //appenda síðan öllu cardinu inní containerinn
    //console.log(user)
    return { name: user.creator, price: user.price, element: card, date: user.date} //returna verðið og elementið
})
//console.log(users[0].element)

//Hérna er ég með search barinn

searchInput.addEventListener("input", e => {
    /*if(users[0].element.textContent.toLowerCase().includes(e.target.value.toLowerCase())){
        users[0].element.parentElement.style.display = "";
    }else{
        users[0].element.parentElement.style.display = "none";
    }*/
    let value = e.target.value.toLowerCase()
    console.log(value)
    users.forEach(user => {
        console.log(user)
        let isVisible =
            user.name.toLowerCase().includes(value)
        user.element.classList.toggle("hide", !isVisible)
    })
    
});

//Dagatalið
let dateSearchStart = document.querySelector("[data-start-date]")
let dateSearchEnd = document.querySelector("[data-end-date]")

//Hérna er ég með min og max af dögunum
//console.log(users)
let dates = users.map(user => {return user.date})
console.log(dates)
dates = dates.sort((a,b) => {
    let date1 = new Date(a)
    let date2 = new Date(b)
    return date1.getTime() < date2.getTime() ? date1 : date2;
})
dateSearchStart.min = dates[0]
dateSearchEnd.min = dates[0]

dateSearchStart.max = dates[dates.length-1]
dateSearchEnd.max = dates[dates.length-1]

dateSearchStart.addEventListener("change", e => {
    let gildi = e.target.value
    console.log(gildi)
})

dateSearchEnd.addEventListener("change", e => {
    let gildi = e.target.value
    console.log(gildi)
})
//Kalla á neðsta pricið
show(min)