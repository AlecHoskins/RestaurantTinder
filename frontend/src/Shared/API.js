
export const API = {

	createAuthorizedHeaders: (token) => {
		return {
			headers: 
			{
				Authorization: "Bearer " + token.token
			}
		}
	}	
}