(() => {
    
    const sendFile = (file, feed) => {
        
        let formData = new FormData()
        formData.append('file', file)

        let myDiv = document.createElement('div')
        myDiv.setAttribute('class', 'status')
        myDiv.style.boxShadow = '2px 4px 7px 0px black'
        feed.appendChild(myDiv)
        

        let statuS = document.createElement('span')
        statuS.setAttribute('class', 'spanText')
        myDiv.appendChild(statuS)

        remaninigQtd.textContent = `Falta ${qtd} para terminar.`

        
        let request = new XMLHttpRequest()
        request.open('POST', 'http://192.168.0.79:3000/upload')
        
        request.upload.addEventListener('progress', (e) =>{

            let percent = (e.loaded / e.total) * 100
            statuS.textContent = `${Math.floor(percent)} % - ${file.name}`
        })

        request.addEventListener('load', (e) => {

            myDiv.style.backgroundColor = '#86FF7B'
            statuS.style.display = 'block'

            if (request.status == 200) {
                let requestStatus = document.createElement('span')

                requestStatus.textContent = 'PRONTO'
                requestStatus.style.fontWeight = 'bold'
                requestStatus.setAttribute('class', 'spanText')
                myDiv.appendChild(requestStatus)

                qtd--
                remaninigQtd.textContent = `Falta ${qtd} para terminar.`
            }
            
        })
        
        request.send(formData)
        
    }

    let qtd = 0
    let fileList = []

    let fileInput = document.getElementById('file-input')
    let fileCatcher = document.getElementById('file-catcher')
    let feed = document.getElementById('feed')
    let remaninigQtd = document.createElement('span')

    feed.style.marginTop = '5px'
    remaninigQtd.setAttribute('id', 'qtd')
    
    
    // Incrementa ID para separar cada upload por um número
    fileInput.addEventListener('change', (evnt) =>{

        fetch('http://192.168.0.79:3000/increment')
        .then((response) => console.log(response.status))
        .catch((err)=> console.log(err))
        
        fileList = []
        
        for (let i = 0; i < fileInput.files.length; i++) {
            fileList.push(fileInput.files[i])
        }

        qtd = fileList.length
    })

    fileCatcher.addEventListener('submit', (evnt) => {
        
        evnt.preventDefault()
        feed.textContent = ''

        feed.appendChild(remaninigQtd)
        fileList.forEach((file)=>{
            fileInput.value = ""
            sendFile(file, feed)
        })
    })

})()