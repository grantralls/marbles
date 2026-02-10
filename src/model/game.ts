class BoardNode {
    public forward: BoardNode[]
    public backward: BoardNode[]

    constructor() {
        this.forward = []
        this.backward = []
    }
}

interface Player {
    startingPositions: BoardNode[]
    preHomeNode: BoardNode
}

interface Marble {
    position: BoardNode
    player: Player
}

interface Move {
    newPos: BoardNode
}

// Game (State & Moves)
export class Game {
    // The game head will always be one of the starting points of a player. So as a player rolles a 6 or a 1, that first position they can move to, that's the one.
    public head: BoardNode
    public players: Player[]

    constructor() {
        this.players = []
        this.head = this.initializeStructure()
    }

    /**
     * Creates the directed graph that represents the board.
     */
    private initializeStructure(): BoardNode {
        // create a ring of nodes that are doubly linked 56 long
        // This will be the ring part of the board
        const head = new BoardNode()

        let curr = head
        for (let i = 0; i < 55; i++) {
            const newNode = new BoardNode()
            curr.forward.push(newNode)
            newNode.backward.push(curr)
            curr = newNode
        }

        curr.forward.push(head)
        head.backward.push(curr)

        // It is 14 spaces from a players start node to the next players start node
        // Each of the 4 players has 4 "starting" spaces.
        let preHomeRow = head
        for (let i = 0; i < 4; i++) {
            const newPlayer: Player = { startingPositions: [] }
            // Point each starting position to the first ring position
            for (let j = 0; j < 4; j++) {
                const startingPiece = new BoardNode()
                newPlayer.startingPositions.push(startingPiece)
                startingPiece.forward.push(preHomeRow)
            }

            // move the first ring position to the first position of the next player
            for (let j = 0; j < 14; j++) {
                preHomeRow = preHomeRow.forward[0]
            }

            this.players.push(newPlayer)
        }

        // The node right before home starts
        preHomeRow = head.backward[0].backward[0]

        // For each player...
        for (let i = 0; i < 4; i++) {
            // Build the home row
            const homeStart = new BoardNode()
            let currHome = homeStart
            for (let j = 0; j < 3; j++) {
                const newNode = new BoardNode()
                currHome.forward.push(newNode)
                newNode.backward.push(currHome)
                currHome = newNode
            }

            // Connect the home row to the node just before it.
            homeStart.backward.push(preHomeRow)
            preHomeRow.forward.push(homeStart)
            this.players[i].preHomeNode = preHomeRow

            // Players can roll a 4, then go backwards into an opponents home row
            preHomeRow.backward.push(homeStart)

            // move to the next players "pre home row"
            for (let j = 0; j < 14; j++) {
                preHomeRow = preHomeRow.forward[0]
            }
        }

        return head
    }

    public getValidMoves(marble: Marble, roll: number): Move[] {
        const dfsForward = (position: BoardNode, movesLeft: number): Move[] => {
            if (movesLeft === 0) {
                return [{
                    newPos: position,
                }]
            }

            const answer: Move[] = []

            position.forward.forEach(node => answer.push(...dfsForward(node, movesLeft - 1)))

            return answer
        }

        // TODO: This is totally broken, and should be fixed. Currently you can't go "backward down a home-row" and you should be able to for opponents.
        const dfsBackward = (position: BoardNode, movesLeft: number): Move[] => {
            if (movesLeft === 0) {
                return [{
                    newPos: position,
                }]
            }

            const answer: Move[] = []

            position.backward.forEach((node) => {
                // a player cannot roll a 4 on the starting position and waltz back into their home row
                if (marble.player.preHomeNode !== node) {
                    answer.push(...dfsBackward(node, movesLeft - 1))
                }
            },
            )

            return answer
        }

        const answer = [...dfsForward(marble.position, roll)]

        if (roll === 4) {
            answer.push(...dfsBackward(marble.position, roll))
        }

        return answer
    }
}

// Game Renderer (State into 3d Space and Rendering)

export class GameRenderer {
}
