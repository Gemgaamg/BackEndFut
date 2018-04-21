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
      description: 'Estadio creado con exito',
    },

    stadiumNoCreated: {
      description: `No se pudo crear el estadio`,
      responseType: 'stadiumNoCreated'
      // ^This uses the custom `unauthorized` response located in `api/responses/unauthorized.js`.
      // To customize the generic "unauthorized" response across this entire app, change that file
      // (see http://sailsjs.com/anatomy/api/responses/unauthorized-js).
      //
      // To customize the response for _only this_ action, replace `responseType` with
      // something else.  For example, you might set `statusCode: 498` and change the
      // implementation below accordingly (see http://sailsjs.com/docs/concepts/controllers).
    }

  },


  fn: async function (inputs, exits) {
  	req = this.req
	var params = req.allParams();
    // return res.json(params)
    params.owner_id = req.session.userId

	//create a user
	Stadium.create(params, function(err, createdData) {
		if(err){
			return exits.stadiumNoCreated();
		} else {
			return exits.success({createdData});
		}
	});

  }

};
