import resource from 'resource-router-middleware';
import Questions from '../models/questions';

export default resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'question',

	/** GET / - List all entities */
	index({ params }, res) {
		res.json(questions);
	},

	/** POST / - Create a new entity */
	create({ body }, res) {
		body.id = questions.length.toString(36);
		questions.push(body);
		res.json(body);
	},

	/** GET /:id - Return a given entity */
	read({ params }, res) {
		res.json(req.question);
	},

	/** PUT /:id - Update a given entity */
	update({ question, body }, res) {
		for (let key in body) {
			if (key!=='id') {
				question[key] = body[key];
			}
		}
		res.sendStatus(204);
	},

	/** DELETE /:id - Delete a given entity */
	delete({ question }, res) {
		questions.splice(questions.indexOf(question), 1);
		res.sendStatus(204);
	}
});
