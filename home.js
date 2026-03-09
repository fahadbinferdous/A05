// search
const searchIssues=()=>{
    const searchInput = document.getElementById('search-Input').value
    if(searchInput === '') return

    manageSpinner(true)

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchInput}`)
    .then(response=>response.json())
    .then(json=>{
        displayFunction(json.data)
        manageSpinner(false)
    })

}

document.getElementById('search-Btn').addEventListener('click', ()=>{
    document.getElementById('all-Btn').classList.remove('btn-primary')
    document.getElementById('open-Btn').classList.remove('btn-primary')
    document.getElementById('closed-Btn').classList.remove('btn-primary')
    searchIssues()
})


// filter buttons
const activeBtn=(id)=>{
    document.getElementById('all-Btn').classList.remove('btn-primary')
    document.getElementById('open-Btn').classList.remove('btn-primary')
    document.getElementById('closed-Btn').classList.remove('btn-primary')

    const selectedBtn=document.getElementById(id).classList.add('btn-primary')


    if(id==='all-Btn'){
    
    loadAllData()
    }
    
    else if (id==='open-Btn') {
    const cardsContainer=document.getElementById('cards-Container')
    cardsContainer.innerHTML=''
    loadOpenData()  
    }
    
    else if (id==='closed-Btn') {
    const cardsContainer=document.getElementById('cards-Container')
    cardsContainer.innerHTML='' 
    loadClosedData() 
    }

}



// spinnig function while loading
const manageSpinner=(status)=>{
    if(status==true){
        document.getElementById('spinner').classList.remove('hidden')
        document.getElementById('cards-Container').classList.add('hidden')
    }
    else{
        document.getElementById('spinner').classList.add('hidden')
        document.getElementById('cards-Container').classList.remove('hidden')
    }
}



// cards-Container


// cards for all tab
const loadAllData=()=>{
    manageSpinner(true)
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(response=>response.json())
    .then((json)=>{
        
        displayFunction(json.data)
        manageSpinner(false)
    })
    
}

loadAllData()

// cards for open tab
const loadOpenData = () => {
    manageSpinner(true)
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(response => response.json())
    .then(json => {
        const openIssues = json.data.filter(issue => issue.status === 'open')
        displayFunction(openIssues)
        manageSpinner(false)
    })
}



// cards for close tab
const loadClosedData = () => {
    manageSpinner(true)
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(response => response.json())
    .then(json => {
        const closedIssues = json.data.filter(issue => issue.status === 'closed')
        displayFunction(closedIssues)
        manageSpinner(false)
    })
}



// 


// {
//     "id": 1,
//     "title": "Fix navigation menu on mobile devices",
//     "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
//     "status": "open",
//     "labels": [
//         "bug",
//         "help wanted"
//     ],
//     "priority": "high",
//     "author": "john_doe",
//     "assignee": "jane_smith",
//     "createdAt": "2024-01-15T10:30:00Z",
//     "updatedAt": "2024-01-15T10:30:00Z"
// }


// display function
const displayFunction=(issues)=>{
    const cardsContainer=document.getElementById('cards-Container')
    cardsContainer.innerHTML=''
    document.getElementById('total-Issues').innerText = issues.length
    for(const issue of issues){
        
        const card=document.createElement('div')
        

        let statusImg = ''
        let borderColor = ''

        if(issue.status === 'open'){
            statusImg = 'assets/Open-Status.png'
            borderColor = 'border-success'
        }
        else{
            statusImg = 'assets/Closed- Status .png'
            borderColor = 'border-primary'
        }

        let priorityBadge = ''

        if(issue.priority === 'high'){
            priorityBadge = `<div class="badge badge-soft badge-error">High</div>`
        }
        else if(issue.priority === 'medium'){
            priorityBadge = `<div class="badge badge-soft badge-warning">Medium</div>`
        }
        else{
            priorityBadge = `<div class="badge badge-soft badge-ghost">Low</div>`
        }
            
        let labelsHTML = '' 
        for(const label of issue.labels){

        if(label === 'bug'){
            labelsHTML += `
            <div class="badge badge-soft badge-error">
                <img src="assets/BugDroid.png" alt="">Bug
            </div>`
        }

        else if(label === 'help wanted'){
            labelsHTML += `
            <div class="badge badge-soft badge-warning">
                <img src="assets/Help Wanted.png" alt="">Help Wanted
            </div>`
        }

        else if(label === 'enhancement'){
            labelsHTML += `
            <div class="badge badge-soft badge-success">
                <img src="assets/Enhancement.png" alt="">Enhancement
            </div>`
        }
        }


        
        card.classList.add('bg-white','px-5','py-5','shadow-sm','rounded-xl','border-t-3','space-y-8', 'cursor-pointer' ,borderColor)

        card.setAttribute("onclick", `loadModalDetails(${issue.id})`)

        card.innerHTML = `
        <div class="flex justify-between">
            <img src="${statusImg}" alt="">
            ${priorityBadge}
        </div>

        <h3 class="font-bold">${issue.title}</h3>
        <p class="text-[#64748B] line-clamp-2">${issue.description}</p>



        <div class="flex gap-2 flex-wrap">
            ${labelsHTML}
        </div>

        <hr class="border-t border-[#d5d9df]">

        <p class="text-[#64748B]">#${issue.id} by ${issue.author}</p>
        <p class="text-[#64748B]">${issue.createdAt}</p>
        `
        
        
        
        cardsContainer.append(card)
        
    
    }


}


// {
//     "id": 1,
//     "title": "Fix navigation menu on mobile devices",
//     "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
//     "status": "open",
//     "labels": [
//         "bug",
//         "help wanted"
//     ],
//     "priority": "high",
//     "author": "john_doe",
//     "assignee": "jane_smith",
//     "createdAt": "2024-01-15T10:30:00Z",
//     "updatedAt": "2024-01-15T10:30:00Z"
// }




// modal function

const loadModalDetails = async (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
    const response = await fetch(url)
    const result = await response.json()
    
    
    displayModalDetails(result.data)    

};


const displayModalDetails=(id)=>{
    const modalElements=document.getElementById('modal-Elements')
    modalElements.innerHTML=`
                <h3 class="text-2xl font-bold">${id.title}</h3>
                <div class="md:flex justify-between">
                    <p class="badge badge-neutral badge-outline">${id.status}</p>
                    <p><span class="text-xs text-[#64748B]">by: </span>${id.assignee}</p>
                    <p><span class="text-xs text-[#64748B]">at </span>${id.updatedAt}</p>
                </div>            
                <div class='space-x-1'>
                    ${createLabelElements(id.labels)}
                </div>    
                <p id="modal-Description" class="text-[#64748B]">${id.description}</p>    
                <div class="flex justify-between">
                    <p><span class="text-xs text-[#64748B]"">Priority: </span>${id.priority}</p>
                    <p><span class="text-xs text-[#64748B]">Assignee: </span>${id.assignee}</p>
                </div>            
    `
    document.getElementById('my_modal_5').showModal()

}

const createLabelElements=(arr)=>{
        const htmlElements=arr.map((element)=>`<span class='badge badge-outline'>${element}</span>`)            
        return (htmlElements.join(''))       
    
}


