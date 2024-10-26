class Pagination {
    constructor() {
        this.DataPets = [
            {id: 0, name: 'Jennifer', img: '../assets/image/pets-jennifer'},
            {
                id: 1,
                name: 'Sophia',
                img: '../assets/image/pets-sophia'
            },
            {id: 2, name: 'Woody', img: '../assets/image/pets-woody'},
            {
                id: 3,
                name: 'Scarlett',
                img: '../assets/image/pets-scarlet'
            },
            {id: 4, name: 'Katrine', img: '../assets/image/pets-katrine'}, {
                id: 5,

                name: 'Timmy',
                img: '../assets/image/pets-timmy'
            },
            {id: 6, name: 'Freddie', img: '../assets/image/pets-freddie'},
            {
                id: 7,
                name: 'Charly',
                img: '../assets/image/pets-charly'
            }];
        this.windowWidth = window.innerWidth
        this.countCards = 3
        this.paginationDatas8 = []
        this.paginationDatas6 = []
        this.paginationDatas3 = []
        this.paginationCount = 0
        this.paginationCountElement = document.querySelector('.pets__control.control>.control__button.button.button_primary')
        this.petsWrapper = document.querySelector('.pets__wrapper')
    }

    shuffle = (array) => {
        const newArray = [...array]
        for (let i = newArray.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray
    }
    changeSettings = () => {
        this.windowWidth = window.innerWidth
        this.paginationCount = 0
        this.isBtnDisabled()
        if (this.windowWidth < 768) {
            this.drawCards(this.paginationDatas3)
            this.countCards = 3
        }
        if (this.windowWidth >= 768) {
            this.drawCards(this.paginationDatas6)
            this.countCards = 6
        }
        if (this.windowWidth >= 1280) {
            this.drawCards(this.paginationDatas8)
            this.countCards = 8
        }
    }
    distributeElements = (array, chunkSize) => {
        const elementCount = array.reduce((acc, item) => {
            const key = JSON.stringify(item);
            acc[key] = (acc[key] || 0) + 1;
            return acc;
        }, {});
        const uniqueChunks = new Array(Math.ceil(array.length / chunkSize)).fill(null).map(() => []);
        let chunkIndex = 0;
        for (const key in elementCount) {
            while (elementCount[key] > 0) {
                uniqueChunks[chunkIndex].push(JSON.parse(key));
                elementCount[key]--;
                chunkIndex = (chunkIndex + 1) % uniqueChunks.length;
            }
        }

        return uniqueChunks;
    }
    createCardsArrays = () => {
        let res = []
        for (let i = 1; i < 7; i++) {
            res.push(this.shuffle(this.DataPets))
        }
        this.paginationDatas8 = res
        this.transformArray()
    }
    transformArray = () => {
        this.paginationDatas6 = this.distributeElements(this.paginationDatas8.flat(), 6)
        this.paginationDatas3 = this.distributeElements(this.paginationDatas8.flat(), 3)
    }
    drawCards = (arr) => {
        this.petsWrapper.innerHTML = ''
        arr[this.paginationCount].forEach(item => {
            this.petsWrapper.insertAdjacentHTML('beforeend', `
                <div class="pets__item" data-name="${item.name}">
                    <picture class="pets__image-wrapper">
                        <source
                        srcset="${item.img}.webp"
                        type="image/webp"
                        />
                        <img
                        src="${item.img}.png"
                        alt="${item.name}"
                        class="pets__image"
                        />
                    </picture>
                    <h3 class="pets__title-card">${item.name}</h3>
                    <button class="pets__button button button_secondary">
                        Learn more
                    </button>
                   </div>
            `)
        })
        document.querySelectorAll('.pets__item').forEach(item => {
            item.addEventListener('click',()=>{
                window.location.hash = item.getAttribute('data-name')
            })
        })
    }
    isBtnDisabled = () => {
        if (+this.paginationCount + 1 === 48 / this.countCards) {
            document.querySelector('.control__button--next ').classList.add('button_secondary__disabled')
            document.querySelector('.control__button--next ').disabled = true
            document.querySelector('.control__button--last ').classList.add('button_secondary__disabled')
            document.querySelector('.control__button--last ').disabled = true
        } else {
            document.querySelector('.control__button--next ').classList.remove('button_secondary__disabled')
            document.querySelector('.control__button--next ').disabled = false
            document.querySelector('.control__button--last ').classList.remove('button_secondary__disabled')
            document.querySelector('.control__button--last ').disabled = false
        }
        if (+this.paginationCount + 1 === 1) {
            document.querySelector('.control__button--prev ').classList.add('button_secondary__disabled')
            document.querySelector('.control__button--prev  ').disabled = true
            document.querySelector('.control__button--first').classList.add('button_secondary__disabled')
            document.querySelector('.control__button--first ').disabled = true
        } else {
            document.querySelector('.control__button--prev ').classList.remove('button_secondary__disabled')
            document.querySelector('.control__button--prev ').disabled = false
            document.querySelector('.control__button--first ').classList.remove('button_secondary__disabled')
            document.querySelector('.control__button--first ').disabled = false
        }
    }
    nextSlide = () => {
        this.paginationCount += 1
        this.paginationCountElement.innerHTML = +this.paginationCount + 1
        this.isBtnDisabled()
        this.changeSettings()
    }
    prevSlide = () => {
        this.paginationCount -= 1
        this.paginationCountElement.innerHTML = +this.paginationCount + 1
        this.isBtnDisabled()
        this.changeSettings()
    }
    lastSlide = () => {
        this.paginationCount = 48 / this.countCards - 1
        this.paginationCountElement.innerHTML = +this.paginationCount + 1
        this.isBtnDisabled()
        this.changeSettings()
    }
    firstSlide = () => {
        this.paginationCount = 0
        this.paginationCountElement.innerHTML = +this.paginationCount + 1
        this.isBtnDisabled()
        this.changeSettings()
    }
    init = () => {
        this.createCardsArrays()
        this.changeSettings()


        this.paginationCountElement.innerHTML = +this.paginationCount + 1
        document.querySelector('.control__button--next ').addEventListener('click', this.nextSlide)
        document.querySelector('.control__button--last ').addEventListener('click', this.lastSlide)
        document.querySelector('.control__button--prev ').addEventListener('click', this.prevSlide)
        document.querySelector('.control__button--first ').addEventListener('click', this.firstSlide)
    }
    resizeInit = () => {
        this.changeSettings()
        this.paginationCountElement.innerHTML = +this.paginationCount + 1
        this.transformArray()


    }
}


const pagination = new Pagination()

pagination.init()


window.addEventListener('resize', pagination.resizeInit)
