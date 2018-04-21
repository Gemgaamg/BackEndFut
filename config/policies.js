/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  
	
	'stadium/*': 'is-logged-in',
	'*': 'is-logged-in',
	'stadium/create': 'is-logged-in',
	'user/changeimage': 'is-logged-in',
  	'session/login': true,
	'session/signup': true,
	'user/*': false,
	
	'image/*': false,
	// '*': true,

};
