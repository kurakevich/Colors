// Получаем элемент страницы по селектору 
let cols = document.querySelectorAll('.col')

// Добавляем обработчик события по нажатию клавиши клавиатуры
document.addEventListener('keydown', (event) => {
    event.preventDefault() 
    if(event.code.toLowerCase() === 'space') {
        setRandomColors()
    }
})

// Добавляем обработчик события по нажатию клавиши мыши 
document.addEventListener('click', (event) => {
    const type = event.target.dataset.type 
    
    if(type === 'lock') {
        const node = 
            event.target.tagName.toLowerCase() === 'i' 
            ? event.target 
            : event.target.children[0]

        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')
    } else if (type === 'copy') {
       copyToClickboard(event.target.textContent)
    }
})

// Генерируем случайное число в формате HEX (#43F41E)
function generateRandomColor () {
    let hexCodes = '1234567890ABCDEF'
    let color = ''

    for(let i = 0; i < 6; i++) {
        color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
    }
    return '#' + color; 
}

// Получаем доступ к буферу обмена по нажатию на код цвета  
function copyToClickboard(text) {
    return navigator.clipboard.writeText(text)
}


function setRandomColors (isInitial) {
    const colors = isInitial ? getColorsFromHash() : []
     
    cols.forEach((col, index) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock')
        let text = col.querySelector('h2')
        let button = col.querySelector('button') 

        if(isLocked) {
            colors.push(text.textContent)
            return
        }

        const color = isInitial 
        ? colors[index] 
             ? colors[index]
             : chroma.random()
        : chroma.random() 

        if(!isInitial) {
            colors.push(color)
        }
       
        text.textContent = color
        col.style.background = color

        setTextColor(text, color)
        setTextColor(button, color)
    })

    updateColorsHash(colors)
}


function setTextColor (text, color) {
    const luminance = chroma(color).luminance() 
    text.style.color = luminance > 0.5 ? 'black' : 'white' 
}

function updateColorsHash(colors = []){
    document.location.hash = colors.map (col => {
        return col.toString().substring(1)
    }). join('-')
}

function getColorsFromHash () {
    if(document.location.hash.length > 1) {
       return document.location.hash
        .substring(1)
        .split('-')
        .map(color => '#' + color)
    }
    return []
}

setRandomColors(true);











