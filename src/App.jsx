import { useState, useEffect } from "react";
import { CloseButton, ListGroup , Container, FormControl, Row, Col} from 'react-bootstrap';

export const App = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [showDelete, setShowDelete] = useState(null);
  
  useEffect( () => {
    tastkGet()
  }, [])

  const tastkGet = () => {
    fetch('https://playground.4geeks.com/todo/users/salvalistfetch', {
    method: "GET",
  })
    .then(data => {
      setTasks(data); 
  })
    .catch(error => {
        console.log(error);
    });
  };
  const putTask = () => {

   const task = {
    "label": tasks(),
    "is_done": false
   };
      fetch('https://playground.4geeks.com/todo/users/salvalistfetch', {
        method: "POST",
        body: JSON.stringify(task),
        headers: {
          "Content-Type": "application/json"
        }
    })
    .then(resp => resp.json())
    .then(() => tastkGet())
    .catch(error => {
      console.log(error);
    });
  };

  const taskItem = tasks.map(task => (
    <ListGroup.Item
      className="d-flex justify-content-between border-0"
      key={task.id}
      onMouseOver={() => setShowDelete(task.id)} 
      onMouseLeave={() => setShowDelete(null)}   
    >
      <p className="text-truncate">
        {task.text}
      </p>
      {showDelete === task.id && (<CloseButton onClick={() => deleteTask(task.id)} />)}
    </ListGroup.Item>
  ));


  const addTask = (e) => 
    e.key === "Enter"  && input.trim() !== "" && (setTasks([...tasks, { id: crypto.randomUUID(), text: input }]), setInput(""));

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <>
    <Container className="justify-content-md-center text-center">
      <Row className="justify-content-md-center">
        <Col>
          <h1>todos:</h1>
            <FormControl
              className="mb-2 shadow-none border-0 border-bottom rounded-0"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={addTask}
            />
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col>
          <ListGroup>
            {taskItem}
          </ListGroup>
        </Col>
        </Row>
    </Container>
    </>
  );
  
};