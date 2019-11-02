import React,{Component} from 'react';
import axios from 'axios';
import './list.styles.scss';
import {Link} from 'react-router-dom';

class list extends Component {

    state = {
        list:[]
    }

    async componentDidMount(){
      let res = await axios.get('/api/getblogs');
      console.log(res);
      this.setState({
          list:res.data.data
      })
    }

    render(){  
        return(
          <div>
              <table className="App-table">
            <thead>
              <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Image</th>
              </tr>
            </thead>
            <tbody>
            {this.state.list.map((listitem, index) => {
               
                return (
                  <tr key={index}>
                    <td>{listitem.title}</td>
                    <td>{listitem.desc}</td>
                    <td><img src={`http://localhost:3002/api/getblogimage/${listitem.images[0]}`} width='500px' height='300px'></img></td>
                  </tr>
                )
              })}
            </tbody>
            </table>
          </div>
        );
    }
}

export default list;

