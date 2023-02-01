// 新增原生陣列方法
Array.prototype.remove = function (val) {
    this.splice(this.indexOf(val), 1)
}
const cardsNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
const cardsType = ['club', 'heart', 'square', 'diamond']
const pokerList = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]]
class User {
    constructor(money, handCards) {
        this.handCards = handCards || []
        this.money = money
    }
    addCard(card) {
        this.handCards.push(card)
    }
}
const user1 = new User(200)
const bookmaker = new User(10000)
function randomCard() {
    const getRandomNum = (max) => Math.floor(Math.random() * max)
    const type = getRandomNum(4)
    const number = getRandomNum(13) + 1
    const checkCard = pokerList[type].includes(number)
    if (!checkCard) return randomCard()
    pokerList[type].remove(number)
    return { suits: cardsType[type], number: number }
}
function dealCard(...userList) {
    userList.forEach(item => {
        const card = randomCard()
        item.addCard(card)
    })
}

const startBtn = document.getElementById('start')
const addBtn = document.getElementById('add')
const compareBtn = document.getElementById('compare')
const bookmakerMoney = document.getElementById('bookmakerMoney')
const user1Money = document.getElementById('user1Money')
const bookmakerHandCards = document.getElementById('bookmakerHandCards')
const user1HandCards = document.getElementById('user1HandCards')
bookmakerMoney.textContent = bookmaker.money
user1Money.textContent = user1.money
startBtn.addEventListener('click', () => {
    dealCard(bookmaker, user1)
    user1HandCards.textContent = user1.handCards[0].number > 10 ? 0.5 : user1.handCards[0].number
    bookmakerHandCards.textContent = bookmaker.handCards[0].number > 10 ? 0.5 : bookmaker.handCards[0].number
})
addBtn.addEventListener('click', () => {
    dealCard(user1)
    user1HandCards.textContent = user1.handCards.reduce((total, item) => {
        return Number(item.number > 10 ? 0.5 : item.number) + total
    }, 0)
    if (user1HandCards.textContent > 10.5) {
        setTimeout(() => { alert('爆炸') }, 0)
        return
    }
    if (user1.handCards.length > 4) {
        setTimeout(() => { alert('過五關') })
    }
})
compareBtn.addEventListener('click', () => {
    compareAllHandCards()
})
function compareAllHandCards() {
    const user1HandTotal = user1.handCards.reduce((total, item) => {
        return Number(item.number > 10 ? 0.5 : item.number) + total
    }, 0)
    const bookmakerHandTotal = bookmaker.handCards.reduce((total, item) => {
        return Number(item.number > 10 ? 0.5 : item.number) + total
    }, 0)
    bookmakerHandCards.textContent = bookmakerHandTotal
    if (bookmakerHandTotal > 10.5) {
        console.log(bookmaker.handCards)
        setTimeout(() => { alert('莊家爆炸') }, 0)
        return
    }
    if (bookmakerHandTotal > user1HandTotal) {
        setTimeout(() => { alert('莊家點數大') }, 0)
        return
    }
    if (bookmakerHandTotal === user1HandTotal) {
        setTimeout(() => { alert('和局') }, 0)
        return
    }
    if (bookmakerHandTotal < 8.5) {
        dealCard(bookmaker)
    }
    compareAllHandCards()
}