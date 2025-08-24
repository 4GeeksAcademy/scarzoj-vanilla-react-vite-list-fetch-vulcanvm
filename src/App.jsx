import { useState, useEffect } from "react";
import { CloseButton, ListGroup , Container, FormControl, Row, Col} from 'react-bootstrap';

export const App = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [showDelete, setShowDelete] = useState(null);

  useEffect(() => {
    fetch('https://playground.4geeks.com/todo/users/salvalistfetch', {
      method: "GET"
    })
    .then(resp => resp.json())
    .then(data => setTasks(data.todos || []))
    .catch(console.log);
  }, []);

  const taskItem = tasks.map(task => (
    <ListGroup.Item
      className="d-flex justify-content-between align-items-center"
      key={task.id}
      onMouseOver={() => setShowDelete(task.id)} 
      onMouseLeave={() => setShowDelete(null)}   
    >
      {task.label || task.text} 
      {showDelete === task.id && (<CloseButton onClick={() => deleteTask(task.id)} />)}
    </ListGroup.Item>
  ));

  const addTask = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      const newTask = { label: input.trim(), is_done: false };
      fetch('https://playground.4geeks.com/todo/todos/salvalistfetch', {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(resp => resp.json())
      .then(() => {
        fetch('https://playground.4geeks.com/todo/users/salvalistfetch', { method: "GET" })
          .then(resp => resp.json())
          .then(data => setTasks(data.todos || []))
      })
      .catch(console.log);
      setInput("");
    }
  };

  const deleteTask = (id) => {
    fetch(`https://playground.4geeks.com/todo/todos/salvalistfetch/${id}`, {
      method: "DELETE"
    })
    .then(resp => resp.json())
    .then(() => {
      fetch('https://playground.4geeks.com/todo/users/salvalistfetch', { method: "GET" })
        .then(resp => resp.json())
        .then(data => setTasks(data.todos || []))
    })
    .catch(console.log);
  };

  return (
    <>
    <Container className="justify-content-md-center text-center">
      <Row className="justify-content-md-center">
        <Col xs lg="2">
          <h1>todos:</h1>
            <FormControl
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={addTask}
            />
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs lg="2">
          <ListGroup>
            {taskItem}
          </ListGroup>
        </Col>
        </Row>
    </Container>
    </>
  );
};