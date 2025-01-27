class ApiResponse {
    constructor(stausCode, message="Success", data) {
        this.statusCode = stausCode;
        this.message = message;
        this.data = data;
        this.success = stausCode < 400;
    }
}

export default ApiResponse;