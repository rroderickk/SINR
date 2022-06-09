import React, { useContext } from 'react';
import { AppContext } from '@context/AppContext';
import { config as endpoint } from './config'
import { useQuery } from '../../hooks/useAxios'
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import { Layer } from '@containers/Layer'


export const Home = () => {
	const { state } = useContext(AppContext);
	const todos = useQuery(()=> axios.get(endpoint.getPost))

	if (todos.loading) return <Loading/>

	return <Container maxWidth="xl">
		<h6 style={{ color: '#333', filter: 'contrast(0.4)' }}>Home</h6>

		<Neumorphism p={'8px'}>
			<Typography color={state.colors.crim}
				fontSize={{ sx: '10px', md: '22px' }}
				fontWeight={{sx: '400', md: '100'}}
				margin={'13px'}
			>
				Sistemas inteligentes en RED (SINR)
			</Typography>

			{todos.error && <Error/> || !todos.error && <DataTable_2 props={todos.data}/>}
		</Neumorphism>

	</Container>
};


const Loading = () => <Layer>
	<Neumorphism>
		<Stack sx={{ color: 'grey.500', margin: '13px 103px' }}
			spacing={2} direction='row'
		> <CircularProgress color='secondary' size={22}/>
			<CircularProgress color='success'	size={22}/>
			<CircularProgress color='inherit' size={22}/>
		</Stack>
	</Neumorphism>
</Layer>


const Error = () => <Layer>
	<Neumorphism>
		<Alert variant='filled' severity='error'>
			Ha ocurrido un error: Failed to load resource.
		</Alert>
	</Neumorphism>
</Layer>


export const Neumorphism = (props) => <>
	<div style={{
			boxShadow: '9px 9px 16px rgb(163 177 198 / 60%), -9px -9px 16px rgb(255 255 255 / 50%)',
			padding: props.p,
		}}> {props.children} </div>
</>




import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';

const columns = [
	{ field: 'id', headerName: 'ID', width: 8, sortable: true, filterable: true, resizable: true, 	flexGrow: 1,  },
  { field: 'title', headerName: 'title', width: 400, editable: true, sortable: true, filterable: true, resizable: true, flexGrow: 1,  },
  { field: 'body', headerName: 'body', width: 600, editable: true, },
];

export const DataTable_2 = ({props}) => {
	const [state, setState] = React.useState({data: []})
	React.useEffect(() => setState(props) , [state])

	return <Neumorphism p={'40px'}>
		<div style={{ height: 600, width: '100%'}}>
			<DataGrid
				rows={state.data}
				columns={columns}
				loading={state.data.length === 0}
				pageSize={9}
				rowsPerPageOptions={[5]}
				checkboxSelection
				pagination
			>hola</DataGrid>
		</div>
	</Neumorphism>
}