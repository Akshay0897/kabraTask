import React,{Component} from 'react';

class form extends Component {

    state = {
        title:'',
        desc:'',
        image:''
    }

    handleChange = (e) => {
        let {name,value} = e.target;
        if(name === 'image') value = e.target.files[0]; 
        this.setState({
            [name]:value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImage',this.state.image);
        formData.append('title',this.state.title);
        formData.append('desc',this.state.desc);
        console.log(formData);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        /* axios.post("/upload",formData,config)
            .then((response) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
        }); */
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                <label htmlFor='title'>Title:   </label>
                <input id='title' name='title' type='text' required onChange={this.handleChange} value={this.state.title}></input>
                <br></br>
                <label htmlFor='desc'>Description:   </label>
                <input id='desc' name='desc' type='text' required onChange={this.handleChange} value={this.state.desc}></input>
                <br></br>
                <label htmlFor='image'>Pick an Image for Blog:   </label>
                <input type="file" id='image' name="image" required onChange= {this.handleChange} />
                <br></br>
                <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default form;

