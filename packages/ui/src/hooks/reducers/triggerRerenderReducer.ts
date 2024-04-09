import { Reducer } from 'react'

const triggerRerenderReducer: Reducer<number, void> = (state) => state + 1

export default triggerRerenderReducer
