import 'bluebird'
import {Env} from './Env'

var request = require('request-promise'),
	credentials = require('../credentials.json'),
	private = Env.isDevelopment() ? credentials.production.recaptcha.private : credentials.development.recaptcha.private

export class Recaptcha {
	static verify(token) {
		return new Promise((resolve, reject) => {
			if (!token || !token.length) reject('Invalid Token')
			request({
				method: 'POST',
				uri: 'https://www.google.com/recaptcha/api/siteverify',
				form: {
					secret: private,
					response: token
				}
			})
			.then(body => {
				try {
					let json = JSON.parse(body)
					resolve(json)
				} catch (e) {
					reject('Failed to parse JSON')
				}
			})
			.catch(error => {
				reject(error)
			})
		})
	}
}