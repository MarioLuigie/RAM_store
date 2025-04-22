// Api Results
declare interface IResult<T> {
	success: boolean
	data?: T
	error?: { [key: string]: string | string[] }
}

declare interface IDataResult<T> {
	success: boolean
	data: T
	error?: { [key: string]: string }
}