import React, { Component } from 'react'
import { Button } from 'reactstrap';


class Home extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                Home
                <Button>Hi</Button>
           </div>
        );
    }
}

export default Home
