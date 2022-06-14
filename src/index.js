let addToy = false;
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  let form = document.querySelector('form')
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    let newName = e.target.name.value
    let newImg = e.target.image.value
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newName,
        image: newImg,
        likes: 0
      })
    })
  })

  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(data => {
    data.forEach(toy => {
      let name = toy.name
      let image = toy.image
      let likes = toy.likes
      let divCard = document.createElement('div')
      let h2 = document.createElement('h2')
      let img = document.createElement('img')
      let p = document.createElement('p')
      let btn = document.createElement('button')
      divCard.setAttribute('class', 'card')
      h2.textContent = name
      img.src = image
      img.setAttribute('class', 'toy-avatar')
      p.textContent = likes
      btn.addEventListener('click', (e) => {
        fetch(`http://localhost:3000/toys/${toy.id}`,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({"likes": likes + 1})
        })
        .then(res => res.json())
        .then(likes = likes + 1)
    })
      btn.textContent = 'Like'
      btn.setAttribute('class', 'like-btn')
      btn.setAttribute('id', `${toy.id}`)
      divCard.append(h2, img, p, btn)
      let divToys = document.querySelector('#toy-collection')
      divToys.appendChild(divCard)
    })
  })

  let likeBtn = document.querySelectorAll(".like-btn");
  likeBtn.forEach(btn => {
    btn.addEventListener('click', () => console.log('hello'));
  });