class ApiError {
	constructor(statusCode, data, message = "Success") {
		this.statusCode
		this.data = data
		this.message = message
		this.statusCode < 400
	}
}
