

const activeBtn=(id)=>{
    document.getElementById('all-Btn').classList.remove('btn-primary')
    document.getElementById('open-Btn').classList.remove('btn-primary')
    document.getElementById('closed-Btn').classList.remove('btn-primary')

    const selectedBtn=document.getElementById(id).classList.add('btn-primary')


    if(id==='all-Btn'){
    
    loadAllData()
    }
    
    else if (id==='open-Btn') {
    
    loadOpenData()  
    }
    
    else if (id==='closed-Btn') {
        
    loadClosedData() 
    }

}


