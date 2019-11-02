import React,{Component} from 'react';
import Forminput from '../form-input/form-input.component';
import './form.styles.scss'
import axios from 'axios';

class form extends Component {

    state = {
        title:'',
        desc:'',
        image:null,
        imageUrl:''
    }

    checkMimeType=(event)=>{
        let file = event.target.files[0] 
        let err = '',type=file.type;
        
       const types = ['image/png', 'image/jpeg', 'image/gif']
         // compare file type find doesn't matach
             if (types.every(type => file.type !== type)) {
                if(!file.type) type = file.name.substr(file.name.lastIndexOf('.'));
             err += type+' is not a supported format\n';
           }
    
      
       if (err !== '') { // if message not same old that mean has error 
            event.target.value = null // discard selected file
            alert(err)
             return false; 
        }
       return true;
      
      }

    handleChange = (e) => {
        let {name} = e.target;
        let value;
        if(name === 'image') { 
            if(this.checkMimeType(e))
            {
                value = e.target.files[0];
                this.setState({
                    imageUrl: URL.createObjectURL(value)
                })
            }
        }
        else { value = e.target.value }

        this.setState({
            [name]:value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        const formData = new FormData();
        formData.append('title',this.state.title);
        formData.append('desc',this.state.desc);
        formData.append('myImage',this.state.image);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

         axios.post("/api/upload",formData,config)
            .then((response) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
        }); 
    }

    render(){
        return(
             <div className='container'>
                <div className='blog-form'>
                    <form onSubmit={this.handleSubmit}>
                    <Forminput label='title' name='title' type='text' required handleChange={this.handleChange} value={this.state.title}></Forminput>
                    <Forminput label='description' name='desc' type='text' required handleChange={this.handleChange} value={this.state.desc}></Forminput>
                    <Forminput label='choose image for your blog' name='image' type='file' required handleChange={this.handleChange}></Forminput>
                    <button className='custom-button' type='submit'>Create Blog</button>
                    </form>
                </div>
                <div className='blogimage'>
                    <img src={this.state.imageUrl} alt='image not uploaded'></img>
                </div>
            </div>
        );
    }
}

export default form;

