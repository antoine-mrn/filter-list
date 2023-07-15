async function fetchData() {

    const response = await fetch("https://randomuser.me/api/?nat=fr&results=50")
    const data = await response.json()

    formatingData(data.results)
}

fetchData()

const users = []

function formatingData(data) {
    data.forEach(el => {
        const user = {}
        user.name = el.name.first + " " + el.name.last
        user.email = el.email
        user.phone = el.phone
        user.picture = el.picture.thumbnail
        users.push(user)
    })

    users.sort((a,b) => a.name.localeCompare(b.name))

    populateUI(users)
}

const userTable = document.querySelector('.table-user')

function populateUI(userTab) {
    userTab.forEach(user => {
        const userItem = document.createElement('li')
        userItem.classList.add("user-item")
        userItem.innerHTML = `
        <p class="name">
            <img class="profile-image" src=${user.picture} alt="profile picture">
            <span>${user.name}</span>
        </p>
        <p class="email">${user.email}</p>
        <p class="phone">${user.phone}
    `
        userTable.appendChild(userItem)
    })
}

const searchInput = document.getElementById("search-input")
searchInput.addEventListener("input", searchUser)

function searchUser() {

    const searchInputValue = searchInput.value.toLowerCase()
    const searchResult = users.filter(user => user.name.toLowerCase().includes(searchInputValue))

    userTable.textContent = ""
    populateUI(searchResult)

}
