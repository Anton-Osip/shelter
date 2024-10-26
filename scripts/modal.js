class Modal {
    constructor() {
        this.petsData = [
            {
                id: 0,
                name: "Jennifer",
                img: '../assets/image/pets-jennifer',
                type: "Dog",
                breed: "Labrador",
                description: "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
                age: "2 months",
                inoculations: ["none"],
                diseases: ["none"],
                parasites: ["none"]
            },
            {
                id: 1,
                name: "Sophia",
                img: "../assets/image/pets-sophia",
                type: "Dog",
                breed: "Shih tzu",
                description: "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
                age: "1 month",
                inoculations: ["parvovirus"],
                diseases: ["none"],
                parasites: ["none"]
            },
            {

                id: 2,
                name: "Woody",
                img: "../assets/image/pets-woody",
                type: "Dog",
                breed: "Golden Retriever",
                description: "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
                age: "3 years 6 months",
                inoculations: ["adenovirus", "distemper"],
                diseases: ["right back leg mobility reduced"],
                parasites: ["none"]
            },
            {
                id: 3,
                name: "Scarlett",
                img: "../assets/image/pets-scarlet",
                type: "Dog",
                breed: "Jack Russell Terrier",
                description: "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
                age: "3 months",
                inoculations: ["parainfluenza"],
                diseases: ["none"],
                parasites: ["none"]
            },
            {
                id: 4,
                name: "Katrine",
                img: "../assets/image/pets-katrine",
                type: "Cat",
                breed: "British Shorthair",
                description: "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
                age: "6 months",
                inoculations: ["panleukopenia"],
                diseases: ["none"],
                parasites: ["none"]
            },
            {
                id: 5,
                name: "Timmy",
                img: "../assets/image/pets-timmy",
                type: "Cat",
                breed: "British Shorthair",
                description: "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
                age: "2 years 3 months",
                inoculations: ["calicivirus", "viral rhinotracheitis"],
                diseases: ["kidney stones"],
                parasites: ["none"]
            },
            {
                id: 6,
                name: "Freddie",
                img: "../assets/image/pets-freddie",
                type: "Cat",
                breed: "British Shorthair",
                description: "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
                age: "2 months",
                inoculations: ["rabies"],
                diseases: ["none"],
                parasites: ["none"]
            },
            {
                id: 7,
                name: "Charly",
                img: "../assets/image/pets-charly",
                type: "Dog",
                breed: "Jack Russell Terrier",
                description: "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
                age: "8 years",
                inoculations: ["bordetella bronchiseptica", "leptospirosis"],
                diseases: ["deafness", "blindness"],
                parasites: ["lice", "fleas"]
            }
        ];
        this.hash = window.location.hash
    }

    drawModal = (element) => {
        document.querySelector('body').style.overflow = 'hidden'
        document.querySelector('.modal').innerHTML = ''
        document.querySelector('.modal').insertAdjacentHTML(
            'beforeend',
            ` 
        <div class="popup">
          <div class="popup__wrapper">
            <div class="popup__inner">
              <div class="popup__content content">
                <picture class="popup__image-wrapper">
                    <source srcset="${element.img}.webp" type="image/webp"/>
                    <img src="${element.img}.png" alt="${element.name}" class="popup__image"/>
                </picture>
                <div class="popup__info">
                    <h2 class="popup__title">${element.name}</h2>
                    <p class="popup__breed">${element.type} - ${element.breed}</p>
                    <p class="popup__description">${element.description}</p>
                    <ul class="popup__list">
                        <li class="popup__item">Age: <span>${element.age}</span></li>
                        <li class="popup__item">Inoculations: <span>${element.inoculations.join(', ')}</span></li>
                        <li class="popup__item">Diseases: <span>${element.diseases.join(', ')}</span></li>
                        <li class="popup__item">Parasites: <span>${element.parasites.join(', ')}</span></li>
                    </ul>
                </div>
                 <button class="popup__button button button_secondary">
                 </button>
              </div>
            </div>
          </div>
        </div>`,
        )
        document.querySelector('.popup').addEventListener('click', e => {
            if (e.target.classList.contains('popup__inner')) this.deleteModal()
        })
        document.querySelector('.popup__button').addEventListener('click', () => {
            this.deleteModal()
        })
    }

    deleteModal() {
        document.querySelector('body').style.overflow = 'scroll'
        this.total = 0
        window.location.hash = ''
        this.tabs = {size: 0, additives: [0]}
        document.querySelector('.modal').innerHTML = ''
    }

    init() {
        this.hash = window.location.hash
        let currentPet = this.petsData.filter(item => item.name === this.hash.slice(1))[0]
        if (this.hash && this.hash !== '#help' && this.hash !== '#contacts') {
            this.drawModal(currentPet)
        }
    }
}


let modal = new Modal()
modal.init()
window.addEventListener('hashchange', () => {
    modal.init()
})
