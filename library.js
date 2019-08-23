/* eslint-disable indent */

// TODO LIST:
// 1. Change render function to loop over the library array.
// 2. Add the option to sort the library based on title/author/pages/read
// 3. Add Firebase database functionality
// 4. Add CSS styling

const myLibrary = []

function Book (title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}
Book.prototype.toggleRead = function () {
  
  if (this.read === true) {
    return 'Read'
} else {
    return 'Not Read'
  }
}

function addBookToLibrary (book) {
  myLibrary.push(book)
  render(book)
}

function render (book) {
  // typeof check to return if book is undefined
  if (typeof (book) === 'undefined') {
    return
  }
  const table = document.querySelector('table')
  const row = document.createElement('tr')
    row.setAttribute('data', myLibrary.length)
  const title = document.createElement('td')
  const author = document.createElement('td')
  const pages = document.createElement('td')
  const read = document.createElement('button')
  
  title.innerHTML = book.title
  author.innerHTML = book.author
  pages.innerHTML = book.pages
  read.innerHTML = book.toggleRead()
  read.addEventListener('click', function () {
    if (book.read) {
      book.read = false
      read.innerHTML = book.toggleRead()
    }
    else {
      book.read = true
      read.innerHTML = book.toggleRead()
    }
  })

  // delete book button
  const deleteButton = document.createElement('button')
  deleteButton.innerHTML = 'Delete'
  deleteButton.addEventListener('click', function () {
    table.removeChild(row)
    myLibrary.splice(myLibrary[row.getAttribute('data')], 1)
  })

  table.appendChild(row)
  row.appendChild(title)
  row.appendChild(author)
  row.appendChild(pages)
  row.appendChild(read)
  row.appendChild(deleteButton)
  
}



// Display the addBookForm
const toggleForm = document.getElementById('toggleForm')
toggleForm.addEventListener('click', function () {
  document.getElementById('addBookForm').style.display = 'block'
})
// Submit the addBookForm data
const submitButton = document.getElementById('submitButton')
submitButton.addEventListener('click', function () {
  if (document.getElementById('titleForm').value === '' || document.getElementById('authorForm').value === '' || !Number((document.getElementById('pagesForm').value))) {
    document.getElementById('formError').style.display = 'block'
    return
  }
  if (document.getElementById('pagesForm').value === '') {
    document.getElementById('pagesForm').value = '-'
  }

  const book = new Book(
    document.getElementById('titleForm').value,
    document.getElementById('authorForm').value,
    document.getElementById('pagesForm').value,
    document.getElementById('readForm').checked
  )
  addBookToLibrary(book)
  document.getElementById('titleForm').value = ''
    document.getElementById('authorForm').value = ''
    document.getElementById('pagesForm').value = ''
    document.getElementById('readForm').checked = false

    document.getElementById('addBookForm').style.display = 'none'
})

const book = new Book('Lord of the Rings', 'J.R.R. Tolkien', '1234', true)
const antifragile = new Book('Antifragile', 'Nassim Taleb', '1423', true)
const skinInTheGame = new Book('Skin in the Game', 'Nassim Taleb', '954', true)
addBookToLibrary(book)
addBookToLibrary(antifragile)
addBookToLibrary(skinInTheGame)
console.log(myLibrary)
render()
