const cardsNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
const cardsType = ['club', 'heart', 'squre', 'daimond']
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
    return { suits: cardsType[type], number: number }
}
function dealCard(...userList) {
    userList.forEach(item => {
        const card = randomCard()
        item.addCard(card)
    })
}
dealCard(user1, bookmaker)
console.log(user1, bookmaker)