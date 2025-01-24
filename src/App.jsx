import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";


function App() {
  const [todo, setTodo] = useState("")
  const [list, setList] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleAdd = () => {
    setList([...list, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    console.log(list)
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }

  const handleCheckbox = (e)=>{
    const id = e.target.name
    const index = list.findIndex(item=>{
      return item.id === id
    })
    let newTodos = [...list];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setList(newTodos)

  }

  const handleDelete= (e, id)=>{  
    let newTodos = list.filter(item=>{
      return item.id!==id
    }); 
    setList(newTodos) 
    saveToLS()
  }

  const handleEdit = (e, id)=>{ 
    let t = list.filter(i=>i.id === id) 
    setTodo(t[0].todo)
    let newTodos = list.filter(item=>{
      return item.id!==id
    }); 
    setList(newTodos) 
    
  }
  return (
    <>
      <div className='mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[35%]'>
        <h1 className='text-3xl font-bold text-center'>iTask - Manage your tasks at one place</h1>
        <div className='flex flex-col gap-4 my-5 addTodo'>
          <h2 className='text-2xl font-bold'>Add a Todo</h2>
          <div className='flex'>
            <input onChange={handleChange} type="text" placeholder='Type here' value={todo} className='w-full rounded-full px-5 py-1' />
            <button onClick={handleAdd} disabled={todo.length < 3} className='bg-violet-800 mx-2 rounded-full hover:bg-violet-950 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white'>Save</button>
          </div>
        </div>

        <input className='my-4' type="checkbox" onChange={toggleFinished} id="show" checked={showFinished} />
        <label className='mx-2' htmlFor="show">Show Finished Tasks</label>
        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
        <h2 className='text-2xl font-bold'>Your Todos</h2>

        <div className="todos">
          {list.length === 0 && <div className='m-5'>No Todos to display</div>}
          {list.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className={"todo flex my-3 justify-between"}>
              <div className='flex gap-5'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><AiFillDelete /></button>
              </div>
            </div>
          })}




        </div>
      </div>
    </>
  )
}

export default App
