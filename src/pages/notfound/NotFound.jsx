import { Layer } from '@containers/Layer'
import { Button } from '@mui/material'


export const NotFound = () => <Layer>
	<h1 style={{ color: '#444', }}>
		404 | Pagina no encontrada...
	</h1>

		<Button href="/" variant='contained'
			style={{margin: '10px'}}
		> Ir a la pagina principal
		</Button>
</Layer>