import { URL_API_BACKEND } from '@config/common'
import axios from 'axios'
import { getBearer } from '../helpers/bearer.helper'

const apiAxios = axios.create({
    baseURL: `${URL_API_BACKEND}/api/`,
    responseType: 'json',
})

const isCancel = (error) => axios.isCancel(error)

export const sourceCancelToken = () => axios.CancelToken.source()

export const api = async ({
    method,
    url,
    bearer = getBearer(),
    params,
    payload,
    cancelToken,
}) => {
    try {
        const res = await apiAxios({
            method,
            url,
            headers: { Authorization: bearer },
            params,
            data: payload,
            cancelToken: cancelToken?.token,
        })

        return {
            data: res.data,
            status: res.status,
        }
    } catch (error) {
        return {
            error: {
                isCancel: isCancel(error),
                message: error.response?.data,
            },
            status: error.response?.status,
        }
    }
}
