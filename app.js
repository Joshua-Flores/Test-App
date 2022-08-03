let usersArray = []

const renderUsers = (users) => {
    document.getElementById('count').innerText = users.length
    document.getElementById('cardList').innerHTML = ''
    users.sort((a, b) => a.name.localeCompare(b.name)).forEach((user) => {
        const card = document.createElement('div')
        card.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'col-xs-12')
        card.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h2 class="card-title">${user.name}</h2>
                    <p class="card-text">${user.address.suite}<br>
                    ${user.address.street}<br>
                    ${user.address.city}<br>
                    ${user.address.zipcode}</p>
                    <button 
                        class="btn btn-outline-danger" 
                        onClick="deleteUser(${user.id})">
                        Delete <i class="fa fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        `
        document.getElementById('cardList').appendChild(card)
    })
}

const getUsers = async () => {
    let response = await fetch('https://jsonplaceholder.typicode.com/users')
    if (!response.ok) throw Error(response.statusText)
    usersArray = await response.json()
    renderUsers(usersArray)
}
getUsers()

const deleteUser = (id) => {
    confirm('Are you sure you want to delete this user?')
    usersArray = usersArray.filter((user) => user.id !== id)
    renderUsers(usersArray)
}