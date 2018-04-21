/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
	
	changeimage: async function (req, res) {
		model =  "user";		
		var imageId = await sails.helpers.uploadImage.with({ req: req, model:model })
		.intercept('noTypeFormat',()=>{ return res.json({err:'noTypeFormat'})})
		.intercept('noUploadImage',()=>{ return res.json({err:'noUploadImage'})});
		// result.files[0].path
		await User.update({id:req.session.userId})
		.set({avatar_id:imageId})
		.fetch();

		return res.ok();

	},


	/**
	 * Download avatar of the user with the specified id
	 *
	 * (GET /user/avatar/:id)
	 */
	avatar: function (req, res){

		User.findOne(req.param('id')).exec(function (err, user){
			if (err) return res.serverError(err);
			if (!user) return res.notFound();

			// User has no avatar image uploaded.
			// (should have never have hit this endpoint and used the default image)
			if (!user.avatarFd) {
				return res.notFound();
			}

			var SkipperDisk = require('skipper-disk');
			var fileAdapter = SkipperDisk(/* optional opts */);

			// set the filename to the same file as the user uploaded
			res.set("Content-disposition", "attachment; filename='" + file.name + "'");

			// Stream the file down
			fileAdapter.read(user.avatarFd)
			.on('error', function (err){
				return res.serverError(err);
			})
			.pipe(res);
		});
	},

	index: function (req, res) {
		// body...
				return  res.json({users:"ad"})

	},


};

