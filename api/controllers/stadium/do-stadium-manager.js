module.exports = {


	friendlyName: 'Hacer administrador de estadio',


	description: 'Log in using the provided email and password combination.',


	extendedDescription:
`This action attempts to look up the user record in the database with the
specified email address.  Then, if such a user exists, it uses
bcrypt to compare the hashed password from the database with the provided
password attempt.`,


	inputs: {

		stadium_id: {
			description: 'Estadio a administrar',
			type: 'number',
			required: true
		},

		user_id: {
			description: 'Usuario que va a ser administrador',
			type: 'string',
			required: true
		},



	},


	exits: {

		success: {
			description: 'El usuario se ha convertido en administrador de esta cancha',
		},
		stadiumNotFound: {
			description: `No se encontro la cancha`,
			responseType: 'resourceNotFound'
		},
		noSaved: {
			description: `No se encontro la cancha`,
			responseType: 'internalError'
		},
		alreadyAdmin: {
		  statusCode: 409,
		  description: 'The provided email address is already in use.',
		},

	},


	fn: async function (inputs, exits) {

		// Look up by the email address.
		// (note that we lowercase it to ensure the lookup is always case-insensitive,
		// regardless of which database we're using)
		// return exits.success("stadiumObject");
		var session_userId = this.req.session.userId;
		var user_id = inputs.user_id;
		if(session_userId == user_id){
			return exits.success("Esta cancha es tuya");
		}
		var stadiumObject = await Stadium.findOne({
			id: inputs.stadium_id,
			owner_id:session_userId
		}).select('id')
		// .populateAll()


		// .exec(function (err, stadium) {

		// 	if (err){
		// 		return exits.noSaved(err);	
		// 	} 

		if (!stadiumObject){
			return exits.stadiumNotFound();
		}

			
		// 	sails.log.info(stadium.id)
		await User_admin_stadium.create({
			admin_id	: 	user_id,
			stadium_id	: 	stadiumObject.id

		})
		.intercept('E_UNIQUE', 'alreadyAdmin')
		.fetch();
			
		// });
		// sails.log.info("asdasd")
		return exits.success(stadiumObject);

	}

};
