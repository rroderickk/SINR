import * as React from 'react';
import logo from './logo.svg';
import './module.css';

const color = {
	color: '#61afef',
	fontFamily: 'consolas',
	textDecoration: 'none',
	fontSize: '0.9em',
	marginTop: '14px',
};

const tint = { color: 'cyan', fontSize: '0.9em', marginTop: '14px' };

function NodeMachine() {
	const [tinta, setTinta] = React.useState(color);

	return (
		<>
			<div style={{ textAlign: 'center' }}>
				<header
					style={{
						backgroundColor: '#400c60',
						color: 'white',
						minHeight: '100vh',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						fontSize: 'calc(10px + 2.2vmin)',
						fontFamily: 'Arial',
					}}
				>
					<img
						src={logo}
						alt='logo'
						style={{
							height: '40vmin',
							WebkitFilter: 'blur(0.3px) saturate(2)',
						}}
						className='App-logo'
					/>
					<p>
						{' '}
						Edit{' '}
						<code
							style={{
								fontFamily: 'Arial',
								color: 'crimson',
								fontWeight: 'bold',
							}}
						>
							{' '}
							src/App.js{' '}
						</code>
						and save to reload.
					</p>
					<a
						href='https://reactjs.org'
						target='_blank'
						rel='noopener noreferrer'
						style={{
							color: '#ff0999',
							fontFamily: 'monospace',
							textDecoration: 'none',
							fontSize: '1.3em',
						}}
					>
						Learn React, using{' '}
						<strong style={{ color: '#98c379' }}>
							NodeMachine
						</strong>
					</a>
					<a
						href='https://twitter.com/cheatmodes4'
						target='_blank'
						rel='noopener noreferrer'
						onMouseOver={() => setTinta(tint)}
						onMouseLeave={() => setTinta(color)}
						style={tinta}
					>
						@CheatModes4
					</a>
				</header>
			</div>
		</>
	);
}
export { NodeMachine };
