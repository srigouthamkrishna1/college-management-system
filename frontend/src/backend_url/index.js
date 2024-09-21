const backend_url='https://college-management-system-ylmb.onrender.com/api';
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
