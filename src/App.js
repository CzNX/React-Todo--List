import { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";
import Status from "./Status";


// get localstorage
const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(localStorage.getItem('list'))
  }
  else {
    return []
  }
}

// main function

const App = () => {
  const [text, setText] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [edit, setEdit] = useState(false);
  const [mark, setMark] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ msg: '', type: '' });
  const [state, setstate] = useState('all');
  const [filteredlist, setfilteredlist] = useState([]);

  // filter sys

  const filterHandler = ()=>{
    switch (state) {

      case 'completed':
        setfilteredlist(list.filter((item) => item.mark === true));
        break;
      case 'uncompleted':
        setfilteredlist(list.filter((item) => item.mark === false));
        break;
      default:
        setfilteredlist(list);
        break;
    }
  
  }




  // main-submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      list.length < 5 ? showAlert('plz input  task...', 'danger') : showAlert('Thats enough for today xD', 'danger');
      ;

    }
    else if (edit) {

      setList(list.map((item) => {
        if (item.id === editId) {
          return { ...item, text: text }
        }
        return item;
      }));
      setText('');
      setEdit(false);
      setEditId(null);
      showAlert('successfully edited !', 'success')
    }
    else {

      if (list.length < 5) {
        const newItem = { id: new Date().getTime().toString(), text: text, mark: mark };
        setList([...list, newItem]);
        setText('');
        showAlert('Task Added successfully !', 'success');
      }
      else {
        showAlert('Thats enough for today xD', 'danger');

      }


    }


  }

  // alert portable function
  const showAlert = (msg = '', type = '') => {
    setAlert({ msg: msg, type: type });
  }

  // alert removal list dependency
  useEffect(() => {
    const removeAlert = setTimeout(() => {
      showAlert();
    }, 3000);
    return () => { clearTimeout(removeAlert) };
  }, [list])


  //  button handlers
  const deleteHandler = (id) => {
    const newList = list.filter((item) => item.id !== id)
    setList(newList)
    showAlert('Task Deleted !', 'danger');

  }
  const editHandler = (id) => {
    const thatItem = list.find((item) => item.id === id);
    setText(thatItem.text);
    setEdit(true);
    setEditId(thatItem.id);

  }

  const handleClear = () => {
    setList([]);
    showAlert('List Cleared ! ', 'danger');

  }

  const markHandler = (id) => {
    setList(list.map(item => {
      if (item.id === id) {
        return (
          { ...item, mark: !item.mark }
        )
      }
      return item;
    }))

  }

  // local storage set

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
    filterHandler();

  }, [list,state])

  // main return
  return (
    <div className='container'>
      <h1 className='main-title'>Todo List</h1>
      <small style={{ marginTop: '10px',fontWeight:'200' }}>Add/Delete/Edit/Clear/Toggle/Filter Tasks</small>

      {/* input part */}
      <form className='form' onSubmit={handleSubmit}>
        <Alert {...alert} />
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} className='input' placeholder='   Todo Tasks ...' />
        <button type='submit' className='submit-btn'>Add</button>
      </form>

      <Status setstate={setstate} state={state} filteredlist={filteredlist} />

      {/* lists part */}
      {filteredlist.length > 0 && <div className="list-all">
        <List list={filteredlist} deleteHandler={deleteHandler} editHandler={editHandler} markHandler={markHandler} mark={mark} />
        <button type='button' className='clear-btn' onClick={handleClear}>Clear All</button>
      </div>}

    </div>
  );
};

export default App;

