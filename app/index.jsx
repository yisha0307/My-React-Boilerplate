import React from 'react'
import ReactDOM from 'react-dom'

const root = document.createElement('div');
document.body.appendChild(root);

class HelloWorld extends React.Component{
	render(){
		return(
			<h2>Hello world</h2>
			)
	}
}

ReactDOM.render(<HelloWorld />, root);