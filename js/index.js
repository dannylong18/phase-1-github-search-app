document.addEventListener('DOMContentLoaded', () => {

    let searchName = document.querySelector('input#search')
    
    let submitBtn = document.querySelector('input[name="submit"]')
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault()
        fetch('https://api.github.com/search/users?q=octocat' ,{
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            let apiData = data.items
            apiData.forEach(element => {
                if (searchName.value.toLowerCase() === element.login.toLowerCase()) {
                    let userList = document.getElementById('user-list')
                    let liUsername = document.createElement('li')
                    let liAvatar = document.createElement('img')
                    let liLink = document.createElement('a')

                    liUsername.innerText = element.login
                    liAvatar.src = element.avatar_url
                    liLink.href = element.url
                    liLink.innerText = `${element.url}`
                    
                    userList.appendChild(liUsername)
                    
                    userList.appendChild(liAvatar)
                    
                    userList.appendChild(liLink)
                    
                    liUsername.addEventListener('click', () => {
                        fetch(`https://api.github.com/users/${element.login}/repos`, {
                            method: 'GET',
                            headers: {
                                'Accept': 'application/vnd.github.v3+json',
                            'Content-Type': 'application/json',
                            }
                        })
                        .then((resp) => resp.json())
                        .then((data) => {
                            data.forEach(repo => {
                                console.log(repo)
                                let repoList = document.getElementById('repos-list')
                                let li = document.createElement('li')
                                li.innerText = repo.name
                                repoList.appendChild(li)
                            })
                        })
                    })
                }
            });
            
        })
    })
})