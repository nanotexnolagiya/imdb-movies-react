import React from 'react'
import { Spinner } from 'reactstrap'
import './loader.css'

export default () => {
  return (
    <div className="preloader text-center d-flex justify-content-center align-items-center">
      <Spinner type="grow" color="success" />
    </div>
  )
}
