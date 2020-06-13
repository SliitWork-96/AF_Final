import React, { Component } from 'react';
import Item from './pItem';


class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const {TodoItem} = this.props

        return ( 
            <div>
                

                {
                    TodoItem.map(todoItem => {
                        return  <Item key={todoItem.EventPackageID}  nb={todoItem.EventPackageID}  onCheckComplete={this.props.onCheckComplete} 
                        task={todoItem.EventType}
                            />    
                    })
                }
               

                
                
            </div>
            
         );
    }
}


 
export default TodoList;