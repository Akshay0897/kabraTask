import React,{Component} from 'react';
import './header.styles.scss';
import {Link,withRouter} from 'react-router-dom';


class header extends Component {

    render(){  
        return(
            <div> 
                <h1 className='blogtitle'>{this.props.location.pathname === '/' ? 'Blogs' : 'Blog Form'}</h1>
                <Link className='link-button' to={`/${this.props.location.pathname === '/' ? 'blogform' : ''}`}>{this.props.location.pathname === '/' ? 'Blog Form' : 'Blog List'}</Link>
            </div>
        );
    }
}

export default withRouter(header);

