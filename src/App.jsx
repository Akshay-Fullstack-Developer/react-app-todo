import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { tododata } from '../../userdata';
import { InputGroup } from 'react-bootstrap';


function App() {
  const [data, setData] = useState([])
  const [saveorupdate, setSaveorupdate] = useState(0)
  const [id, setId] = useState(1)
  const [task, setTask] = useState("")
  const [status, setStatus] = useState("")
  const [isdataempty, setIsdataempty] = useState(0)

  useEffect(() => {
    setData(tododata)
  }, [])




  // perform delete operation 
  const ondelete = (id) => {
    if (id) {
      const newdata = data.filter((item) => {
        return item.id !== id
      })
      setData(newdata)
    }
    else{
      const newdata = data.filter((item) => {
        return item.id !== id
      })
      setData(newdata)
    }
  }


  //perform delete operation 
  const onedit = (id) => {
    setSaveorupdate(1)
    const edititems = data.filter((item) => {
      return item.id === id
    })
    // setId(edititems.id)
    // setTask(edititems.task)
    // setStatus(edititems.status)
    edititems.map((item) => {
      setId(item.id)
      setTask(item.task)
      setStatus(item.status)
    })
  }

  const updaterecord = () => {
    if (task && status) {
      const index = data.map((item) => { return item.id }).indexOf(id)
      const dt = [...data]
      console.log(dt[index])
      dt[index].task = task;
      dt[index].status = status;
      clearrecord();
      setSaveorupdate(0);
      setData(dt)
    }
    else {
      alert("require all values!")
    }

  }

  const saverecord = (e) => {
    e.preventDefault();
    if (task && status) {
      const dt = [...data]
      console.log("***********")
      console.log(data.length,)
      console.log("***********")
      const newObject = {
        id: data.length,
        task: task,
        status: status
      }
      dt.push(newObject)
      setData(dt)
      clearrecord();

    }
    else {
      alert("required input field")
    }


  }

  const clearrecord = () => {

    setId("")
    setTask("")
    setStatus("")
    setSaveorupdate(0)
  }

  return (
    <>

      <div className="container">
        <h1 className="text-xl font-bold text-white bg-blue-100 mb-4">To-Do List</h1>

        <div className=" d-flex justify-content-center align-item-center gap-1 mb-2">



          <label htmlFor="task" className='my-1 mx-1'> task </label>
          <input onChange={(e) => setTask(e.target.value)} type="text" value={task} id='task' placeholder='what you want to do?' className="border focus:bg-blue-100 rounded-md py-1 px-2" />

          <label htmlFor="status" className='my-1 mx-1'> status </label>
          <input onChange={(e) => setStatus(e.target.value)} type="text" value={status} id="status" placeholder='what is the status?' className="border focus:bg-blue-100 rounded-md py-1 px-2" />

          {
            saveorupdate == 1 ? <button className='btn btn-primary py-1' onClick={() => updaterecord()}>Update</button> : <button className='btn btn-primary' onClick={(e) => saverecord(e)}>save</button>
          }

          <button className='btn btn-danger' onClick={() => clearrecord()}>clear</button>
        </div>
        {
          data.length>0?(   <table className="table">
          <thead>
            <tr>

              <th scope="col">Task</th>
              <th scope="col">Status</th>
              <th scope="col">Action
              </th>
            </tr>
          </thead>
          <tbody>
            {
              data.length > 0 ? data.map((item, index) => {
                return (
                  <tr key={index}>

                    <td>{item.task}</td>
                    <td>{item.status}</td>
                    <td>
                      <button className='btn btn-primary mr-2' onClick={() => onedit(item.id)}> edit </button>
                      <button className='btn btn-danger mr-2' onClick={() => ondelete(item.id)}> delete </button>
                    </td>
                  </tr>
                )
              }) : <tr>
                <h1>no data</h1>
              </tr>

            }


          </tbody>
        </table>):(<h2 className="bg-blue-200 text-white p-2  m-4">No Data</h2>)
        }
     
      </div>
    </>
  )
}

export default App
