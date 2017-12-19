import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// // since class has only a render method, we can replace 
// // it with a functional component
// class Square extends React.Component {
// 	render() {
// 		return (
// 			<button 
// 			className="square"
// 			onClick={() => this.props.onClick()}
// 				>
// 				{this.props.value}
// 				</button>
// 				);
// 		}
// 	}

function Square(props) {
	return (
		<button className="square" onClick={props.onClick}>
		{props.value}
		</button>
		);
}

function Undo(props) {
	return (
		<div className="undo-btn" onClick={props.onClick}>
		Undo Move 
		</div>
		);
}

function Redo(props) {
	return (
		<div className="redo-btn"  onClick={props.onClick}>
		Redo Move 
		</div>
		);
}

class Board extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			squares: Array(9).fill(null),
			xIsNext: true,
			gameRunning: true,
			boardHis: [Array(9).fill(null)],
			pt: 0
		};
	}
	
	Undo() {
		if(this.state.pt > 0) {
			let pt = this.state.pt - 1;
			let squares = this.state.boardHis[pt];
			this.setState({
				pt: pt,
				squares: squares,
				xIsNext: !this.state.xIsNext,
				gameRunning: true
			});
		}
	}

	Redo() {
		if(this.state.pt < this.state.boardHis.length) {
			let pt = this.state.pt + 1;
			let squares = this.state.boardHis[pt];
			this.setState({
				pt: pt,
				squares: squares,
				xIsNext: !this.state.xIsNext
			});
		}
	}
	handleClick(i) {
		if(this.state.gameRunning) {
			const squares = this.state.squares.slice();
			if(squares[i] == null)
				squares[i]  = (this.state.xIsNext)? "X" : "O";
			this.setState({
				squares: squares,
				xIsNext: (this.state.squares[i] == squares[i])?
				this.state.xIsNext : !this.state.xIsNext,
				boardsHis: this.state.boardHis.push(squares),
				pt: this.state.pt + 1
			});
		}
	}

	renderUndo() { return <Undo onClick={() => {this.Undo()}} />; }
	renderRedo() { return <Redo onClick={() => {this.Redo()}} />; }
	renderSquare(i) {
		return <Square 
		value={this.state.squares[i]}
		onClick={() => this.handleClick(i)}
			/>;
		}

	render() {
		const winner = calculateWinner(this.state.squares);
		let status = (winner)?
		'Winner : ' + winner :
		'Current player: ' + (this.state.xIsNext? 'X' : 'O');
		if(winner && this.state.gameRunning) this.setState({gameRunning: false});

		return (
			<div>
			<div className="status">{status}</div>
			<div>
			{this.renderUndo()}
			{this.renderRedo()}
			</div>
			<div className="board-row">
			{this.renderSquare(0)}
			{this.renderSquare(1)}
			{this.renderSquare(2)}
			</div>
			<div className="board-row">
			{this.renderSquare(3)}
			{this.renderSquare(4)}
			{this.renderSquare(5)}
			</div>
			<div className="board-row">
			{this.renderSquare(6)}
			{this.renderSquare(7)}
			{this.renderSquare(8)}
			</div>
			</div>
			);
	}
}

class Game extends React.Component {
	render() {
		return (
			<div className="game">
			<div className="game-board">
			<Board />
			</div>
			<div className="game-info">
		<div>{/* status */}</div>
	<ol>{/* TODO */}</ol>
	</div>
	</div>
	);
	}
}


// ========================================

ReactDOM.render(
	<Game />,
	document.getElementById('root')
	);

// ================================
// Helper functions

function calculateWinner(squares) {
	const lines = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}

