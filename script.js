import dinolist from './list.json' assert {type: 'json'}

let selectedDino = null

let lastdinos = []

function getRandomDino() {
    const index = Math.floor(Math.random() * dinolist.length)
    const dino = dinolist[index]

    if (lastdinos.includes(dino)) return getRandomDino()
    return dino
}

function addToLastDinos(dino) {
    lastdinos.push(dino)
    if (lastdinos.length > 5) {
        lastdinos.shift()
    }
}

const btnSearch = document.querySelector('.btn-search')
const btnRandom = document.querySelector('.btn-random')
const dinoInfos = document.querySelector('.current-dino')

btnRandom.addEventListener('click', selectRandomDino)

async function selectRandomDino() {
    selectedDino = getRandomDino()
    showLoading()
}

const loading = document.querySelector('.loading')
const loadingText = document.querySelector('.loading-text')
let loadingTexts = [
    'Hunting dinosaurs...',
    'Retrieving fossils...',
    'Time travelling...',
    'Analysing DNA...',
    'Searching the Mesozoic...',
    'Setting up traps...',
]
function showLoading() {
    const randomIndex = Math.floor(Math.random() * loadingTexts.length)
    loadingText.textContent = loadingTexts[randomIndex]

    dinoInfos.style.opacity = 0
    loading.style.opacity = 1
    return setTimeout(() => {
        loading.style.opacity = 0
        showDino()
    }, 2000)
}

function showDino() {
    setTimeout(() => {
        dinoInfos.style.opacity = 1
        dinoInfos.querySelector('.name').innerHTML = selectedDino.Name
        dinoInfos.querySelector('.description').innerHTML = selectedDino.Description
    }, 300)
}

const searchInput = document.getElementById('autocomplete')
const autocompleteList = document.getElementById('autocomplete-list')

const items = dinolist.map(dino => dino.Name)

searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value
  let matchingItems = []
  if (searchTerm) {
      matchingItems = items.filter(item => item.toLowerCase().startsWith(searchTerm.toLowerCase())).slice(0,5)
  }
  displayAutocompleteList(matchingItems)
})

searchInput.addEventListener('blur', () => {
    setTimeout(() => {
        autocompleteList.style.display = 'none'
    }, 100)
})

function displayAutocompleteList(items) {
  autocompleteList.innerHTML = ''
  if (items.length === 0) {
    autocompleteList.style.display = 'none'
    return
  }
  items.forEach(item => {
    const li = document.createElement('li')
    li.textContent = item
    li.addEventListener('click', () => {
        searchInput.value = item
        autocompleteList.style.display = 'none'
        searchDino()
    })
    autocompleteList.appendChild(li)
  })
  autocompleteList.style.display = 'block'
}

btnSearch.addEventListener('click', searchDino)

searchInput.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    searchInput.blur()
    searchDino()
  }
})

async function searchDino() {
    const match = dinolist.find(dino => dino.Name === searchInput.value)
    if (match) {
        selectedDino = match
    } else {
        selectedDino = {
            Name: searchInput.value,
            Description: '🦴 This dinosaur has not been found yet ! 🦴'
        }
    }
    showLoading()
}