
let playBtn = document.getElementById('playBtn')
let startContainer = document.getElementById('startContainer')
let gameContainer = document.getElementById('gameContainer')
let pcCardPlace = document.getElementById('pcCardPlace')
let playerCardPlace = document.getElementById('playerCardPlace')
let playerPoints = document.getElementById('playerPoints')
let pcPoints = document.getElementById('pcPoints')
let hit = document.getElementById('hit')
let stand = document.getElementById('stand')
let winner = document.getElementById('winner')

let playerCards = []
let playerCounter = 0
let pcCards = []
let pcCounter = 0

let gameStatus = true
let deck = ''


playBtn.addEventListener('click', startGame)
hit.addEventListener('click', hitCards)
stand.addEventListener('click', standCards)

function deckId() {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(res => res.json())
        .then(data => {
            deck = data.deck_id
        })
}
deckId()

function startGame() {
    fetch(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=4`)
        .then(res => res.json())
        .then(data => {

            playerCards.push(data.cards[0], data.cards[1])
            pcCards.push(data.cards[2], data.cards[3])

            showCards()
            playerPointsCounter()
            pcStartPoints()
        })

    startContainer.style.display = 'none'
    gameContainer.style.display = 'flex'
}

function showCards() {

    playerCardPlace.innerHTML = ''
    pcCardPlace.innerHTML = ''

    for (let i = 0; i < playerCards.length; i++) {
        playerCardPlace.innerHTML += `<img style="height: 200px" src="${playerCards[i].image}" alt="">`
    }

    for (let i = 0; i < pcCards.length; i++) {
        if (i === 0) {
            pcCardPlace.innerHTML += `<img style="height: 200px" src="${pcCards[i].image}" alt="">`
        } else {
            pcCardPlace.innerHTML += `<img style="height: 200px; border-radius: 10px" src="https://i.pinimg.com/originals/b0/5d/44/b05d440b3bb03173a9220a439728596e.jpg" alt="">`
        }
    }
}

function playerPointsCounter(){
    playerCounter = 0
    for (let i = 0; i < playerCards.length; i++) {
        if(Number(playerCards[i].value)) {
            playerCounter += Number(playerCards[i].value)
            playerPoints.innerText = `Points: ${playerCounter}`
        } else if (playerCards[i].value === 'ACE') {
            if (playerCounter > 11) {
                playerCounter += 1
                playerPoints.innerText = `Points: ${playerCounter}`
            } else {
                playerCounter += 11
                playerPoints.innerText = `Points: ${playerCounter}`
            }
        } else {
            playerCounter += 10
            playerPoints.innerText = `Points: ${playerCounter}`
        }
    }
}

function pcStartPoints() {
    pcCounter = 0
    if(Number(pcCards[0].value)) {
        pcCounter += Number(pcCards[0].value)
        pcPoints.innerText = `Points: ${pcCounter}`
    } else if (pcCards[0].value === 'ACE') {
        if (pcCounter > 11) {
            pcCounter += 1
            pcPoints.innerText = `Points: ${pcCounter}`
        } else {
            pcCounter += 11
            pcPoints.innerText = `Points: ${pcCounter}`
        }
    } else {
        pcCounter += 10
        pcPoints.innerText = `Points: ${pcCounter}`
    }
}

function pcPointsCounter() {
    pcCounter = 0
    for (let i = 0; i < pcCards.length; i++) {
        if(Number(pcCards[i].value)) {
            pcCounter += Number(pcCards[i].value)
            pcPoints.innerText = `Points: ${pcCounter}`
        } else if (pcCards[i].value === 'ACE') {
            if (pcCounter > 11) {
                pcCounter += 1
                pcPoints.innerText = `Points: ${pcCounter}`
            } else {
                pcCounter += 11
                pcPoints.innerText = `Points: ${pcCounter}`
            }
        } else {
            pcCounter += 10
            pcPoints.innerText = `Points: ${pcCounter}`
        }
    }
}

function hitCards() {
    if (gameStatus){
        fetch(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`)
            .then(res => res.json())
            .then(hitCard => {
                playerCards.push(hitCard.cards[0])
                showCards()
                playerPointsCounter()

                if(playerCounter > 21) {
                    winner.innerText = 'Computer wins!'
                    gameStatus = false
                }
                if (playerCounter === 21) {
                    winner.innerText = 'You win!'
                    gameStatus = false
                }
            })
    }
}

function standCards() {
    if(gameStatus) {
        fetch(`https://deckofcardsapi.com/api/deck/${deck}/draw/?count=1`)
            .then(res => res.json())
            .then(standCard => {
                pcPointsCounter()

                while (pcCounter < 17) {
                    pcCards.push(standCard.cards[0])
                    pcPointsCounter()
                }

                pcCardPlace.innerHTML = ''
                for (let i = 0; i < pcCards.length; i++) {
                    pcCardPlace.innerHTML += `<img style="height: 200px" src="${pcCards[i].image}" alt="">`
                }

                whoWinner()
            })
    }


}

function whoWinner(){
    if (playerCounter === pcCounter) {
        winner.innerText = 'It is a tie!'
        gameStatus = false
    }
    if (playerCounter > pcCounter || pcCounter > 21) {
        winner.innerText = 'You win!'
        gameStatus = false
    } else {
        winner.innerText = 'Computer wins!'
        gameStatus = false
    }
}










