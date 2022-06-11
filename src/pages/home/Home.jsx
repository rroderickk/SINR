import React, { useContext } from 'react';
import { AppContext } from '@context/AppContext';
import { config as endpoint } from './config'
import { useQuery, useFetch, usePost, Log, Emoji, getDate} from '../../hooks/useAxios'
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import { Layer } from '@containers/Layer'

const contrastT = { color: '#333', filter: 'contrast(.00007)' };

export const Home = () => {
	const { state } = useContext(AppContext);
	const { loading, error, data } = useQuery(()=> axios.get(endpoint.POSTS))

	if (loading) return <Loading/>

	return <Container maxWidth='xl'>
		<h6 style={contrastT}>Home</h6>

		<Neumorphism p={'8px'}>
			<Typography color={state.colors.crim}
				fontSize={{ sx: '10px', md: '22px' }}
				fontWeight={{sx: '400', md: '100'}}
				margin={'13px'}
			> Sistemas inteligentes en RED (SINR)
			</Typography>

			{error ? <Error/> : <DataTable_2 props={data}/>}

			<h4 style={contrastT}>Data</h4>
			{error ? <Error/> : <DataTable_3/>}
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
	{ props.thin ?
		<div style={{
			boxShadow: '3px 3px 7px rgb(163 177 198 / 60%), -9px -9px 16px rgb(255 255 255 / 50%)',
			padding: props.p, width: props.w, margin: props.m,
		}}> {props.children} </div>
		:
		<div style={{
			boxShadow: '9px 9px 16px rgb(163 177 198 / 60%), -9px -9px 16px rgb(255 255 255 / 50%)',
			padding: props.p, width: props.w, margin: props.m,
		}}> {props.children} </div>
	}
</>









	import { DataGrid } from '@mui/x-data-grid';

	const columns = [
		{ field: 'id', headerName: 'ID', width: 8, sortable: true, filterable: true, resizable: true, 	flexGrow: 1,  },
		{ field: 'title', headerName: 'title', width: 400, editable: true, sortable: true, filterable: true, resizable: true, flexGrow: 1,  },
		{ field: 'body', headerName: 'body', width: 600, editable: true, },
	];

	export const DataTable_2 = ({props}) => {
		const [state, setState] = React.useState({data: []})
		React.useEffect(() => setState(props), [])

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
				/>
			</div>
		</Neumorphism>
	}






	import { Paper, TableBody, Table, TableCell, TableHead, TableRow, Typography } from '@mui/material';
	import { makeStyles } from '@mui/styles';

	const usePaperStyles = makeStyles(theme => ({
		root: { margin: theme.spacing = '1px', },
	}));


	export const DataTable_3 = () => {
		const classes = usePaperStyles();
		const [arrayData, setArrayData] = React.useState([]);
		const [url, setUrl] = React.useState(0);
		const [response, data, isLoading] = useFetch(url, 'json');
		const [post] = usePost(data);
		
		React.useEffect(() => {
			setUrl(endpoint.POSTS);
		},[url]);
		

		
		const plusSButton = { width: '90%', cursor: 'pointer', border: 'none', backgroundColor: '#EAEBF3', color: '#333', };
		const PlusButton = () => <>
			<Neumorphism w='100px' m='40px auto' thin>
				<button style={plusSButton}>
					+
				</button>
			</Neumorphism>
		</>


		return <Neumorphism p={'40px'}>
			<Paper className={classes.root}>
				<Table style={{backgroundColor:'#EAEBF3', maxWidth: '100%', }}>
					<Neumorphism p={'80px'}>
						<h2 style={contrastT}>DATA POST</h2>
						<TableHead> <HEADTABLE/> </TableHead>
						<TableBody> 
							<BODYTABLE isLoading={isLoading}>
								{data}
							</BODYTABLE> 
						</TableBody>
						<PlusButton/>
					</Neumorphism>
				</Table>
			</Paper>
			<_Date/>
		</Neumorphism>
	};


	const HEADTABLE = () => <>
		<TableRow>
			<TableCell>Id</TableCell>
			<TableCell>Delete</TableCell>
			<TableCell>Edit</TableCell>
			<TableCell>Title</TableCell>
			<TableCell>Post</TableCell>
		</TableRow>
	</>

	const BODYTABLE = ({children, isLoading}) => <>
		{children?.map(row =>
			<TableRow key={row.id}>
				{ isLoading ?
						<Loading/>
					: <> <Td>{row.id}</Td>
							<Td> <NBUTTON> ✏️ </NBUTTON> </Td>
							<Td> <NBUTTON> 🗑️ </NBUTTON> </Td>
							<Td>{row.title}</Td>
							<Td>{row.body}</Td> </>
				}
			</TableRow>
		)}
	</>;

	const NBUTTON = ({children}) => <>
		<Neumorphism p='4px' thin>
			<button style={{cursor: 'pointer'}}> {children} </button>
		</Neumorphism>
	</>


	const Td =({children})=> <TableCell component='th' scope='row'>{children}</TableCell>

	const _Date = () => <h4 style={contrastT}>{getDate()}</h4>
