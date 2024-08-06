import axios from "axios"

export async function isPerfectNumber(value: number) {
    const url = import.meta.env.VITE_API_BASE_URL + '/is-perfect-number/' + value
    const result = await axios.get(url)
    return result.data
}

export async function getPerfectNumbersInRange(from: number, to: number) {
    const url = `${import.meta.env.VITE_API_BASE_URL}/perfect-numbers-in-range?from=${from}&to=${to}`
    const result = await axios.get(url)
    console.log("hereuifhewiufhifu", result)
    return result.data
}   