
import apiInstance from './axios'
import { useAuthStore } from '../store/auth'
import { jwtDecode } from 'jwt-decode' //instead of jwt_decode!!!!!
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'



const Toast = Swal.mixin({
    toast:true,
    position: "top",
    showConfirmButton:false,
    timer:4500,
    timerProgressBar: true,
})


export const login = async (email, password) => {
    try {
        const { data, status } = await apiInstance.post('user/token/' , {
            email,
            password,
        });

        if (status === 200) {
            setAuthUser(data.access, data.refresh)
            
            Toast.fire({
                icon:"success",
                title: "Login Successfull"
            })
        }
        return { data, error: null }

    } catch (error) {
        return {
            data: null,
            error: error.response?.data?.detail || 'Something went wrong with login you in!', //response? added!!!!!
        };
    }
}

export const register = async (full_name, email, phone, password, password2) => {
    try {
        const csrfToken = Cookies.get('csrftoken');  // Get CSRF token from cookies GPT
        const { data } = await apiInstance.post('user/register/', {
            full_name,
            email,
            phone,
            password,
            password2,
        }
        ,{
            headers: {
                'X-CSRFToken': csrfToken, // Include CSRF token in headers GPT
            },
        }
            )

        await login(email, password)
        
        Toast.fire({
            icon:"success",
            title: "Account Created Successfully"
        })

        return { data, error: null }
    } catch (error) {
        return {
            data: null,
            error: error.response?.data?.detail || 'Something went wrong!with your registrance!!', //response? added!!!! GPT
        };
    }
}

export const logout = () => {
    Cookies.remove("access_token")
    Cookies.remove("refresh_token")

    // پاکسازی کوکی‌ها و حافظه محلی و session storage
    document.cookie.split(";").forEach(function(c) { 
        document.cookie = c.trim() + "=;expires=Thu, 01 Jan 1980 00:00:00 UTC;path=/";
    });
    localStorage.clear();
    sessionStorage.clear();
    
    useAuthStore.getState().setUser(null)

    Toast.fire({
        icon:"success",
        title: "Logout was Successfull"
    })
}

export const setUser = async () => {
    const accessToken = Cookies.get("access_token")
    const refreshToken = Cookies.get("refresh_token")

    if (!accessToken || !refreshToken) {
        return;
    }

    if (isAccessTokenExpired(accessToken)) {
        const response = await getRefreshToken(refreshToken)
        setAuthUser(response.access, response.refresh)
    } else {
        setAuthUser(accessToken, refreshToken)
    }
}

export const setAuthUser = (accessToken, refreshToken) => { //should i use _ or not????? GPT
    Cookies.set('access_token', accessToken, {  //access_token or  accessToken  ???? GPT
        expires: 1,
        secure: true,
        sameSite: 'Strict', // جلوگیری از CSRF
    })
    Cookies.set('refresh_token', refreshToken, {  //refresh_token or refreshToken???? GPT
        expires: 7,
        secure: true,
        sameSite: 'Strict', // جلوگیری از CSRF
    })

    const user = jwtDecode(accessToken) ?? null; //access_token or accessToken???? GPT

    if (user) {
        useAuthStore.getState().setUser(user)
    }
    useAuthStore.getState().setLoading(false)
}

export const getRefreshToken = async () => {
    const refresh_token = Cookies.get("refresh_token");
    const response = await apiInstance.post('user/token/refresh/', {
        refresh: refresh_token
    })

    return response.data
}

export const isAccessTokenExpired = (accessToken) => {
    try {
        const decodedToken = jwtDecode(accessToken)
        return decodedToken.exp < Math.floor(Date.now() / 1000)
    } catch (error) {
        console.log("Token expiration check failed:", error);
        return true
    }
} 