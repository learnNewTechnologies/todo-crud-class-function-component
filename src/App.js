// App.js File
import React, { Component, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";
// import { FormGroup } from "react-bootstrap";

class SimpleCrudOperationClass extends Component {

  constructor(props){
    super(props);
    this.state = {
      id:0,
      task : "",
      taskList : []
    }
  }

  updateInput(event){
    this.setState({
      task : event
    });
  }

  addItem(data){
    if(this.state.task !== "" && !this.state.id){
      let userData = {
        id : this.state.taskList.length ? this.state.taskList[this.state.taskList.length-1].id + 1 : 1,
        task : this.state.task,
        status:"Open"
      }
      
      let taskList =  this.state.taskList;
      taskList.push(userData);
      this.setState({
        taskList,
        task:""
      });
    }else{
      const taskList = [...this.state.taskList];
      let findIndex = taskList.findIndex((item) => item.id === this.state.id);
      let updateList = [...this.state.taskList]
      updateList[findIndex] = {
        id : this.state.id,
        task : this.state.task,
        status: this.state.status
      };
      this.setState({
        taskList : updateList,
        id:0,
        task:"",
        status:'Open'
      });
    }
  }

  deleteItem(id){
    const taskList = [...this.state.taskList];
    let updateList = taskList.filter((item) => item.id !== id);
    this.setState({
      taskList : updateList
    })
  }

  editItem(data){
    this.setState({
      task : data.task,
      id : data.id,
      status : data.status
    });
  }

  updateStatus(data){
    let taskList = [...this.state.taskList];
    let findIndex = taskList.findIndex((item) => item.id === data.id);
      let updateList = [...this.state.taskList];
      switch (data.status) {
        case 'Open':
          data.status = 'In-Progress'
          break;
        case 'In-Progress':
          data.status = 'Done'
          break;
        default:
          break;
      }


      updateList[findIndex] = {
        id : data.id,
        task : data.task,
        status: data.status
      };
      this.setState({
        taskList : updateList,
      });
  }

  render(){
    return(
        <Container>
 				<Row
 					style={{
 						display: "flex",
 						justifyContent: "center",
 						alignItems: "center",
 						fontSize: "3rem",
 						fontWeight: "bolder",
 					}}
 				>
 					TODO LIST
 				</Row>

 				<hr />
 				<Row>
 					<Col md={{ span: 5, offset: 4 }}>
 						<InputGroup className="mb-3">
 							<FormControl
 								placeholder="add item . . . "
 								size="lg"
 								value={this.state.task}
 								onChange={(item) =>
 									this.updateInput(item.target.value)
 								}
 								aria-label="add something"
 								aria-describedby="basic-addon2"
 							/>
 							<InputGroup>
 								<Button
 									variant="dark"
 									className="mt-2"
 									onClick={() => this.addItem()}
 								>
 									ADD
 								</Button>
 							</InputGroup>
 						</InputGroup>
 					</Col>
 				</Row>
        <Row>
          <Col>
            <ListGroup>
              {this.state.taskList.map((item, index) => {
                return (
                <div key = {index} >
                  <ListGroup.Item
                    variant="dark"
                    action
                    style={{display:"flex",
                        justifyContent:'space-between'
                  }}
                  >
                    {item.task}
                    <span>
                    <Button style={{marginRight:"10px"}}
                    variant = "light"
                    onClick={() => this.deleteItem(item.id)}>
                    Delete
                    </Button>
                    <Button variant = "light" style={{marginRight:"10px"}}
                    onClick={() => this.editItem(item)}>
                    Edit
                    </Button>
                    <Button variant = "light"
                    onClick={() => this.updateStatus(item)}>
                    {item.status}
                    </Button>
                    </span>
                  </ListGroup.Item>
                </div>
                );
              })}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    )
  }
}
 
function SimpleCrudOperationFunction() {
  const [id, setId] = useState(0);
  const [task, setTask] = useState("");
  const [status, setStatus] = useState("Open");
  const [taskList, setTaskList] = useState([]);

  const updateInput = (event) => {
    setTask(event.target.value);
  };

  const addItem = () => {
    if (task !== "" && !id) {
      const userData = {
        id: taskList.length ? taskList[taskList.length - 1].id + 1 : 1,
        task: task,
        status: "Open"
      };

      const updatedTaskList = [...taskList, userData];
      setTaskList(updatedTaskList);
      setTask("");
    } else {
      const updatedTaskList = taskList.map((item) =>
        item.id === id ? { id: id, task: task, status: status } : item
      );
      setTaskList(updatedTaskList);
      setId(0);
      setTask("");
      setStatus("Open");
    }
  };

  const deleteItem = (itemId) => {
    const updatedTaskList = taskList.filter((item) => item.id !== itemId);
    setTaskList(updatedTaskList);
  };

  const editItem = (data) => {
    setTask(data.task);
    setId(data.id);
    setStatus(data.status);
  };

  const updateStatus = (data) => {
    const updatedTaskList = taskList.map((item) =>
      item.id === data.id
        ? { id: data.id, task: data.task, status: getNextStatus(data.status) }
        : item
    );
    setTaskList(updatedTaskList);
  };

  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case "Open":
        return "In-Progress";
      case "In-Progress":
        return "Done";
      default:
        return currentStatus;
    }
  };

  return (
    <Container>
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "3rem",
          fontWeight: "bolder"
        }}
      >
        TODO LIST
      </Row>
      <hr />
      <Row>
        <Col md={{ span: 5, offset: 4 }}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="add item . . . "
              size="lg"
              value={task}
              onChange={updateInput}
              aria-label="add something"
              aria-describedby="basic-addon2"
            />
            <InputGroup>
              <Button variant="dark" className="mt-2" onClick={addItem}>
                ADD
              </Button>
            </InputGroup>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup>
            {taskList.map((item, index) => (
              <div key={index}>
                <ListGroup.Item
                  variant="dark"
                  action
                  style={{
                    display: "flex",
                    justifyContent: "space-between"
                  }}
                >
                  {item.task}
                  <span>
                    <Button
                      style={{ marginRight: "10px" }}
                      variant="light"
                      onClick={() => deleteItem(item.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="light"
                      style={{ marginRight: "10px" }}
                      onClick={() => editItem(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="light"
                      onClick={() => updateStatus(item)}
                    >
                      {item.status}
                    </Button>
                  </span>
                </ListGroup.Item>
              </div>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
}

export default SimpleCrudOperationFunction;
