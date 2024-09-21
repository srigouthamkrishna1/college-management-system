const backend_url='http://localhost:3001/api';
const  backend_api=
{
    signup:{
        url:`${backend_url}/users/signup`
    },
    signin:{
        url:`${backend_url}/users/login`
    },
    courses:{
        url:`${backend_url}/courses`
    }

}
export default backend_api;