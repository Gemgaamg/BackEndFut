/**
 * Stadium.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

        name: {
            type: 'string',
            required: true,
            unique: true,
            maxLength: 100,
            example: 'Jocay de manta'
        },
        location:{
            type: 'string',
            required: true,
            maxLength: 200,
            example: 'Barrio Jocay'
        },
        price:{
            type: 'string',
            required: true,
            maxLength: 100,
            example: 'Jocay de manta'
        },
        type:{
            type: 'string',
            isIn: ['sintetica', 'natural'],
            required: true
        },
        numberplayers:{
            type:'number',
            required:true,
            max:11
        },

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
        /* one to one*/
        owner_id:{
            model:"user",
            required:true,
        },
        admin_ids:{
            collection:"user_admin_stadium",
            via:"stadium_id",
            description: 
            `ids de los administradores de este estadio`,
        }



  },

};

