module.exports = {

	// sync:true,
	friendlyName: 'Foo bar',


	description: 'Asistente para subir imagenes al servidor, usado desde los controladores',


	inputs: {
		model:{
			type: 'string',
			description:'Se usa para asignar la ubicacion correcta a la cual enviar la imagen',
			required:true
		},
		req: {
			type: 'ref',
			description: 'Nesesario para obtener la imagen "req.file(**)"',
			required: true
		}
	},


	exits: {
			noTypeFormat: {
				description: "Tipo de imagen no reconocido"
			},
			noUploadImage: {
				description: "No se pudo subir la imagen"
			},
			noSaveImage: {
				description: "No se pudo guardar la imagen en la db"
			}
	},


	fn: async function (inputs, exits) {

		// All done.
		var req = inputs.req
		var img = req.file('image')
		var model = inputs.model


		// const stream = require('stream');


		var path = require('path').resolve(sails.config.appPath, 'images/'+model)
		var relativePath = '/images/'+model
		img.upload(	{dirname:path},function (err, files) {
			if (err){
				return exits.noUploadImage();
				// return  exits.success(err); 
			}
			if (files.length==0){
				return exits.noUploadImage();
			}
			if (files[0]) {

				var upload = img._files[0].stream,
					headers = upload.headers,
					allowedTypes = ['image/jpeg', 'image/png'];

				if (_.indexOf(allowedTypes, headers['content-type']) === -1) {

						var fileAdapter = require('skipper-disk')();
						fileAdapter.rm(files[0].fd, function () {
							return exits.noTypeFormat()
						});
				}else{
					files = files.map(function(file){
						dict = 
						{
							fd: file.fd,
							size: file.size,
							type: file.type,
							filename: file.filename,
							status: file.status,
							field: file.field,
							path: relativePath+"/"+file.fd.split("/").pop(),
						}

						return dict
					})
					result = {
						message: files.length + ' file(s) uploaded successfully!',
						files: files
					}
					Image.create(files[0]).fetch().exec(function(err, image) {
					if (err) {
						return exits.noSaveImage();
					}

						sails.log('Finn\'s id is:', files[0]);
						return  exits.success(image.id); 
					});

					
				}

			}
		});
	}
};

