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
	const { loading, error, data } = useQuery(()=> axios.get(endpoint.getPost))

	if (loading) return <Loading/>

	return <Container maxWidth='xl'>
		<h6 style={{ color: '#333', filter: 'contrast(0.4)' }}>Home</h6>

		<Neumorphism p={'8px'}>
			<Typography color={state.colors.crim}
				fontSize={{ sx: '10px', md: '22px' }}
				fontWeight={{sx: '400', md: '100'}}
				margin={'13px'}
			> Sistemas inteligentes en RED (SINR)
			</Typography>

			{error ? <Error/> : <DataTable_2 props={data}/>}
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
		const [post, setPost] = React.useState([])

		React.useEffect(() => {
			axios.get(endpoint.getPost) .then(post=>setPost(post.data))
		},[]);
		
		const PlusButton = () => <>
			<Neumorphism w='100px' m='40px auto' thin>
				<button
					style={{
						width: '90%', cursor: 'pointer', border: 'none',
						backgroundColor: '#EAEBF3', color: '#333',
					}}>+</button>
			</Neumorphism>
		</>


		return <Neumorphism p={'40px'}>
			<Paper className={classes.root}>
				<Table style={{backgroundColor:'#EAEBF3', maxWidth: '100%', }}>
					<Neumorphism p={'80px'}>
						<TableHead> <HEADTABLE/> </TableHead>
						<TableBody> <BODYTABLE>{post}</BODYTABLE> </TableBody>
						<PlusButton/>
					</Neumorphism>
				</Table>
			</Paper>
		</Neumorphism>
	}


	const HEADTABLE = () => <>
		<TableRow>
			<TableCell>Id</TableCell>
			<TableCell>Delete</TableCell>
			<TableCell>Edit</TableCell>
			<TableCell>Title</TableCell>
			<TableCell>Post</TableCell>
		</TableRow>
	</>

	const BODYTABLE = ({children}) => <>
		{ children?.map(row =>
			<TableRow key={row.id}>
				<TableFragment>{row.id}</TableFragment>
				<TableFragment> <NBUTTON> ✏️ </NBUTTON> </TableFragment>
				<TableFragment> <NBUTTON> 🗑️ </NBUTTON> </TableFragment>
				<TableFragment>{row.title}</TableFragment>
				<TableFragment>{row.body}</TableFragment>
			</TableRow>
		)}
	</>;

	const NBUTTON = ({children}) => <>
		<Neumorphism p='4px' thin>
			<button style={{cursor: 'pointer'}}> {children} </button>
		</Neumorphism>
	</>


	const TableFragment =({children})=> <TableCell component='th' scope='row'>{children}</TableCell>
