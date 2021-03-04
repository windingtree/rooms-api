import React from 'react'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'

import { errorLogger } from '../../../utils/functions'
import { apiClient } from '../../../utils/api'
import { ApiCache } from '../../../utils/api_cache'
import RoomTypeList from './RoomTypeList/RoomTypeList'
import Spinner from '../../base/Spinner/Spinner'
import {PageContentWrapper} from "../../base/Common/PageContentWrapper";

class RoomTypes extends React.Component {
  constructor(props) {
    super(props)

    this.apiCache = ApiCache.getInstance()

    this._isDestroyed = false
    this.state = {
      roomTypes: [],
      apiLoading: true,
    }
  }

  componentDidMount() {
    this.getRoomTypes()
  }

  componentWillUnmount() {
    this._isDestroyed = true
  }

  handleEditClick = (id) => {
    this.props.history.push(`/dashboard/room-types/${id}`)
  }

  handleTrashClick = (id) => {
    this.deleteRoomType(id)
  }

  handleTypeDelete = () => {
    this.getRoomTypes()
  }

  getRoomTypes = () => {
    this.setState({
      roomTypes: this.apiCache.getRoomTypes(),
      apiLoading: true,
    })

    apiClient
      .getRoomTypes()
      .then((roomTypes) => {
        if (this._isDestroyed) return

        this.setState({
          roomTypes,
          apiLoading: false,
        })
      })
      .catch((error) => {
        if (this._isDestroyed) return

        errorLogger(error)
      })
  }

  isDataEmpty = () => (!this.state.roomTypes || !this.state.roomTypes.length)
  isLoadingInProgress = () => (this.isDataEmpty() && this.state.apiLoading)

  welcomeMessage = () => {
    return (
        <>
          <p>When someone books a Room in your hotel, the reservation appears here</p>
          <p>In the meanwhile, try adding a manual reservation, because they are also kept here</p>
        </>
    )
  }

  render() {
    return (

        <PageContentWrapper>
          {this.isLoadingInProgress() && <Spinner info="loading"/>}
          {this.isDataEmpty() && !this.isLoadingInProgress() && this.welcomeMessage()}
            <RoomTypeList
              roomTypes={this.state.roomTypes}
              onDelete={this.handleTypeDelete}
            />
              <Button
                aria-label="edit"
                onClick={() => this.handleEditClick('temporary')}
                variant='contained'
                color='primary'
              >
                + Add Unit Type
              </Button>
        </PageContentWrapper>
    )
  }
}

export default withRouter(RoomTypes)
