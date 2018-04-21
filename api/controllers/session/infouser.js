module.exports = {


  friendlyName: 'infoUser',


  description: 'Devuelve informacion basica del usuario logueado',



  exits: {

    success: {
      description: 'La infomacion basica se ha enviado con exito',
    },

    userNoFound: {
      description: `Usuario no encontradp`,
      responseType: 'userNoFound'
    }

  },


  fn: async function (inputs, exits) {

    // Look up by the email address.
    // (note that we lowercase it to ensure the lookup is always case-insensitive,
    // regardless of which database we're using)
    if(!this.req.session.userId){
    	exits.userNoFound()
    }
    var userRecord = await User.findOne({id: this.req.session.userId})
    .populate('avatar_id')
    .populate('stadium_ids')
    .populate('stadium_admin_ids');
    return exits.success(userRecord)
    

  }

};