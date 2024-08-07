import axios from "axios"

const baseUrl = import.meta.env.DEV ? import.meta.env.VITE_API_BASE_URL : '/api'

export async function isPerfectNumber(value: number): Promise<boolean> {
    const url = baseUrl + '/is-perfect-number/' + value
    const result = await axios.get(url)
    return result.data
}

export async function getPerfectNumbersInRange(from: number, to: number): Promise<number[]> {
    const url = `${baseUrl}/perfect-numbers-in-range?from=${from}&to=${to}`
    const result = await axios.get(url)
    return result.data
}   