(()=>{
    let list = document.getElementById('list')
    let fileList = []

    /*
    fetch('http://192.168.0.79:3000/filelist')
    .then((res)=> res.json())
    .then((data) => {
        fileList = data
        console.log(data)
    })*/

    const getContent = async () => {
        let data =  await fetch('http://192.168.0.79:3000/filelist')
        let json = data.json()
        return json
    }

    const assignFile = async () => {
        fileList = await getContent()
        fileList.list.forEach(element => {
            let ele = document.createElement('li')
            ele.textContent = element
            ele.setAttribute('class', 'listLi')
            list.appendChild(ele)
        });
    }

    assignFile()
    
})()