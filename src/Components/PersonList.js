import React, { Component } from 'react'
import axios from 'axios'

export default class PersonList extends Component {
  state = {
    persons: []
  }
  componentDidMount = () => {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        console.log(res)
        this.setState({ persons: res.data })
      })
  }


  render() {
    const { persons } = this.state
    return (
      <div>
        <ul>
          {
            persons.map(person => (
              <li
                key={person.id}
              >
                {
                  <>
                    <h1>{person.name}</h1>
                    <p>{person.username}</p>
                    <p>{person.email}</p>
                  </>
                }
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}
