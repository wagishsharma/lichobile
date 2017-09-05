import * as cg from './interfaces'

export interface State {
  pieces: cg.Pieces
  orientation: Color // board orientation. white | black
  turnColor: Color // turn to play. white | black
  check: Key | null // square currently in check "a2"
  lastMove: Key[] | null // squares part of the last move ["c3", "c4"]
  selected: Key | null // square currently selected "a1"
  coordinates: boolean // include coords attributes
  autoCastle: boolean // immediately complete the castle by moving the rook after king move
  viewOnly: boolean // don't bind events: the user will never be able to move pieces around
  otb: boolean // is this an otb game?
  otbMode: cg.OtbMode
  domElements: { [k: string]: HTMLElement }
  highlight: {
    lastMove: boolean // add last-move class to squares
    check: boolean // add check class to squares
  }
  animation: {
    enabled: boolean
    duration: number
    current: any | null // TODO AnimCurrent
  }
  movable: {
    free: boolean // all moves are valid - board editor
    color?: Color | 'both' // color that can move. white | black | both
    dests: DestsMap | null // valid moves. {"a2" ["a3" "a4"] "b1" ["a3" "c3"]}
    showDests: boolean // whether to add the move-dest class on squares
    dropped: KeyPair | null // last dropped [orig, dest], not to be animated
    events: {
      after?: (orig: Key, dest: Key, metadata: cg.MoveMetadata) => void // called after the move has been played
      afterNewPiece?: (role: Role, key: Key, metadata: cg.MoveMetadata) => void // called after a new piece is dropped on the board
    }
  }
  premovable: {
    enabled: boolean // allow premoves for color that can not move
    showDests: boolean // whether to add the premove-dest class on squares
    castle: boolean // whether to allow king castle premoves
    current: KeyPair | null // keys of the current saved premove ["e2" "e4"]
    dests: Key[] | null // premove destinations for the current selection
    events: {
      set?: (orig: Key, dest: Key, metadata?: cg.SetPremoveMetadata) => void // called after the premove has been set
      unset?: () => void // called after the premove has been unset
    }
  }
  predroppable: {
    enabled: boolean // allow predrops for color that can not move
    current: cg.Drop | null // current saved predrop {role: 'knight'; key: 'e4'}
    events: {
      set?: (role: Role, key: Key) => void // called after the predrop has been set
      unset?: () => void // called after the predrop has been unset
    }
  }
  draggable: {
    enabled: boolean // allow moves & premoves to use drag'n drop
    distance: number // minimum distance to initiate a drag; in pixels
    squareTarget: boolean // display a shadow target under piece
    magnified: boolean // whether dragging piece is magnified
    centerPiece: boolean // when magnified, center the piece under finger (otherwise shifted up)
    preventDefault: boolean // whether to prevent default on move and end
    showGhost: boolean // show ghost of piece being dragged
    current: any | null // TODO DragCurrent
  }
  // selectable: {
  //   // disable to enforce dragging over click-click move
  //   enabled: boolean
  // }
  events: {
    change?: () => void // called after the situation changes on the board
    // called after a piece has been moved.
    // capturedPiece is undefined or like {color: 'white'; 'role': 'queen'}
    move?: (orig: Key, dest: Key, capturedPiece?: Piece) => void
    dropNewPiece?: (piece: Piece, key: Key) => void
  }
  exploding?: cg.Exploding
}

export const defaults = {
  pieces: {},
  orientation: 'white' as Color,
  turnColor: 'white' as Color,
  check: null,
  lastMove: null,
  selected: null,
  coordinates: true,
  symmetricCoordinates: false,
  otb: false,
  otbMode: 'facing' as cg.OtbMode,
  batchRAF: requestAnimationFrame.bind(window),
  render: null,
  renderRAF: null,
  element: null,
  bounds: null,
  domElements: {},
  autoCastle: false,
  viewOnly: false,
  minimalDom: false,
  highlight: {
    lastMove: true,
    check: true
  },
  animation: {
    enabled: true,
    duration: 200,
    current: {}
  },
  movable: {
    free: true,
    color: 'both' as Color | 'both',
    dests: null,
    dropOff: 'revert',
    dropped: null,
    showDests: true,
    events: {}
  },
  premovable: {
    enabled: true,
    showDests: true,
    castle: true,
    dests: null,
    current: null,
    events: {}
  },
  predroppable: {
    enabled: false,
    current: null,
    events: {}
  },
  draggable: {
    enabled: true,
    distance: 3,
    squareTarget: true,
    magnified: true,
    centerPiece: false,
    preventDefault: true,
    showGhost: true,
    current: null
  },
  events: {}
}