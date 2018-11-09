import axios from 'axios'
import Consts from '../consts'

const BASE_URL = Consts.API_URL

export function getSummary() {
    const request = axios.get(`${BASE_URL}/billingCycles/summary`)
    return {
        type: 'BILLING_SUMMARY_FETCHED',
        payload: request
    }
}