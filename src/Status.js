import React from 'react'

const Status = ({setstate,state,filteredlist}) => {

    if(state==='all' && filteredlist.length===0){
        var info = 'plz add some task !'; 
    }
    else if(state==='completed' && filteredlist.length===0){
        info = 'No completed task found !'; }

    else if(state==='uncompleted' && filteredlist.length===0){
        info = 'All task are completed'; }

    return (
        <div className="status">
        <select value={state} onChange={(e)=>setstate(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
        <p className='info'>{info}</p>
      </div>

    )
}

export default Status
