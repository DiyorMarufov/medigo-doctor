import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "../../../shared/api"

export const useAuth = () => {
    const client = useQueryClient()

    // success, error, body
    const signIn = useMutation<any, any, {phone: string}>({
        mutationFn: (body) => api.post("doctor/login", body).then(res => res.data),
    })
    const verifyOtp = useMutation<any, any, {phone: string, otp:string}>({
        mutationFn: (body) => api.post("doctor/verify_otp", body).then(res => res.data),
    })

    return {signIn, verifyOtp}
}