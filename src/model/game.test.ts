import { describe, expect, it } from "vitest"
import { Game } from "./game"

describe("game data structure", () => {
    const game = new Game()

    it("should create a circle 56 nodes long", () => {
    // forwards
        let currNode = game.getNode(0)
        for (let i = 0; i < 56; i++) {
            currNode = currNode.forward[0]
        }

        expect(currNode).toEqual(game.getNode(0))

        // backwards
        currNode = game.getNode(0)
        for (let i = 0; i < 56; i++) {
            currNode = currNode.backward[0]
        }

        expect(currNode).toEqual(game.getNode(0))
    })

    it("should create 4 homerows, each connected to the proper nodes", () => {
        let currNode = game.getNode(0).backward[0].backward[0]
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
    const game = new Game()
    it("should work on single-path returns", () => {
        const answer = game.getValidMoves({ position: game.getNode(0), player: game.players[0] }, 3)

        expect(answer.length).toEqual(1)
        expect(answer).toEqual([{ newPos: game.getNode(3) }])
    })

    it("should work on multi-path returns", () => {
        const answer = game.getValidMoves({ position: game.getNode(53), player: game.players[0] }, 3)

        expect(answer.length).toEqual(2)
        expect(answer[0].newPos).toEqual(game.getNode(0))
        expect(answer[1].newPos).toEqual(game.getNode(73))
    })

    it("should return two paths if a player rolls a 4 from the start (aka, the player can't '4' into their own home row)", () => {
        const answer = game.getValidMoves({ position: game.getNode(0), player: game.players[0] }, 4)

        expect(answer.length).toEqual(2)

        // forward 4
        expect(answer[0].newPos).toEqual(game.getNode(4))

        // backward 4
        expect(answer[1].newPos).toEqual(game.getNode(52))
    })

    it("should return 3 paths if a player rolls a 4 from an opponents start (forward on the ring, back on the ring, and back into the opponents home)", () => {
        const marble = { position: game.getNode(14), player: game.players[0] }
        const answer = game.getValidMoves(marble, 4)

        expect(answer.length).toEqual(3)
        expect(answer[0].newPos).toEqual(game.getNode(18))
        expect(answer[1].newPos).toEqual(game.getNode(10))
        expect(answer[2].newPos).toEqual(game.getNode(77))
    })

    it("should return 1 path if a player rolls a 4 in their own home-row", () => {
        const marble = { position: game.getNode(72), player: game.players[0] }
        const validMoves = game.getValidMoves(marble, 4)

        expect(validMoves.length).toEqual(1)
        expect(validMoves[0].newPos).toEqual(game.getNode(51))
    })

    it("should return 1 path if a player rolls a 4 in an opponents home-row", () => {
        const marble = { position: game.getNode(76), player: game.players[0] }
        const validMoves = game.getValidMoves(marble, 4)

        expect(validMoves.length).toEqual(1)
        expect(validMoves[0].newPos).toEqual(game.getNode(9))
    })
})
