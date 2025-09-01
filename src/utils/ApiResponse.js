export class ApiResponse{
    constructor(statusCode,meassage,data=null){
        this.statusCode=statusCode
        this.meassage=meassage
        this.data=data
    }
}