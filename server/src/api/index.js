import { Router } from 'express';
import questions from './questions';

export default function() {
	var api = Router();

	// mount the facets resource
	api.use('/questions', questions);

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({
			version : '1.0'
		});
	});

	return api;
}
