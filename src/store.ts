import { Map, fromJS } from 'immutable'
import Actor from './actor'

type IMap = Map<string, any>;

export default class Store {
  _actors: Array<Actor>;
  _state: IMap;
  _actorsState: Array<IMap>;

  constructor(props) {
    this._state = fromJS({})
    this._actorsState = []
    this._actors = this.bindActor()
    this.reduceActor()
  }

  bindActor(): Array<Actor> {
    return []
  }

  reduceActor() {
    this._state = this._state.withMutations(state => {
      for (let actor of this._actors) {
        let initState = fromJS(actor.defaultState())
        this._actorsState.push(initState)
        state = state.merge(initState)
      }
      return state
    })
  }

  dispatch(msg: string, params?: any) {
    const newStoreState = this._state.withMutations(state => {
      for (let i = 0, len = this._actors.length; i < len; i++) {
        let actor = this._actors[i]

        //debug
        if (process.env.NODE_ENV != 'production') {
          const actorName = actor.constructor.name
          console.log(`${actorName} will receive msg: ${msg}`)
        }

        let preState = this._actorsState[i]
        const newState = actor.receive(msg, preState, params)
        if (preState != newState) {
          this._actorsState[i] = newState
          state = state.merge(newState)
        }
      }

      return state
    })

    if (newStoreState != this._state) {
      this._state = newStoreState
      //emit event
    }
  }

  state() {
    return this._state
  }
}