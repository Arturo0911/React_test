import React, {useState,useRef } from "react";
import { doesNotReject } from "assert";

type FormElemento = React.FormEvent<HTMLFormElement>;

interface Itask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [task, setTask] = useState<Itask[]>([]);
  const taskInput = useRef<HTMLInputElement>(null);
  const add_task = (name: string):void => {
    const newTaskes = [...task, { name: name, done: false }];
    setTask(newTaskes);
  };

  const handlesubmit = (e: FormElemento):void => {
    e.preventDefault();
    add_task(newTask);
    console.log(task);
    setNewTask("");
    taskInput.current?.focus();
  };


  const toggleTask = (i: number):void=>{
    const newTaskes: Itask[] = [...task];
    newTaskes [i].done = !newTaskes[i].done; 
    setTask(newTaskes);
  }

  const removeTask = (i: number) :void =>{
    const newTaskes : Itask[] = [...task];
    newTaskes.splice(i,1);
    setTask(newTaskes);
  }





  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handlesubmit}>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => setNewTask(e.target.value)}
                  value={newTask}
                  ref={taskInput}
                  autoFocus
                />
                <button className="btn btn-success btn-block mt-2">
                  Guardar
                </button>
              </form>
            </div>
          </div>
          {task.map((t: Itask, i: number) => (
            <div className="card card-body mt-2" key={i}>
              <h2 style={{textDecoration: t.done ? 'line-through' : ''}} >{t.name}</h2>
              <div>
                <button 
                className= "btn btn-secondary" 
                onClick= {() => toggleTask(i)}>
                  {t.done ?'✓': 'x' }
                </button>



                <button 
                className="btn btn-danger" 
                onClick= {() =>removeTask(i)}>
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
/**
 * 
 * 
 * 
 * // usamos el manejador de taras usestae, lo traemos y podemos manejar las tareas desde ahí
        // colocamos el array de tareas, le dimos nombres cualquiera, y lo instanciamos a userstate

 */
