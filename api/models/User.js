/**
 * User.js
 *
 * A user who can log in to this application.
 */

module.exports = {

	attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    
		email: {
			type: 'string',
			required: true,
			unique: true,
			isEmail: true,
			maxLength: 200,
			example: 'carol.reyna@microsoft.com'
		},
		encryptedPassword: {
			type: 'string',
	      	protect: true,

        },
		password: {
			type: 'string',
			required: true,
			description: 'Securely hashed representation of the user\'s login password.',
			protect: true,
			example: '2$28a8eabna301089103-13948134nad'
		},

		fullName: {
			type: 'string',
			required: true,
			description: 'Full representation of the user\'s name',
			maxLength: 120,
			example: 'Lisa Microwave van der Jenny'
		},

		emailStatus: {
			type: 'string',
			isIn: ['unconfirmed', 'changeRequested', 'confirmed'],
			defaultsTo: 'confirmed',
			description: 'The confirmation status of the user\'s email address.',
			extendedDescription:
`Users might be created as "unconfirmed" (e.g. normal signup) or as "confirmed" (e.g. hard-coded
admin users).  When the email verification feature is enabled, new users created via the
signup form have \`emailStatus: 'unconfirmed'\` until they click the link in the confirmation email.
Similarly, when an existing user changes their email address, they switch to the "changeRequested"
email status until they click the link in the confirmation email.`
		},


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝


    	avatar_id:{
			model:'image'
		},
		/* one to one*/
		stadium_ids:{
			collection: 'stadium',
      		via: 'owner_id',
      		description: 
			`Este campo es uno a muchos, defina los stadios de los que e
			dueño el usuario`,

		},

		stadium_admin_ids:{
			collection:"user_admin_stadium",
            via:"admin_id",
			description: 
			`ids de los estadios en el que es administrador este usuario`,
		}

	},
	customToJSON: function() {
  // Return a shallow copy of this record with the password and ssn removed.
	  return _.omit(this, ['password','encryptedPassword'])
	}


};
