import { describe, expect, it } from "vitest"
import { Game } from "./game"

class TestableGame extends Game {
    public getHead() { return this.head }
}

describe("game data structure", () => {
    const game = new TestableGame()

    it("should create a circle 56 nodes long", () => {
        // forwards
        let currNode = game.getHead()
        for (let i = 0; i < 56; i++) {
            currNode = currNode.forward[0]
        }

        expect(currNode).toEqual(game.getHead())

        // backwards
        currNode = game.getHead()
        for (let i = 0; i < 56; i++) {
            currNode = currNode.backward[0]
        }

        expect(currNode).toEqual(game.getHead())
    })

    it("should create 4 homerows, each connected to the proper nodes", () => {
        let currNode = game.getHead().backward[0].backward[0]
        for (let i = 0; i < 4; i++) {
            const firstNode = currNode

            expect(currNode.forward.length).toEqual(2)

            // enter the home row
            currNode = currNode.forward[1]

            currNode = currNode.forward[0]
            currNode = currNode.forward[0]
            currNode = currNode.forward[0]

            expect(currNode.forward.length).toEqual(0)

            currNode = currNode.backward[0]
            currNode = currNode.backward[0]
            currNode = currNode.backward[0]
            currNode = currNode.backward[0]

            expect(currNode).toEqual(firstNode)

            // Move to the next players homerow
            for (let j = 0; j < 14; j++) {
                currNode = currNode.forward[0]
            }
        }
    })
})

describe("getValidMoves", () => {
    const game = new TestableGame()
    it("should work on single-path returns", () => {
        const answer = game.getValidMoves({ position: game.players[0].startingPositions[0].forward[0], player: game.players[0] }, 3)

        expect(answer.length).toEqual(1)
        expect(answer).toEqual([{ newPos: game.getHead().forward[0].forward[0].forward[0] }])
    })

    it("should work on multi-path returns", () => {
        const answer = game.getValidMoves({ position: game.getHead().backward[0].backward[0].backward[0], player: game.players[0] }, 3)

        expect(answer.length).toEqual(2)
        expect(answer[0].newPos).toEqual(game.getHead())
        expect(answer[1].newPos).toEqual(game.getHead().backward[0].backward[0].forward[1].forward[0])
    })

    it("should return two paths if a player rolls a 4 from the start (aka, the player can't '4' into their own home row)", () => {
        const answer = game.getValidMoves({ position: game.players[0].startingPositions[0].forward[0], player: game.players[0] }, 4)

        expect(answer.length).toEqual(2)

        // forward 4
        expect(answer[0].newPos).toEqual(game.players[0].startingPositions[0].forward[0].forward[0].forward[0].forward[0].forward[0])

        // backward 4
        expect(answer[1].newPos).toEqual(game.players[0].startingPositions[0].forward[0].backward[0].backward[0].backward[0].backward[0])
    })

    it("should return 3 paths if a player rolls a 4 from an opponents start (forward on the ring, back on the ring, and back into the opponents home)", () => {
        const marble = { position: game.players[0].startingPositions[0].forward[0], player: game.players[0] }
        for (let i = 0; i < 14; i++) {
            marble.position = marble.position.forward[0]
        }
        const answer = game.getValidMoves(marble, 4)

        expect(answer.length).toEqual(3)
        expect(answer[0].newPos).toEqual(marble.position.forward[0].forward[0].forward[0].forward[0])
        expect(answer[1].newPos).toEqual(marble.position.backward[0].backward[0].backward[0].backward[0])
        expect(answer[2].newPos).toEqual(marble.position.backward[0].backward[0].forward[1].forward[0])
    })

    it("should return 1 path if a player rolls a 4 in their own home-row", () => {
        const marble = { position: game.players[0].startingPositions[0].forward[0].backward[0].backward[0].forward[1], player: game.players[0] }
        const validMoves = game.getValidMoves(marble, 4)

        expect(validMoves.length).toEqual(1)
        expect(validMoves[0].newPos).toEqual(game.players[0].startingPositions[0].forward[0].backward[0].backward[0].backward[0].backward[0].backward[0])
    })

    it("should return 1 path if a player rolls a 4 in an opponents home-row", () => {
        const marble = { position: game.players[1].startingPositions[0].forward[0].backward[0].backward[0].forward[1], player: game.players[0] }
        const validMoves = game.getValidMoves(marble, 4)

        expect(validMoves.length).toEqual(1)
        expect(validMoves[0].newPos).toEqual(game.players[1].startingPositions[0].forward[0].backward[0].backward[0].backward[0].backward[0].backward[0])
    })
})
