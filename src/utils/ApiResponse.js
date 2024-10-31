class ApiResponse {
	constructor(statusCode, data, message = "Success") {
		this.statusCode
		this.data = data
		this.message = message
		this.statusCode < 400
	}
}
export { ApiResponse }
