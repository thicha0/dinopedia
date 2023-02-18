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
    'Searching the Mesozoic'
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
