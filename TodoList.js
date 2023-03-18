function getAndUpdate() {
    console.log("updating")
    tit = document.getElementById("title").value
    desc = document.getElementById("discription").value
    if (localStorage.getItem("itemJson") == null) {
        itemJsonArray = []
        itemJsonArray.push([tit, desc])
        localStorage.setItem("itemJson", JSON.stringify(itemJsonArray))
    } else {
        itemJsonArraystr = localStorage.getItem("itemJson")
        itemJsonArray = JSON.parse(itemJsonArraystr)
        itemJsonArray.push([tit, desc])
        localStorage.setItem("itemJson", JSON.stringify(itemJsonArray))
    }
    update()
}
function update() {
    if (localStorage.getItem("itemJson") == null) {
        itemJsonArray = []

        localStorage.setItem("itemJson", JSON.stringify(itemJsonArray))
    } else {
        itemJsonArraystr = localStorage.getItem("itemJson")
        itemJsonArray = JSON.parse(itemJsonArraystr)
    }

    //populate the table
    let tableBody = document.getElementById("tableBody")
    let str = ""
    itemJsonArray.forEach((element, index) => {
        str += `
            <tr>
              <th scope="row">${index + 1}</th>
              <td>${element[0]}</td>
              <td>${element[1]}</td>
              <td>
                <button class="btn btn-sm btn-primary" onclick="deleted(${index})">Delete</button>
              </td>
            </tr>`
    })
    tableBody.innerHTML = str
}
add = document.getElementById("add")
add.addEventListener("click", getAndUpdate)
update()
function deleted(itemIndex) {
    console.log("Delete", itemIndex)
    itemJsonArraystr = localStorage.getItem("itemJson")
    itemJsonArray = JSON.parse(itemJsonArraystr)
    //Delete Item Index element from array
    itemJsonArray.splice(itemIndex, 1)
    localStorage.setItem("itemJson", JSON.stringify(itemJsonArray))
    update()
}
function clearstorage() {
    if (confirm("Do you want to clear all your TODO List??")) {
        console.log("clearing storage")
        localStorage.clear()
        update()
    }
}