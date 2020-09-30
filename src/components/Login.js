import React from "react";
import {Form, Button, Container} from "react-bootstrap"

class Login extends React.Component {

    state = {
        username: "",
        password: "",
        title: "",
        phone_number: ""
    }

    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
      };

    handleSubmit = (event) =>{
          event.preventDefault();
          this.props.handleSubmit(this.state)
      }

    render() {
        return (
            <Container> 
            <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="username" value={this.state.email} onChange={this.handleChange}/>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
          
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange}/>
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>

            <Form.Group controlId="formBasicName">
              <Form.Label>Your Name</Form.Label>
              <Form.Control type="text" placeholder="your name here" name="title" value={this.state.title} onChange={this.handleChange}/>
              <Form.Text className="text-muted">
                Pick a name for others to see.
              </Form.Text>
            </Form.Group>


            <Form.Group controlId="formBasicPhoneNumber">
              <Form.Label>Your Phone Number</Form.Label>
              <Form.Control type="tel" placeholder="Enter number" name="phone_number" value={this.state.phone_number} onChange={this.handleChange}/>
              <Form.Text className="text-muted">
                Enter your number so you can receive notifications.
              </Form.Text>
            </Form.Group>


            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          </Container>
        )
    }
}

export default Login