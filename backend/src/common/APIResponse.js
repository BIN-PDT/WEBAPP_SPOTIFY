class APIResponse {
	constructor(statusCode) {
		this.statusCode = statusCode;
		this.message = null;
		this.data = null;
		this.errors = null;
	}

	setMessage(value) {
		this.message = value;
		return this;
	}

	setData(value) {
		this.data = value;
		return this;
	}

	setErrors(value) {
		this.errors = value;
		return this;
	}

	getSuccessState() {
		if (this.statusCode >= 200 && this.statusCode < 300) return true;
		if (this.statusCode >= 400 && this.statusCode < 600) return false;
		return null;
	}

	send(res) {
		const responseData = { success: this.getSuccessState() };
		if (this.message !== null) responseData.message = this.message;
		if (this.data !== null) responseData.data = this.data;
		if (this.errors !== null) responseData.errors = this.errors;

		return res.status(this.statusCode).json(responseData);
	}
}

export default APIResponse;
