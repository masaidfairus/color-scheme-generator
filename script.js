const form = document.getElementById("cs-form")
const mainColorScheme = document.getElementById("cs-main")

mainColorScheme.addEventListener('click', function (e) {
    if (e.target.className === "cs-item") {
        navigator.clipboard.writeText(e.target.innerText)
        document.querySelector('header').innerHTML = `
        <h2 class="success">Copied to your clipboard</h2>`
        
        setTimeout(() => {
            document.querySelector('header').innerHTML = ''
        }, 2000);
    }
})

form.addEventListener("submit", function (e) {
    e.preventDefault()
    const selectedColor = document.getElementById("color-picker").value.replace('#', '')
    const selectedMode = document.getElementById("mode-selector").value
    let colorSchemeHTML = ''
    fetch(`https://www.thecolorapi.com/scheme?hex=${selectedColor}&mode=${selectedMode}&count=5`)
        .then(res => res.json())
        .then(data => {
            const colors = data.colors
            colors.forEach(color => {
                colorSchemeHTML += `
                    <div class="cs-item" style="background-color: ${color.hex.value}">
                        <div class="cs-hex">${color.hex.value}</div>
                    </div>
                `
            });
            mainColorScheme.innerHTML = colorSchemeHTML
        })
})