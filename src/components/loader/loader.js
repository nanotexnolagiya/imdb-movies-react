import React from 'react'
import { Spinner } from 'react-bootstrap'
import './loader.css'

export default () => {
  return (
    <div className="preloader text-center d-flex justify-content-center align-items-center">
      <Spinner animation="grow" variant="success" />
    </div>
  )
}
