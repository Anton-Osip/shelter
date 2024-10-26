class Slider {
    constructor() {
        this.DataPets = [{id: 0, name: 'Jennifer', img: '../assets/image/pets-jennifer'}, {
            id: 1,
            name: 'Sophia',
            img: '../assets/image/pets-sophia'
        }, {id: 2, name: 'Woody', img: '../assets/image/pets-woody'}, {
            id: 3,
            name: 'Scarlett',
            img: '../assets/image/pets-scarlet'
        }, {id: 4, name: 'Katrine', img: '../assets/image/pets-katrine'}, {
            id: 5,
            name: 'Timmy',
            img: '../assets/image/pets-timmy'
        }, {id: 6, name: 'Freddie', img: '../assets/image/pets-freddie'}, {
            id: 7,
            name: 'Charly',
            img: '../assets/image/pets-charly'
        },];
        this.prevSlid = []
        this.nextSlid = []
        this.currentSlid = []
        this.countCards = 3
        this.windowWidth = window.innerWidth
        this.sliderRow = document.querySelector('.slider__row')
        this.width = document.querySelector('.slider__wrapper').offsetWidth
    }

    shuffle = (array) => {
        const newArray = [...array]
        for (let i = newArray.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray
    }

    setQuantityItems = (a, b, c) => {
        if (this.countCards === 3) return [a, b, c]
        if (this.countCards === 2) return [a, b]
        if (this.countCards === 1) return [a]
    }

    filterDataPets = (fArray, array) => {
        return fArray.filter(fArrayItem => {
            let res = true
            array.map(i => {
                if (i.id === fArrayItem.id) res = false
            })
            return res
        })
    }

    creatCurrentSlide = () => {
        const shuffleArray = this.shuffle(this.DataPets)
        const [a, b, c] = shuffleArray
        this.currentSlid = this.setQuantityItems(a, b, c)
    }

    creatPreviousSlide = () => {
        const [a, b, c] = this.filterDataPets(this.shuffle(this.DataPets), this.currentSlid)
        this.prevSlid = this.setQuantityItems(a, b, c)
    }

    creatNextSlide = () => {
        const [a, b, c] = this.filterDataPets(this.shuffle(this.DataPets), this.currentSlid)
        this.nextSlid = this.setQuantityItems(a, b, c)
    }

    changeSettings = () => {
        this.windowWidth = window.innerWidth
        if (this.windowWidth < 768) {
            this.countCards = 1
        }

        if (this.windowWidth >= 768) {
            this.countCards = 2
        }
        if (this.windowWidth >= 1280) {
            this.countCards = 3
        }

    }

    drawSlider = () => {
        this.sliderRow.innerHTML = ''
        let slider = [this.prevSlid, this.currentSlid, this.nextSlid]
        slider.forEach(item => {
            let sliderBlock = document.createElement("div")
            sliderBlock.classList.add('slider__block')
            this.sliderRow.insertAdjacentElement('beforeend', sliderBlock)
            item.forEach(subItem => {
                sliderBlock.insertAdjacentHTML('beforeend', `
                  <div class = "slider__item slide" data-name="${subItem.name}">
                                <picture class = "slide__image-wrapper">
                                    <source
                                            srcset = "${subItem.img}.webp"
                                            type = "image/webp"
                                    />
                                    <img
                                            src = "${subItem.img}.png"
                                            alt = "${subItem.name}"
                                            class = "slide__image"
                                    />
                                </picture>
                                <h3 class = "slide__title">${subItem.name}</h3>
                                <button class = "slide__button button button_secondary">
                                    Learn more
                                </button>
                            </div>
                `)
            })
        })
        document.querySelectorAll('.slider__item').forEach(item => {
            item.addEventListener('click',()=>{
                window.location.hash = item.getAttribute('data-name')
            })
        })
    }
    nextSlide = () => {
        let min = this.countCards === 3 ? -90 : 40
        this.sliderRow.style.transform = `translate(-${this.width - min}px)`

        this.prevSlid = this.currentSlid
        this.currentSlid = this.nextSlid
        this.creatNextSlide()
        this.sliderRow.style.transition = 'transform 0.5s ease'

        setTimeout(() => {
            this.drawSlider()
            this.sliderRow.style.transition = 'transform 0s ease'
            this.sliderRow.style.transform = `translate(-0px)`
        }, 500)

    }
    prevSlide = () => {
        let min = this.countCards === 3 ? -90 : 40
        this.sliderRow.style.transform = `translate(${this.width - min}px)`

        this.nextSlid = this.currentSlid
        this.currentSlid = this.prevSlid
        this.creatPreviousSlide()
        this.sliderRow.style.transition = 'transform 0.5s ease'

        setTimeout(() => {
            this.drawSlider()
            this.sliderRow.style.transition = 'transform 0s ease'
            this.sliderRow.style.transform = `translate(-0px)`
        }, 500)
    }


    init = () => {
        this.width = document.querySelector('.slider__wrapper').offsetWidth
        this.changeSettings()
        this.creatCurrentSlide()
        this.creatPreviousSlide()
        this.creatNextSlide()
        this.drawSlider()

        document.querySelector('.controls__btn_next').addEventListener('click', this.nextSlide)
        document.querySelector('.controls__btn_prev').addEventListener('click', this.prevSlide)
    }
}

const slider = new Slider()

slider.init()

window.addEventListener('resize', slider.init)

