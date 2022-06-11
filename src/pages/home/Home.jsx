import React, { useContext } from 'react';
import { AppContext } from '@context/AppContext';
import { config as endpoint } from './config'
import { useQuery, useFetch, usePost, Log, Emoji, getDate} from '../../hooks/useFullHooks'
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import { Layer } from '@containers/Layer'
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

const contrastT = { color: '#333', filter: 'contrast(.00007)' };

/** # 🍺 */
export const Home = () => {
	const { state } = useContext(AppContext);
	const { loading, error, data } = useQuery(()=> axios.get(endpoint.POSTS))

	if (loading) return <Loading/>

	return <Container maxWidth='xl'>
		<h6 style={contrastT}>Home</h6>

		<Neumorphism p={'8px'}>
			<Typography variant='h1' component="div" color={state.colors.crim} 
				fontSize={{ sx: '10px', md: '22px' }}
				fontWeight={{sx: '400', md: '100'}}
				margin={'33px'}
			> Sistemas inteligentes en RED (SINR)
			</Typography>

			{ error ? <Error/> : <DataTable_2 props={data}/> }

			<h4 style={contrastT}>Data</h4>
			{ error ? <Error/> : <DataTable_3/> }

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


/** ✅
 * #### Props -> p & w & m 
 * @p {padding}
 * @w {width}
 * @m {margin}
 * @// todo....
 * @b {borderRadius} - f: full | sm : 4px | md : 8px | lg : 16px | xl : 32px
 * */
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
		{ field: 'id', headerName: 'ID', width: 13, sortable: true, filterable: true, resizable: true, },
		{ field: 'title', headerName: 'title', width: 400, editable: true, sortable: true, filterable: true, resizable: true,  },
		{ field: 'body', headerName: 'body', width: 600, editable: true, },
	];

	export const DataTable_2 = ({props}) => {
		const [state, setState] = React.useState({data: []})
		React.useEffect(() => setState(props), [])

		return <Neumorphism p={'40px'}>
			<h2 style={contrastT}>TABLE POST</h2>
			<div style={{ height: 600, width: '100%'}}>
				<DataGrid
					rows={state.data}
					columns={columns}
					loading={state.data.length === 0}
					pageSize={9}
					checkboxSelection
					pagination
				/>
			</div>
		</Neumorphism>
	}






	import { Paper, TableBody, Table, TableCell, TableHead, TableRow, Typography } from '@mui/material';
	import { makeStyles } from '@mui/styles';
	import { TemporaryDrawer } from '../../components/TemporaryDrawer';
	import { Button } from '@material-ui/core';

	const usePaperStyles = makeStyles(theme => ({
		root: { margin: theme.spacing = '1px', },
	}));


	export const DataTable_3 = () => {
		const classes = usePaperStyles();
		const [arrayData, setArrayData] = React.useState([]);
		const [url, setUrl] = React.useState(0);
		const [response, data, isLoading] = useFetch(url, 'json');
		const [post] = usePost(data);
		Log(Emoji.question, data)


		React.useEffect(() => {
			setUrl(endpoint.POSTS);
		},[url]);


		return <Neumorphism p={'40px'}>
			<Paper className={classes.root}>
				<Table sx={{backgroundColor:'#EAEBF3', width: '100%'}}>
					<Neumorphism p={'10px'} thin>
						<h2 style={contrastT}>DATA POST</h2>
						<TableHead> <HEADTABLE/> </TableHead>
						<TableBody>
							<BODYTABLE disable={isLoading} isLoading={isLoading}>
								{data}
							</BODYTABLE>
						</TableBody>
						<TemporaryDrawer/>
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
	</>

	const NBUTTON = ({children}) => <>
		<Neumorphism thin>
			<Button> {children} </Button>
		</Neumorphism>
	</>


	const Td =({children})=> <TableCell component='th' scope='row'>{children}</TableCell>

	const _Date = () => <h4 style={contrastT}>{getDate()}</h4>