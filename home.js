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


const loadAllData=()=>{
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(response=>response.json())
    .then((json)=>displayAllData(json.data))
}

loadAllData()


const loadOpenData = () => {
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(response => response.json())
    .then(json => {
        const openIssues = json.data.filter(issue => issue.status === 'open')
        displayAllData(openIssues)
    })
}





const loadClosedData = () => {
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(response => response.json())
    .then(json => {
        const closedIssues = json.data.filter(issue => issue.status === 'closed')
        displayAllData(closedIssues)
    })
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


const displayAllData=(issues)=>{
    const cardsContainer=document.getElementById('cards-Container')
    cardsContainer.innerHTML=''
    document.getElementById('total-Issues').innerText = issues.length
    for(const issue of issues){
        
        const card=document.createElement('div')
        card.classList.add('bg-white', 'px-5', 'py-5', 'shadow-sm', 'rounded-xl', 'border-t-3', 'space-y-5')

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


        
        card.classList.add('bg-white','px-5','py-5','shadow-sm','rounded-xl','border-t-3','space-y-8', borderColor)

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


